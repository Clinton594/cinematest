import express from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../models/User.js";
import Authenticate from "../middlewares/Authenticate.js";

const router = express.Router();

router.get(
  "/users",
  Authenticate,
  asyncHandler(async (req, res) => {
    const users = await UserModel.find({}, { first_name: 1, last_name: 1, email: 1, token: 1, createdAt: 1 }).cache();
    res.json(users);
  })
);

router.get(
  "/user/:id",
  Authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(
      { _id: id },
      { first_name: 1, last_name: 1, email: 1, token: 1, createdAt: 1 }
    );
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    let result = await UserModel.create({ first_name, last_name, email, password });
    if (result.first_name) {
      const token = await result.generateToken();
      res.status(201).json({ first_name, last_name, email, token, createdAt: result.createdAt });
    } else throw new Error("AN ERROR OCCURED");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne(
      { email },
      { first_name: 1, last_name: 1, email: 1, createdAt: 1, password: 1 }
    );
    if (user) {
      if (await user.comparePassword(password)) {
        user.token = await user.generateToken();
        const { first_name, last_name, token, createdAt } = user;
        res.json({ first_name, last_name, email, token, createdAt });
      } else {
        res.status(401);
        throw new Error("AUTHENTICATION FAILED");
      }
    } else {
      res.status(404);
      throw new Error("USER NOT FOUND");
    }
  })
);

router.post(
  "/confirm-email",
  asyncHandler(async (req, res) => {})
);

router.get(
  "/reset-password",
  asyncHandler(async (req, res) => {})
);

export default router;
