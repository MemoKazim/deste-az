const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide about name"],
    unique: [true, "About name must be unique"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Please provide about title"],
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
    required: [true, "Please provide about content"],
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

const About = new mongoose.model("About", aboutSchema);

module.exports = About;
