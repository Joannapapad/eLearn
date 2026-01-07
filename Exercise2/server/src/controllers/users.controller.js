const User = require("../models/User");

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

    // basic validation
    if (!firstName || !lastName || !dateOfBirth || !email || !password || !experience || !goal) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      occupation,
      email,
      password, // (χωρίς hashing για τώρα)
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

// GET /api/users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password (plain text for now)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

  } catch (err) {
    next(err);
  }
};
