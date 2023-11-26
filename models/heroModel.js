const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide hero name"],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, "Please provide hero surname"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Please provide hero content"],
    trim: true,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Hero = new mongoose.model("Hero", heroSchema);

module.exports = Hero;
