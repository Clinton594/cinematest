const mongoose = require("mongoose");
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
    maxLength: 10,
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

module.exports = mongoose.model("User", UserSchema);
