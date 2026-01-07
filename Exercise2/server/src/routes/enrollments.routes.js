const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");


router.get("/", async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
});


router.post("/", async (req, res, next) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(409).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({ userId, courseId });

    res.status(201).json(enrollment);
  } catch (err) {
    console.error("ENROLLMENT ERROR:", err);
    next(err);
  }
});


module.exports = router;
