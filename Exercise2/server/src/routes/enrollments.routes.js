const express = require("express");
const router = express.Router();
const enrollmentsController = require("../controllers/enrollments.controller");

router.post("/", enrollmentsController.createEnrollment);
router.get("/", enrollmentsController.getAllEnrollments);
router.get("/user/:userId", enrollmentsController.getEnrollmentsByUser);

module.exports = router;
