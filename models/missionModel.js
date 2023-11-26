const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide mission name"],
    unique: [true, "Mission name must be unique"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Please provide mission title"],
    trim: true,
  },
  endpoint: {
    type: String,
    required: [true, "Please provide enpoint path"],
    unique: [true, "Endpoint path must be unique"],
    trim: true,
  },
  templateType: {
    type: Number,
    required: [true, "Please provide template number"],
    min: 1,
    max: 3,
  },
  content: {
    type: String,
    required: [true, "Please provide mission content"],
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

const Mission = new mongoose.model("Mission", missionSchema);

module.exports = Mission;
