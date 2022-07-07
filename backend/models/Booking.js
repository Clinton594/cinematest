const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
  location: {},
});

module.exports = mongoose.model("Booking", BookingSchema);
