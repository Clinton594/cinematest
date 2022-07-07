const mongoose = import("mongoose");

const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cast: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  language: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
