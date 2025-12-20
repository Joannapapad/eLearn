// src/models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  dateOfBirth: {
    type: Date,
    required: true
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },

  occupation: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  interests: [{
    type: String
  }],

  experience: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true
  },

  goal: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
