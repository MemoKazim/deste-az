const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    unique: [true, "Community name must be unique"],
    type: String,
    required: [true, "Please provide community name"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Please provide community title"],
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
    required: [true, "Please provide community content"],
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

const Community = new mongoose.model("Community", communitySchema);

module.exports = Community;
