const mongoose = require("mongoose");

const rehabSvhema = new mongoose.Schema({
  Name: {
    type: String,
  },
  description: {
    type: String,
  },
  package: {
    type: String,
  },
  doctorAvail: {
    type: Boolean,
  },
  newPrice: {
    type: Boolean,
  },
  oldPrice: {
    type: Boolean,
  },
  title: {
    type: Boolean,
  },
  dob: {
    type: String,
  },
  fees: {
    type: String,
  },
  email: {
    type: String,
  },
  images: {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  parkingFacility: {
    type: Boolean,
  },
  perDay: {
    type: String,
  },
  perHour: {
    type: String,
  },
  powerBackup: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  created_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  updated_by: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  }
},
{
  timestamps: true // Add timestamps
}
);

const RehabList = mongoose.model("RehabList", rehabSvhema);

module.exports = RehabList;
