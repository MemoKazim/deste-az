const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide event title"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Please provide event content"],
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

const Event = new mongoose.model("Event", eventSchema);

module.exports = Event;
