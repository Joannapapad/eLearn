const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Course = require("../models/Course");

exports.createEnrollment = async (req, res, next) => {
  const body = req.body || {}; // avoid crash
  console.log("Incoming enrollment body:", body);
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or Course not found" });
    }

    const existing = await Enrollment.findOne({
      user: userId,
      course: courseId
    });

    if (existing) {
      return res.status(409).json({ message: "User already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId
    });

    res.status(201).json({
      message: "Enrollment successful",
      enrollment
    });

  } catch (err) {
    next(err);
  }
};