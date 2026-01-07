const Course = require("../models/Course");

// Retrieve all courses
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// Retrieve a single course by its id
const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findOne({ id: req.params.id });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// Create a new course
const createCourse = async (req, res, next) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    next(error);
  }
};

// Update an existing course by id
const updateCourse = async (req, res, next) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

// Delete a course by id
const deleteCourse = async (req, res, next) => {
  try {
    const deletedCourse = await Course.findOneAndDelete({ id: req.params.id });

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Export controller methods
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
