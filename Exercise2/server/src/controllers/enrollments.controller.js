const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Course = require("../models/Course");

// POST /api/enrollments
exports.createEnrollment = async (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    // check if user & course exist
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or Course not found" });
    }

    // prevent duplicate enrollment
    const existing = await Enrollment.findOne({ user: userId, course: courseId });
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

// GET /api/enrollments
exports.getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("user", "firstName lastName email")
      .populate("course", "title category");

    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

// GET /api/enrollments/user/:userId
exports.getEnrollmentsByUser = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ user: req.params.userId })
      .populate("course");

    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};
