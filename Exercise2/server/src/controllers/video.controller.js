// src/controllers/video.controller.js
const Video = require("../models/video.model");

// GET all videos
const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

// GET a single video by ID
const getVideoById = async (req, res, next) => {
  try {
    const video = await Video.findOne({ id: req.params.id });
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

// CREATE a new video
const createVideo = async (req, res, next) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
};

// UPDATE a video by ID
const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

// DELETE a video by ID
const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findOneAndDelete({ id: req.params.id });
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo
};
