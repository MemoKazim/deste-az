const mongoose = require("mongoose");

const famousSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide famous name"],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, "Please provide famous surname"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Please provide famous content"],
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

const Famous = new mongoose.model("Famous", famousSchema);

module.exports = Famous;
