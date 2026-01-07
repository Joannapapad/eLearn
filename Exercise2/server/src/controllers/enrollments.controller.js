const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Course = require("../models/Course");


exports.createEnrollment = async (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    const existing = await Enrollment.findOne({ userId, courseId });

    if (existing) {
      return res.status(409).json({ message: "User already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({ userId, courseId });

    res.status(201).json({
      message: "Enrollment successful",
      enrollment
    });

  } catch (err) {
    next(err);
  }
};
