const express = require("express");
const app = express();
const RehabList = require("../../models/RehabList");
const User = require("../../models/User");
const { userTypeEnum, userRoleEnum, userStatusEnum } = require("../../services/enum");
const { getuserUser } = require("../User/user.validation");
const { addRehab, getRehablist } = require("./rehab.validation");
const { pick, getList } = require("../../services/crudServices");

const rehabListController = {
  async getAllRehabLists(req, res, next) {
    try {
      let {search ,sort,pricefilter} = req.body
      const { error } = getRehablist.validate(req.body);

      if (error) {
        return next(error);
      }

      let query = {}
      if (search) {
        query["Name"] = { $regex: '.*' + search + '.*', $options: 'i' }
      }
      const options = pick(req.body, ["limit", "page"]);
      if (sort){
         sort=="ascending"?(sort=1):(sort=-1)
        options["sort"]={
          Name:sort
        }
      }
      const userList = await getList(RehabList, query, options, [])

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
  async addRehab(req, res, next) {
    try {
      const { error } = addRehab.validate(req.body);

      if (error) {
        return next(error);
      }
      const alreadyExist = await RehabList.findOne({
        Name: { $regex: '.*' + req.body.Name + '.*', $options: 'i' }
      });

      if (alreadyExist) {
        const error = new Error("Rehab Already Exist");
        error.status = 404;
        return next(error);
      }

      let new_rehab = await new RehabList(req.body)
      let user = {
        ...req.body,
        type: userTypeEnum.RehabEmployee,
        is_rehab_employee: true,
        is_rehab_admin: true,
        role:userRoleEnum.RehabAdmin,
        rehab:new_rehab._id.toString(),
        status:userStatusEnum.active
      }
      const alreadyExistUser = await User.findOne({
        email: req.body.email
      })
      if (alreadyExistUser) {
        const error = {
          status: 401,
          message: "User with this email already exist",
        };
  
        return next(error);
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword
      let rehab_Admin = await new User(user)

      new_rehab["rehab_Admin"] = rehab_Admin._id.toString()

      await rehab_Admin.save()
      await new_rehab.save()

      return res.status(200).json({ new_rehab });
    } catch (error) {
      return next(error);
    }
  },

  async getARehab(req, res, next) {
    try {
      const rehabId = req.query.id;
      const rehab = await RehabList.findOne({ _id: rehabId });

      if (!rehab) {
        const error = new Error("Rehab not found!");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json({ rehab });
    } catch (error) {
      return next(error);
    }
  },
async updateRehab(req, res, next) {
  try {
    const rehabId = req.body._id;
    const rehab = await RehabList.findOne({ _id: rehabId });

    if (!rehab) {
      const error = new Error("Rehab not found!");
      error.status = 404;
      return next(error);
    }
    const updaterhab = await RehabList.findByIdAndUpdate(
      {_id:req.body._id},
      {
        $set:req.body
      }
    )
    return res.status(200).json({ updaterhab });
  } catch (error) {
    return next(error);
  }
},

async deleteRehab(req, res, next) {
  try {
    const rehabId = req.body._id;
    const rehab = await RehabList.findOne({ _id: rehabId });

    if (!rehab) {
      const error = new Error("Rehab not found!");
      error.status = 404;
      return next(error);
    }
    const updaterhab = await RehabList.findByIdAndDelete(rehabId)
    return res.status(200).json({ updaterhab });
  } catch (error) {
    return next(error);
  }
},
};

module.exports = rehabListController;
