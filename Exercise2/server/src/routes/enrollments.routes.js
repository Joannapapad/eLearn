const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

router.post("/", async (req, res) => {
  const { userId, courseId } = req.body;

  const existing = await Enrollment.findOne({
    user: userId,
    course: courseId
  });

  if (existing) {
    return res.status(409).json({ message: "Already enrolled" });
  }

  const enrollment = await Enrollment.create({
    user: userId,
    course: courseId
  });

  res.status(201).json(enrollment);
});

module.exports = router;