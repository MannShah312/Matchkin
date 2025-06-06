const mongoose = require("mongoose");

const Project = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  requiredSkills: [{ type: String }],
  domain: { type: String },
  timeline: { type: String }, // e.g., "1 month", "3 weeks"
  budget: { type: Number },
}, { timestamps: true });

const ProjectModel = mongoose.model("Project", Project);
module.exports = ProjectModel;