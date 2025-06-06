const mongoose = require("mongoose");

const ClientProfile = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String },
  website: { type: String },
  description: { type: String }
}, { timestamps: true });


const ClientProfileModel = mongoose.model("ClientProfile", ClientProfile);
module.exports = ClientProfileModel;