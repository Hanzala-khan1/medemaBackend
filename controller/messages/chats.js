const Chat = require("../../models/chats");

const addchat = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        let activeUser = req.user.id
        let chatRoom = await Chat.findOne({
            users: [activeUser, userId]
        });
        if (chatRoom) {
            return res.status(200).json({ chatRoom });
        }
        chatRoom = await new Chat({
            users: [activeUser, userId],
            created_by: activeUser
        })
        await chatRoom.save()
        return res.status(200).json({ chatRoom });
    } catch (error) {
        return next(error);
    }
}
const getChatRoom = async (req, res, next) => {
    try {
        let activeUser = req.user.id
        let chatRoom = await Chat.find({
            users: activeUser
        }).populate(["users"])
        if (chatRoom) {
            return res.status(200).json({ chatRoom });
        }
        return res.status(200).json({ chatRoom });
    } catch (error) {
        return next(error);
    }
}

const deleteChatRoom = async (req, res, next) => {
    try {
        let chatRoomId = req.query.id
        let chatRoom = await Chat.findOne({
            _id: chatRoomId
        });
        if (chatRoom) {
            await Chat.findByIdAndDelete(chatRoomId)
        }
        return res.status(200).json({
            deleted: true
        });
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    addchat,
    getChatRoom,
    deleteChatRoom
}