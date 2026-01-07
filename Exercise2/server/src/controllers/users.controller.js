const User = require("../models/User");

// Register a new user
// POST /api/users/register
exports.registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      occupation,
      email,
      password,
      interests,
      experience,
      goal
    } = req.body;

    // Basic required field validation
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !email ||
      !password ||
      !experience ||
      !goal
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create new user 
    const user = await User.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      occupation,
      email,
      password,
      interests,
      experience,
      goal
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (err) {
    next(err);
  }
};

// Retrieve all users
// GET /api/users
exports.getAllUsers = async (req, res, next) => {
  try {
    // Exclude passwords from the response
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Authenticate user login
// POST /api/users/login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate credentials
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (err) {
    next(err);
  }
};