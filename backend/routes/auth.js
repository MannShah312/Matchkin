const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const { sendOtp, verifyOtp } = require('../utils/sendOtp');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate unique user code (for tracking or profile ID)
function generateUniqueCode() {
  return 'U' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// ======================
// POST /auth/signup
// ======================
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, mobile, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ error: 'Email already registered and verified' });
      } else {
        // Resend OTP
        await sendOtp(email);
        return res.json({ message: 'User exists but not verified. OTP resent to your email.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      mobile,
      role,
      code: generateUniqueCode(),
      isVerified: false
    });

    await user.save();
    await sendOtp(email);

    res.json({ message: 'Signup successful. Verify OTP sent to your email.' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// ======================
// POST /auth/verify-otp
// ======================
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    await verifyOtp(email, otp);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    if (user.isVerified) return res.status(400).json({ error: 'User already verified' });

    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'OTP verified. Account activated.', token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// ======================
// POST /auth/login
// ======================
router.post('/login', async (req, res) => {
  try {
    const { email, password} = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isVerified)
      return res.status(401).json({ error: 'Invalid email or unverified user' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ message: 'Login successful', token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
     });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ======================
// POST /auth/google-auth
// ======================
router.post('/google-auth', async (req, res) => {
  try {
    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        googleId,
        code: generateUniqueCode(),
        isVerified: true,
        role: 'consultant', // or set dynamically if required
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ message: 'Google login successful', token });
  } catch (err) {
    console.error('Google Auth Error:', err.message);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

// ======================
// DELETE /auth/delete
// ======================
router.delete(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user._id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Delete failed' });
    }
  }
);

module.exports = router;