const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide new title"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Please provide new content"],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "Please provide image cover"],
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const New = new mongoose.model("New", newSchema);

module.exports = New;
