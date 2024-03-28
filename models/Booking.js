const mongoose = require("mongoose");
const { bookingStatusEnum, bookingTypeEnum } = require("../services/enum");

const bookingSchema = new mongoose.Schema({
  booking_type: {
    type: String,
    enum: [bookingTypeEnum.rehab, bookingTypeEnum.user],
    required: true,
  },
  requested_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  is_booked_rehab:{
    type:Boolean
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
    enum:["perDay","weekly","monthly"]
  },
  reason_for_booking:{
    type: String,
  },
  booking_Desc:{
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
    default: "unpaid",
  },
  status: {
    type: String,
    enum: [bookingStatusEnum.accepted,bookingStatusEnum.pending,bookingStatusEnum.rejected],
    default: "pending",
  },
  type: {
    type: String,
    enum: ["hourly", "daily"], 
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
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
