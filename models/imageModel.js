const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Please provide image"],
  },
  title: {
    type: String,
    required: [true, "Please provide image title"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Image = new mongoose.model("Image", imageSchema);

module.exports = Image;
