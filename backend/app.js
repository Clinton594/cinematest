import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import UserRouter from "./routes/User.js";

// MiddleWares
import Errors from "./middlewares/Errors.js";
import "./services/cache.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "localhost:3000" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

mongoose.connect(process.env.MONGODBURI, () => {
  console.log("Connected to Database");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "App is running" });
});

app.use("/auth", UserRouter);

// Error handler
app.use(Errors);

app.listen(process.env.PORT, (res) => {
  console.clear();
  console.log(`Server start on port: ${process.env.PORT}`);
});
