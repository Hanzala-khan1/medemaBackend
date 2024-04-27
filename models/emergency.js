const mongoose = require("mongoose");
const paginate = require('../services/pagination.pulgin');

const emergencySchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

emergencySchema.plugin(paginate);

const Emergency = mongoose.model("Emergency", emergencySchema);

module.exports = Emergency;
