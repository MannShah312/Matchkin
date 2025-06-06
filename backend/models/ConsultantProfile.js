const mongoose = require("mongoose");

const ConsultantProfile = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills: [{ type: String }],
  domain: { type: String }, // e.g., AI, Fintech, Healthcare
  experience: { type: Number }, // years
  bio: { type: String },
  availability: { type: String } // e.g., "Full-time", "Part-time"
}, { timestamps: true });


const ConsultantProfileModel = mongoose.model("ConsultantProfile", ConsultantProfile);
module.exports = ConsultantProfileModel;