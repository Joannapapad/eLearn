const Video = require("../models/video");

// GET all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE video
exports.createVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE video
exports.updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE video
exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
