const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const dbConnect = require("./database/index");
const ErrorHandler = require("./middlewares/errorHandler");
const { PORT } = require("./config/index");
const bodyParser = require('body-parser');

app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const userRouter = require("./routes/user");
const vendorRouter = require("./routes/vendor");


app.get("/", (req, res) => {
  res.send("app is running bro");
})

app.use(userRouter);
// app.use(vendorRouter);

dbConnect();
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log("server running "+PORT)
});