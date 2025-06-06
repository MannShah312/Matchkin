const express = require('express');
const router = express.Router();
const passport = require('passport');
const ConsultantProfile = require('../models/ConsultantProfile');

// POST /consultants/profile (Create or update profile)
router.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { skills, domain, experience, bio, availability } = req.body;

      if (req.user.role !== 'consultant') {
        return res.status(403).json({ error: 'Only consultants can access this route.' });
      }

      // Check if profile already exists
      let profile = await ConsultantProfile.findOne({ user: req.user._id });

      if (profile) {
        // Update existing profile
        profile.skills = skills;
        profile.domain = domain;
        profile.experience = experience;
        profile.bio = bio;
        profile.availability = availability;
        await profile.save();
        return res.json({ message: 'Profile updated successfully', profile });
      }

      // Create new profile
      profile = new ConsultantProfile({
        user: req.user._id,
        skills,
        domain,
        experience,
        bio,
        availability,
      });

      await profile.save();
      res.json({ message: 'Profile created successfully', profile });
    } catch (err) {
      console.error('Consultant profile error:', err.message);
      res.status(500).json({ error: 'Server error while saving profile' });
    }
  }
);

router.get(
  '/profile/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== 'consultant') {
        return res.status(403).json({ error: 'Access denied' });
      }

      const profile = await ConsultantProfile.findOne({ user: req.user._id }).populate('user', '-password');

      if (!profile) return res.status(404).json({ error: 'Profile not found' });

      res.json(profile);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

router.get('/search', async (req, res) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({ error: 'Skill is required in query' });
    }

    // Find consultants whose skill array includes the given skill
    const matchingConsultants = await ConsultantProfile.find({
      skills: { $regex: new RegExp(skill, 'i') } // case-insensitive match
    }).populate('user', 'name email');

    res.json({ count: matchingConsultants.length, consultants: matchingConsultants });
  } catch (err) {
    console.error('Consultant search error:', err.message);
    res.status(500).json({ error: 'Server error while searching consultants' });
  }
});

const User = require('../models/User'); // Make sure you import this at the top

router.put(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { skills, domain, experience, bio, availability, name, phone } = req.body;

      if (req.user.role !== 'consultant') {
        return res.status(403).json({ error: 'Only consultants can access this route.' });
      }

      // 1. Update User's name & phone
      await User.findByIdAndUpdate(req.user._id, {
        ...(name && { name }),
        ...(phone && { phone }),
      });

      // 2. Update ConsultantProfile
      const profile = await ConsultantProfile.findOneAndUpdate(
        { user: req.user._id },
        { skills, domain, experience, bio, availability },
        { new: true, upsert: true }
      );

      const updatedProfile = await ConsultantProfile.findOne({ user: req.user._id }).populate('user', '-password');

      res.json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (err) {
      console.error('Profile update error:', err.message);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

router.delete(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== 'consultant') {
        return res.status(403).json({ error: 'Access denied' });
      }

      await ConsultantProfile.findOneAndDelete({ user: req.user._id });
      res.json({ message: 'Consultant profile deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);  

  // ✅ Get all consultants
  router.get('/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const consultants = await User.find({ role: 'consultant' }).select('-password');
      res.json(consultants);
    } catch (err) {
      console.error('Fetch consultants error:', err.message); 
      res.status(500).json({ error: 'Failed to fetch consultants' });
    }
  });
module.exports = router;