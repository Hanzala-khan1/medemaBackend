const express = require("express");
const userAuthController = require("../controller/User/authController");
const auth = require('../middlewares/auth');
const categoryController = require("../controller/categories/categoriesController")
const rehabListController = require("../controller/rehab/rehabListController")
const favouriteController = require("../controller/favourites/favouriteController")
const bookingController = require("../controller/bookings/bookingController");
const { getUserCount, updateuser, deleteUser, getInactiveUsers, UpdateuserStatus } = require("../controller/User/user.controller");
const { upload } = require("../middlewares/multer");
const router = express.Router();



//............auth...............
router.post("/user/register", upload.array('images'), userAuthController.register);
router.post("/user/login", userAuthController.login);
router.get("/user/singleuser",auth, userAuthController.getUserByID);
router.put("/user/updateProfile", auth, userAuthController.updateProfile);
router.post("/user/logout", auth, userAuthController.logout);
router.post("/user/getUserByType", userAuthController.getAUserByType);
router.get("/user/getUsersCount", auth, getUserCount);
router.post("/user/updateuser", auth, updateuser);
router.post("/user/deleteUser", auth, deleteUser);
router.post("/user/UpdateuserStatus", auth, UpdateuserStatus);
router.post("/user/getInactiveUsers", auth, getInactiveUsers);


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
router.post("/user/changeBookingStatus", auth, bookingController.changeBookingStatus);



module.exports = router;