const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  video: {
    type: String,
    required: [true, "Please provide video frame link from Youtube"],
  },
  cover: {
    type: String,
    required: [true, "Please provide a video cover image"],
  },
  title: {
    type: String,
    required: [true, "Please provide a video title"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Video = new mongoose.model("Video", videoSchema);

module.exports = Video;
