const express = require("express");
const app = express();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Booking = require("../../models/Booking");
const RehabList = require("../../models/RehabList");
const { BookingvValidations } = require("./booking.Validations");
const { bookingTypeEnum, userTypeEnum, bookingStatusEnum } = require("../../services/enum");
const { getList, pick } = require("../../services/crudServices");

const bookingController = {
  async addBooking(req, res, next) {
    try {
      let data = req.body
      const { error } = BookingvValidations.validate(data);
      if (error) {
        return next(error);
      }
      let { booking_type, requested_user_id, requested_rehab_id } = data

      data['booked_by'] = req.user._id.toString()

      if (booking_type == bookingTypeEnum.user) {
        data['is_booked_rehab'] = false
        let request_user = await User.findById(requested_user_id)
        if (!request_user) {
          const error = new Error("No User found!");
          error.status = 404;
          return next(error);
        }
      }
      else if (booking_type === bookingTypeEnum.rehab) {
        data['is_booked_rehab'] = true
        let request_rehab = await RehabList.findById(requested_rehab_id)
        if (!request_rehab) {
          const error = new Error("No User found!");
          error.status = 404;
          return next(error);
        }
      }
      // if (data.rate){
      //   data.rate
      // }
      data['status'] = bookingStatusEnum.pending
      data['payment_status'] = "unpaid"
      data['created_at'] = new Date()
      data['created_by'] = req.user.id
      data['updated_at'] = new Date()
      data['updated_by'] = req.user.id

      let userBooking = await new Booking(data)

      userBooking = await userBooking.save()

      return res.status(200).json({ Booking: userBooking });

    } catch (error) {
      return next(error);
    }
  },

  async getBooking(req, res, next) {
    try {
      const id = req.query.bookingId;
      let user = req.user.id


      const booking = await Booking.findOne({ _id: id });
      if (!booking) {
        const error = new Error("Booking not found!");
        error.status = 404;
        return next(error);
      }
      // Save the updated user document

      return res.status(200).json({ booking: booking });
    } catch (error) {
      return next(error);
    }
  },

  async getAllBookings(req, res, next) {
    try {

      let userId = req.user._id.toString()
      let userData = await User.findById(userId)
      if (!userData) {
        const error = new Error("No User found!");
        error.status = 404;
        return next(error);
      }
      let query = {}
      if (userData.type == userTypeEnum.Visiter){
        query['created_by'] = userId
      }
      if (userData.type == userTypeEnum.Individual) {
        query['requested_user_id'] = userId
      }
      else if (userData.type == userTypeEnum.RehabEmployee) {
        if (userData.is_rehab_admin) {
          query['requested_rehab_id'] = userData.rehab
        }
      }
      if (req.query.status){
        query['status'] = req.query.status
      }

      const options = pick(req.body, ["limit", "page"]);
      const bookinglist = await getList(Booking, query, options, ["requested_user_id",'booked_by'])
      let reults=bookinglist.results
      for (i=0;i<=10;i++){
        bookinglist.results.forEach(result => {
          reults.push(result)
        });
      }
      bookinglist.results=reults
      if (!bookinglist) {
        const error = new Error("No bookings found!");
        error.status = 404;
        return next(error);
      }

      return res.status(200).json({ bookings: bookinglist });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = bookingController;
