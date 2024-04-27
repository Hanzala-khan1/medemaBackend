const express = require("express");
const userAuthController = require("../controller/User/authController");
const auth = require('../middlewares/auth');
const uploadFileController = require("../controller/utils/uploadFileController");
const categoryController = require("../controller/categories/categoriesController")
const rehabListController = require("../controller/rehab/rehabListController")
const favouriteController = require("../controller/favourites/favouriteController")
const bookingController = require("../controller/bookings/bookingController");
const multer = require("multer");
const { getUserCount, updateuser, deleteUser } = require("../controller/User/user.controller");
// const {upload} = require("../controller/utils/uploadFileController");
const router = express.Router();


///////////////////////// images ////////////////////////////////////////////
const storage = multer.diskStorage({
  destination: "./upload/images/",
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000000
  }
})
router.use('/profile', express.static("./upload/images/"));
////////////////////////////////////////////////////////////////////
//............auth...............
router.post("/user/register", upload.array('image', 12), userAuthController.register);
router.post("/user/login", userAuthController.login);
router.get("/user/singleuser",auth, userAuthController.getUserByID);
router.put("/user/updateProfile", auth, userAuthController.updateProfile);
router.post("/user/logout", auth, userAuthController.logout);
router.post("/user/getUserByType", userAuthController.getAUserByType);
router.get("/user/getUsersCount", auth, getUserCount);
router.post("/user/updateuser", auth, updateuser);
router.post("/user/deleteUser", auth, deleteUser);


router.get("/user/getCategories", categoryController.getCategories);
router.post("/user/getAllRehabLists", rehabListController.getAllRehabLists);
router.get("/user/getARehab", rehabListController.getARehab);
router.post("/user/addRehab",auth, rehabListController.addRehab);
router.post("/user/updateRehab",auth, rehabListController.updateRehab);
router.post("/user/deleteRehab",auth, rehabListController.deleteRehab);

//..................favourites.....................
router.post("/user/addRemoveFav", auth, favouriteController.addRemoveFav);
router.get("/user/getAllFav", auth, favouriteController.getAllFav);

//..........booking...........
router.post("/user/addBooking", auth, bookingController.addBooking);
router.get("/user/getBooking", auth, bookingController.getBooking);
router.get("/user/getAllBookings", auth, bookingController.getAllBookings);



module.exports = router;