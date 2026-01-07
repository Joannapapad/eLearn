const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
