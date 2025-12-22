const express = require("express");
const router = express.Router();
const videoController = require("../controllers/video.controller");

// GET all videos
router.get("/", videoController.getAllVideos);

// GET video by ID
router.get("/:id", videoController.getVideoById);

// CREATE video
router.post("/", videoController.createVideo);

// UPDATE video
router.put("/:id", videoController.updateVideo);

// DELETE video
router.delete("/:id", videoController.deleteVideo);

module.exports = router;
