const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
  web: {
    type: String,
    required: [true, "Please provide a web"],
    trim: true,
  },
  logo: {
    type: String,
    required: [true, "Please provide an icon from Fontawesome website"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Social = new mongoose.model("Social", socialSchema);

module.exports = Social;
