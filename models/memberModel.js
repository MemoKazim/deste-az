const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, "Please provide a surname"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
    trim: true,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Member = new mongoose.model("Member", memberSchema);

module.exports = Member;
