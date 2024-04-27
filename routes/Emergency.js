const express = require("express");
const auth = require('../middlewares/auth');
const multer = require("multer");
const { MessagesController } = require("../controller/messages/messages.controller");
const router = express.Router();
const upload = multer({ dest: "temp/" });


//............auth...............
router.post("/message/addMessage",auth,MessagesController.addMessage );
router.post("/message/getmessages",auth, MessagesController.getMessage);
router.post("/message/allcharts",auth, MessagesController.getAllChats);

module.exports = router;
 