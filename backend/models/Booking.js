import mongoose from "mongoose";
import { locations } from "./constants/movieMedata.json";

const { Schema } = mongoose;
const _locations = locations.map((x) => x.name);

const BookingSchema = new Schema({
  location: {
    type: String,
    validate: {
      validator: (value) => _locations.indexOf(value) > -1,
      message: ({ value }) => `${value} is not a valid location`,
    },
    required: true,
  },
  theatre_name: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  show_time: {
    type: Date,
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

export default mongoose.model("Booking", BookingSchema);
