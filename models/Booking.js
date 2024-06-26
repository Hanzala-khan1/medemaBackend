const mongoose = require("mongoose");
const { bookingStatusEnum, bookingTypeEnum } = require("../services/enum");
const paginate = require('../services/pagination.pulgin');

const bookingSchema = new mongoose.Schema({
  booking_type: {
    type: String,
    enum: [bookingTypeEnum.rehab, bookingTypeEnum.user],
    required: true,
  },
  requested_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  booked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requested_rehab_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rehab",
  },
  is_booked_rehab: {
    type: Boolean
  },
  appointment_date: {
    type: Date,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  package: {
    type: String,
    enum: ["perDay", "weekly", "monthly"]
  },
  rate_type: {
    type: String,
    enum: ["perDay", "perHour"]
  },
  reason_for_booking: {
    type: String,
  },
  booking_Desc: {
    type: String,
  },
  amount: {
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
  alternative_phone: {
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
  payment_status: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "paid",
  },
  status: {
    type: String,
    enum: [bookingStatusEnum.accepted, bookingStatusEnum.pending, bookingStatusEnum.rejected, bookingStatusEnum.completed],
    default: "pending",
  },
  start_time: {
    type: Date,
  },
  end_time: {
    type: Date,
  },
  reasonForBooking: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
    default: Date.now,
  },
  updated_by: {
    type: String,
    default: Date.now,
  },
});

bookingSchema.plugin(paginate);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
