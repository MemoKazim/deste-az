const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
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

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;
