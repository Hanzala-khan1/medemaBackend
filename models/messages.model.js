const mongoose = require("mongoose");
const paginate = require('../services/pagination.pulgin');

const messagesSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    chat_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    message: {
        type: String,
        required: true,
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

messagesSchema.plugin(paginate);

const Messages = mongoose.model("Messages", messagesSchema);

module.exports = Messages;
