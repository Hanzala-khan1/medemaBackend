const mongoose = require("mongoose");
const { userTypeEnum, userRoleEnum, userStatusEnum } = require("../services/enum");
const paginate = require('../services/pagination.pulgin');

const userSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        userTypeEnum.Individual,
        userTypeEnum.RehabEmployee,
        userTypeEnum.Visiter,
      ]
    },
    role: {
      type: String,
      required: true,
      enum: [
        userRoleEnum.Doctor,
        userRoleEnum.Nurses,
        userRoleEnum.Patient,
        userRoleEnum.PhysioDcotor,
        userRoleEnum.Webvister,
        userRoleEnum.RehabAdmin,
        userRoleEnum.Aya,
        userRoleEnum.Receptionist,
        userRoleEnum.Visiter,
      ]
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    is_rehab_employee: {
      type: Boolean,
      default: false,
    },
    is_rehab_admin: {
      type: Boolean,
      default: false,
    },
    rehab: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "RehabList",
      required: false
    },
    is_super_admin: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: String,
    },
    details: {
      type: String,
    },
    dob: {
      type: String,
    },
    education: {
      type: String,
    },
    experience: {
      type: String,
    },
    gender: {
      type: String,
    },
    hospital: {
      type: String,
    },
    emergency: {
      type: String,
    },
    perHour: {
      type: String,
    },
    perDay: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: [
        userStatusEnum.active,
        userStatusEnum.inactive,
        userStatusEnum.blocked,
      ]
    },
    images: [{
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    }],
    lat: {
      type: String,
    },
    long: {
      type: String,
    },
    description: {
      type: String,
    },
    discount: {
      type: String,
    },
    totalbookings: {
      type: Number,
    },
    speciality: {
      type: String,
    },
    unAvailability: {
      type: String,
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
userSchema.plugin(paginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
