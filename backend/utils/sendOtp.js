// backend/utils/sendOtp.js
const nodemailer = require('nodemailer');
const {client:redis} = require("./redisClient");
console.log(redis);
require('dotenv').config();

const OTP_EXPIRY_SECONDS = 300; // 5 minutes
const OTP_RATE_LIMIT_MAX = 5;
const OTP_RATE_LIMIT_WINDOW = 3600; // 1 hour

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const requestKey = `otp_req_${email}`;
  const otpKey = `otp_${email}`;

console.log('redis client:', redis);
console.log('redis client methods:', Object.keys(redis));


  // Rate limiting
  const reqCount = await redis.incr(requestKey);
  if (reqCount === 1) {
    await redis.expire(requestKey, OTP_RATE_LIMIT_WINDOW);
  }

  if (reqCount > OTP_RATE_LIMIT_MAX) {
    throw new Error('Too many OTP requests. Try again later.');
  }

  // Store OTP
  // await redis.setex(otpKey, OTP_EXPIRY_SECONDS, otp);
  await redis.set(otpKey, otp, { EX: OTP_EXPIRY_SECONDS });


  // Send email
  await transporter.sendMail({
    from: `"Matchkin" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for Matchkin Login',
    html: `<p>Your OTP is: <b>${otp}</b><br>It expires in 5 minutes.</p>`,
  });

  return true;
};

const verifyOtp = async (email, otp) => {
  const key = `otp_${email}`;
  const storedOtp = await redis.get(key);

  if (!storedOtp || storedOtp !== otp) {
    throw new Error('Invalid or expired OTP');
  }

  await redis.del(key); // Remove OTP after successful use
  return true;
};


module.exports = { sendOtp, verifyOtp };    