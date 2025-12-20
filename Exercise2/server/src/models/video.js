// src/models/video.model.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // π.χ. "v101"
  title: { type: String, required: true },
  category: { type: String },
  duration: { type: String },
  thumbnail: { type: String }, // URL ή path
  src: { type: String },       // URL ή path
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  description: { type: String },
  tags: [{ type: String }]     // array με tags π.χ. ["coding", "basics"]
}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);
