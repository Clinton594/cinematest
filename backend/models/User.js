import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    minLength: 3,
    maxLength: 10,
  },
  last_name: {
    type: String,
    minLength: 3,
    maxLength: 10,
  },
  email: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    index: { unique: true },
    validate: {
      validator: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.hashPassword = function () {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

UserSchema.pre("save", function () {
  if (this.password !== undefined) this.hashPassword();
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
