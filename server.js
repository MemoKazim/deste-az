const dotenv = require("dotenv");
const app = require("./app");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const DB = process.env.LOCAL_DATABASE;

dotenv.config("./.env");

mongoose.set("strictQuery", true);
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB successfully connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is open at ${PORT}`);
});
