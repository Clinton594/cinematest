import express from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import UserModel from "../models/User.js";

const router = express.Router();

router.get(
  "/users",
  asyncHandler(async (req, res) => {})
);

router.get(
  "/user:id",
  asyncHandler(async (req, res) => {})
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    // UserSchema
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {})
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
