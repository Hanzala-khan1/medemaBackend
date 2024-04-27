const express = require("express");
const app = express();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const RehabList = require("../../models/RehabList");
const JWTService = require("../../services/JWTService.js");
const RefreshToken = require("../../models/token.js");
const AccessToken = require("../../models/accessToken.js");
const { favouriteUser } = require("./favourite.validation.js");
const Favourite = require("../../models/Favourites.js");
const { pick, getList } = require("../../services/crudServices.js");

const favouriteController = {
  async addRemoveFav(req, res, next) {
    try {
      const rehabId = req.body.rehab_id;
      const userId = req.body.user_id;

      const { error } = favouriteUser.validate(req.body);
      if (error) {
        return next(error);
      }
      const alreadyExist = await Favourite.findOne({
        rehab_id: rehabId,
        user_id: userId
      });
      if (alreadyExist) {
        await Favourite.findByIdAndRemove(alreadyExist._id)
        return res.status(200).json({ added: true });
      }
      if (rehabId) {
        const rehab = await RehabList.findOne({ _id: rehabId });
        if (!rehab) {
          const error = new Error("Rehab not found!");
          error.status = 404;
          return next(error);
        }
      }
      if (rehabId) {
        const userdata = await User.findOne({ _id: rehabId });
        if (!userdata) {
          const error = new Error("user not found!");
          error.status = 404;
          return next(error);
        }
      }
      req.body["created_by"] = req.user._id
      req.body["created_at"] = new Date()

      const favourite = await new Favourite(req.body)
      await favourite.save()
      return res.status(200).json({ added: true });
    } catch (error) {
      return next(error);
    }
  },

  async getAllFav(req, res, next) {
    try {
      const userId = req.user._id.toString();
      const user = await User.findOne({ _id: userId })
      if (!user) {
        const error = new Error("User not found!");
        error.status = 404;
        return next(error);
      }
      let query = {
        created_by: userId
      }

      req.body["limit"] = req.body.limit || 10;
      req.body["page"] = req.body.page || 1;

      const options = pick(req.body, ["limit", "page"]);
      const favourites = await getList(Favourite, query, options, ["rehab_id","user_id"])
      let userFavouriteByType = []
      if (favourites && favourites.results.length) {
        let categories = []

        for (category of categories) {
          query["category"] = category
          const userfavourite = await getList(Favourite, query, options, ["rehab_id","user_id"])

          if (userfavourite && userfavourite.length) {
            let obj = {
              categoryname: category,
              favourites: userfavourite.results
            }
            userFavouriteByType.push(obj)
          }
        }
      }
      favourites["userFavouriteByType"] = userFavouriteByType
      return res.status(200).json({ savedRehab: favourites });

    } catch (error) {
      return next(error);
    }
  },
};

module.exports = favouriteController;
