// src/routes/courses.routes.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

// GET all courses
router.get("/", courseController.getAllCourses);

// GET course by ID
router.get("/:id", courseController.getCourseById);

// CREATE course
router.post("/", courseController.createCourse);

// UPDATE course
router.put("/:id", courseController.updateCourse);

// DELETE course
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
