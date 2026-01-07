const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

// User registration (creates a new user in the database)
router.post("/register", usersController.registerUser);

// User login (verifies credentials and returns auth info depending on implementation)
router.post("/login", usersController.loginUser);

// Get all users (mainly for admin/testing purposes in this project)
router.get("/", usersController.getAllUsers);

module.exports = router;
