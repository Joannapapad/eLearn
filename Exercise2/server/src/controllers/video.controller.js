const Video = require("../models/video");

//Returns all videos stored in the database.
exports.getAllVideos = async (req, res) => {
  try {
    // Fetch every video document
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    // Server/database error
    res.status(500).json({ message: err.message });
  }
};

//Returns a single video based on MongoDB _id
exports.getVideoById = async (req, res) => {
  try {
    // Find by MongoDB ObjectId from the route parameter
    const video = await Video.findById(req.params.id);

    // If no document matches the given id
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (err) {
    // Includes invalid ObjectId format or DB issues
    res.status(500).json({ message: err.message });
  }
};

//Creates a new video using the request body
exports.createVideo = async (req, res) => {
  try {
    // Build a new document from incoming JSON
    const video = new Video(req.body);

    // Save and return the created document
    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    // Validation errors usually end up here
    res.status(400).json({ message: err.message });
  }
};

 //Updates an existing video and returns the updated document.
exports.updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document instead of the old one
    );
    res.json(updatedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

 //Deletes a video by id and returns a simple confirmation message.
exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
