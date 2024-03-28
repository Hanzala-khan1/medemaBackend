const Joi = require('joi')

const BookingvValidations = Joi.object().keys({
    booking_type: Joi.string().required().label("booking_type"),
    requested_user_id: Joi.string().label("requested_user_id"),
    appointment_date: Joi.string().label("appointment_date"),
    requested_rehab_id: Joi.string().label("requested_rehab_id"),
    is_booked_rehab: Joi.boolean().required().label("is_booked_rehab"),
    from: Joi.string().required().label("from"),
    to: Joi.string().required().label("to"),
    start_date: Joi.string().label("start_date"),
    end_date: Joi.string().label("end_date"),
    package: Joi.string().required().label("package"),
    amount: Joi.string().label("amount"),
    patientName: Joi.string().required().label("patientName"),
    gender: Joi.string().required().label("gender"),
    message: Joi.string().label("message"),
    phone: Joi.string().required().label("phone"),
    alternative_phone: Joi.string().label("alternative_phone"),
    DOB: Joi.string().required().label("DOB"),
    rate: Joi.string().label("rate"),
    ref: Joi.string().label("payment_status"),
    payment_status: Joi.string().label("payment_status"),
    status: Joi.string().label("status"),
    type: Joi.string().label("type"),
    start_time: Joi.string().label("start_time"),
    end_time: Joi.string().label("end_time"),
    reason_for_booking: Joi.string().label("reason_for_booking"),
    booking_Desc: Joi.string().label("booking_Desc"),
});


module.exports = { BookingvValidations }