const mongoose = require("mongoose");
const paginate = require('../services/pagination.pulgin');

const chatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    last_message: {
        type: String,
        required: false,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

chatSchema.plugin(paginate);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
