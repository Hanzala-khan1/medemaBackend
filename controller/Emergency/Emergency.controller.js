const express = require("express");
const Emergency = require("../../models/emergency");

const Emergencycontrol = {
    async getallemergency(req, res, next) {
        try {
            const getMessages = await Emergency.find()
            if (getMessages) {
                return res.status(200).send({
                    message: "all emrgency messages",
                    data: getMessages
                })
            }
            return res.status(200).send({
                message: "all emrgency messages",
                data: getMessages
            })
        } catch (error) {
            return next(error);
        }
    },
    async addEmergency(req, res, next) {
        try {
            const data = req.body
            const userId= req.user.id
            data['from_user'] = userId
            const addemergency = await new Emergency(req.body)
            await addemergency.save()
           return res.status(200).send({
                message: "all emrgency messages",
                data: addemergency
            })
        } catch (error) {
            return next(error);
        }
    },

    async deleteEmergency(req, res, next) {
        try {
            let id = req.body.id
            const emergency = await Emergency.findByIdAndDelete(id)
            res.status(200).send({
                message: "all emrgency messages",
                data: emergency
            })

        } catch (error) {
            return next(error);
        }
    },
};

module.exports = Emergencycontrol;
