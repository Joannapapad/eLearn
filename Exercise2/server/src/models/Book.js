// src/models/book.model.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // π.χ. "B101"
  title: { type: String, required: true },
  author: { type: String, required: true },
  edition: { type: String },
  category: { type: String },
  description: { type: String },
  recommendedCourses: [{ type: String }], // ids των μαθημάτων που σχετίζονται
  recommendedVideos: [{ type: String }]   // ids των βίντεο που σχετίζονται
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
