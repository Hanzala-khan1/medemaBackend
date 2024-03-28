const express = require("express");
const userAuthController = require("../controller/User/authController");
const auth = require('../middlewares/auth');
const uploadFileController = require("../controller/utils/uploadFileController");
const categoryController = require("../controller/categories/categoriesController")
const rehabListController = require("../controller/rehab/rehabListController")
const favouriteController = require("../controller/favourites/favouriteController")
const bookingController = require("../controller/bookings/bookingController");
const multer = require("multer");
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
router.post("/user/register",upload.array('image',12),userAuthController.register);
router.post("/user/login", userAuthController.login);
router.get("/user/singleuser", userAuthController.getUserByID);
router.put("/user/updateProfile", auth, userAuthController.updateProfile);
router.post("/user/logout", auth, userAuthController.logout);
router.post("/user/getUserByType", userAuthController.getAUserByType);


router.get("/user/getCategories", categoryController.getCategories);
router.get("/user/getAllRehabLists", rehabListController.getAllRehabLists);
router.get("/user/getARehab", rehabListController.getARehab);

//..................favourites.....................
router.post("/user/addRemoveFav", favouriteController.addRemoveFav);
router.get("/user/getAllFav", favouriteController.getAllFav);

//..........booking...........
router.post("/user/addBooking", bookingController.addBooking);
router.get("/user/getBooking", bookingController.getBooking);
router.get("/user/getAllBookings", bookingController.getAllBookings);



module.exports = router;