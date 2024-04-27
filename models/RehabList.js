const mongoose = require("mongoose");
const paginate = require('../services/pagination.pulgin');

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
  discount: {
    type: String,
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
  address: {
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
  status: {
    type: String,
    enum:["active","inactive"],
    default: "inactive"
  },
  is_active: {
    type: Boolean,
    default: false
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

rehabSvhema.plugin(paginate);

const RehabList = mongoose.model("RehabList", rehabSvhema);

module.exports = RehabList;
