const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String },
  level: { type: String },
  credits: { type: Number },
  semester: { type: Number },
  prerequisites: [{ type: String }],
  description: { type: String },
  content: [{ type: String }],
  learningOutcomes: [{ type: String }],
  bibliography: [{ type: String }],
  professor: {
    name: { type: String },
    photo: { type: String },
    email: { type: String }
  }
});

module.exports = mongoose.model("Course", courseSchema);
