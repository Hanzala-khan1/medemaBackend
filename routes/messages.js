const express = require("express");
// const vendorAuthController = require("../controller/Vendor/authController");
const auth = require('../middlewares/auth');
// const uploadFileController = require("../controller/utils/uploadFileController");
const multer = require("multer");
const Emergencycontrol = require("../controller/Emergency/Emergency.controller");
const MessagesController = require("../controller/messages/messages.controller");
const { addchat, getChatRoom, deleteChatRoom } = require("../controller/messages/chats");
const router = express.Router();
const upload = multer({ dest: "temp/" });


//............auth...............
router.post("/message/addmessage",auth,MessagesController.addMessage );
router.post("/message/getmessages",auth, MessagesController.getMessage);
// router.post("/message/allcharts",auth, MessagesController.getAllChats);


router.post("/message/addEmergency",auth,Emergencycontrol.addEmergency );
router.post("/message/getallemergency",auth, Emergencycontrol.getallemergency);
router.post("/message/deleteEmergency",auth, Emergencycontrol.deleteEmergency);

router.post("/message/addchat",auth,addchat );
router.post("/message/getChatRoom",auth, getChatRoom);
router.post("/message/deleteChatRoom",auth, deleteChatRoom);
module.exports = router;
 