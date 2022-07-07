const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODBURI, () => {
  console.log("Connected to Database");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Worked" });
});

app.listen(process.env.PORT, (res) => {
  console.log(`Server start on port: ${process.env.PORT}`);
});
