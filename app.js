//
//===============================================================
//=========================| DESTE.AZ |==========================
//===============================================================
//

//=======================| REQUIREMENTS |========================
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("./routes/adminRoute");
const page = require("./routes/pageRoute");
const app = express();

//==========================| SETTINGS |=========================
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("assets"));
app.set("view engine", "ejs");
app.use("/admin", admin);
app.use("/", page);

module.exports = app;
