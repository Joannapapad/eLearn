const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

// Retrieve all enrollments
// GET /api/enrollments
router.get("/", async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
});

// Create a new enrollment
// POST /api/enrollments
router.post("/", async (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    // Validate required fields
    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    // Prevent duplicate enrollments
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(409).json({ message: "Already enrolled" });
    }

    // Create enrollment record
    const enrollment = await Enrollment.create({ userId, courseId });

    res.status(201).json(enrollment);
  } catch (err) {
    // Log debugging
    console.error("ENROLLMENT ERROR:", err);
    next(err);
  }
});

module.exports = router;
