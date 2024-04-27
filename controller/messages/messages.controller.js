const Chat = require("../../models/chats");
const Messages = require("../../models/messages.model");

// import Messages from "../../models/messages.model";
const MessagesController = {
    async addMessage(req, res, next) {
        try {
            const { message, chatId } = req.body;
            const activeUser = req.user.id
            const chat = await Chat.findById(chatId)
            if (!chat) {
                res.status(500).json({ message: "chat does not exist" });
            }
            let userId = chat.users.find((chatuser) => {
                return chatuser.toString() !== activeUser
            })
            userId = userId.toString()
            const newMessage = await Messages.create({
                from_user: activeUser,
                to_user: userId,
                message: message,
                created_by: activeUser,
                chat_id: chatId
            });
            res.status(201).json(newMessage);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async getMessage(req, res, next) {
        try {
            const { chatId } = req.body;
            const messages = await Messages.find({
                chat_id: chatId
            }).sort({ created_at: 1 });
            res.status(200).json(messages);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};


module.exports = MessagesController
