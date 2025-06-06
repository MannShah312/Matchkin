const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ["client", "consultant"],
    default: "client",
    required: true
  },
  isVerified: {
     type: Boolean, 
     default: false 
    },
  googleId: { 
    type: String 
  },
  code: { 
    type: String 
  }, // for internal tracking
}, {
  timestamps: true
});
const UserModel = mongoose.model("User", User);
module.exports = UserModel;