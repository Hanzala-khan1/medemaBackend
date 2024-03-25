const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  rehab_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "RehabList",
  },
  is_booked_rehab: {
    type: Boolean,
    ref: "RehabList",
  },
  booked_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  package: {
    type: String,
  },
  amount: {
    type: String,
  },
  from: {
    type: String,
    default: "User",
  },
  to: {
    type: String,
  },
  patientName: {
    type: String,
  },
  gender: {
    type: String,
  },
  message: {
    type: String,
  },
  phone: {
    type: String,
  },
  altPhone: {
    type: String,
  },
  DOB: {
    type: String,
  },
  rate: {
    type: String,
  },
  ref: {
    type: String,
    default: "",
  },
  payment: {
    type: String,
    default: "unpaid",
  },
  status: {
    type: String,
    default: "pending",
  },
  type: {
    type: String,
  },
  reasonForBooking: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const booking = mongoose.model("booking", bookingSchema, "bookings");

module.exports = booking;
