const express = require("express");
const app = express();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const JWTService = require("../../services/JWTService.js");
const RefreshToken = require("../../models/token.js");
const AccessToken = require("../../models/accessToken.js");
const { registerUser, getuserUser } = require("./user.validation.js");
const { userTypeEnum, userStatusEnum } = require("../../services/enum.js");
const { uploadImages } = require("../utils/uploadFileController.js");
const { getByIds, getList, pick, getOne } = require("../../services/crudServices.js");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const userAuthController = {
  async register(req, res, next) {
let file =req.file
    const { error } = registerUser.validate(req.body);

    if (error) {
      return next(error);
    }

    const { email, password } = req.body;

    const alreadyExistUser = await User.findOne({
      email: email
    })
    if (alreadyExistUser) {
      const error = {
        status: 401,
        message: "User with this email already exist",
      };

      return next(error);
    }
    if (req.body.type == userTypeEnum.Individual) {
      req.body['status']=userStatusEnum.active
    }

    // if (req.body.images && req.body.images.length) {
    //   const images =await uploadImages(req, res)
    // }
    let accessToken;
    let refreshToken;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword
    let user;
    try {
      const userToRegister = new User(req.body);

      user = await userToRegister.save();

      // token generation
      accessToken = JWTService.signAccessToken({ _id: user._id }, "365d");

      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "365d");
    } catch (error) {
      return next(error);
    }

    // store refresh token in db
    await JWTService.storeRefreshToken(refreshToken, user._id);
    await JWTService.storeAccessToken(accessToken, user._id);

    // 6. response send

    // const userDto = new usertorDto(user);

    return res.status(201).json({ user: user, auth: true, token: accessToken });
  },

  async login(req, res, next) {
    const userLoginSchema = Joi.object({
      email: Joi.string().min(5).max(30).required(),
      password: Joi.string(),
    });
    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { email, password } = req.body;

    let doc;

    try {
      // match username
      doc = await User.findOne({ email: email });
      if (!doc) {
        const error = {
          status: 401,
          message: "Invalid email",
        };
      }

      const match = await bcrypt.compare(password, doc.password);

      if (!match) {
        const error = {
          status: 401,
          message: "Invalid Password",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const accessToken = JWTService.signAccessToken({ _id: doc._id }, "365d");
    const refreshToken = JWTService.signRefreshToken({ _id: doc._id }, "365d");
    // update refresh token in database
    try {
      await RefreshToken.updateOne(
        {
          userId: doc._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    try {
      await AccessToken.updateOne(
        {
          userId: doc._id,
        },
        { token: accessToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    return res
      .status(200)
      .json({ user: doc, auth: true, token: accessToken });
  },

  async updateProfile(req, res, next) {
    const docSchema = Joi.object({
      userName: Joi.string(),
      email: Joi.string(),
      role: Joi.string(),
      savedRehab: Joi.string(),
      password: Joi.string().pattern(passwordPattern),
    });

    const { error } = docSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const { userName, email, role, savedRehab, password } = req.body;
    const docId = req.user._id;

    const doc = await User.findById(docId);

    if (!doc) {
      const error = new Error("User not found!");
      error.status = 404;
      return next(error);
    }

    // Update only the provided fields
    if (userName) doc.userName = userName;
    if (email) doc.email = email;
    if (role) doc.role = role;
    if (savedRehab) doc.savedRehab = savedRehab;
    if (password) doc.password = password;

    // Save the updated test
    await doc.save();

    return res
      .status(200)
      .json({ message: "User updated successfully", user: doc });
  },

  async logout(req, res, next) {
    // 1. delete refresh token from db
    // const refHeader = req.headers["refreshToken"];
    // const refreshToken = refHeader && refHeader.split(" ")[1];
    const userId = req.user._id;
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    try {
      await RefreshToken.deleteOne({ userId });
    } catch (error) {
      return next(error);
    }
    try {
      await AccessToken.deleteOne({ token: accessToken });
    } catch (error) {
      return next(error);
    }

    // 2. response
    res.status(200).json({ user: null, auth: false });
  },
  async getAUserByType(req, res, next) {
    try {
      let { type, role, rehab, search ,sort,pricefilter} = req.body
      const { error } = getuserUser.validate(req.body);

      if (error) {
        return next(error);
      }

      let query = {
        type: type,
        role: role
      }
      if (search) {
        query["full_name"] = { $regex: '.*' + search + '.*', $options: 'i' }
      }
      if (rehab) {
        query['query'] = rehab
      }
      const options = pick(req.body, ["limit", "page"]);
      if (sort){
         sort=="ascending"?(sort=1):(sort=-1)
        options["sort"]={
          full_name:sort
        }
      }
      const userList = await getList(User, query, options, [])

      if (!userList) {
        const error = new Error("users not found!");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json({ userList });
    } catch (error) {
      return next(error);
    }
  },
  async getUserByID(req, res, next) {
    try {
    let userId=  req.query.id;
    if (!userId) {
      const error = new Error("User ID is required");
      error.status = 404;
      return next(error);
    }
      const userList = await User.findById("6605a6d64c87425ce8c7391b")

      if (!userList) {
        const error = new Error("users not found!");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json({ userList });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = userAuthController;
