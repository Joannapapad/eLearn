const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String },
  duration: { type: String },
  thumbnail: { type: String }, 
  src: { type: String },       
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  description: { type: String },
  tags: [{ type: String }]   
}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);
