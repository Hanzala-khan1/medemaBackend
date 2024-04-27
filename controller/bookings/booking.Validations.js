const Joi = require('joi')

const BookingvValidations = Joi.object().keys({
    booking_type: Joi.string().allow(null).allow('').required().label("booking_type"),
    requested_user_id: Joi.string().allow(null).allow('').label("requested_user_id"),
    appointment_date: Joi.string().allow(null).allow('').label("appointment_date"),
    requested_rehab_id: Joi.string().allow(null).allow('').label("requested_rehab_id"),
    is_booked_rehab: Joi.boolean().required().label("is_booked_rehab"),
    from: Joi.string().allow(null).allow('').required().label("from"),
    to: Joi.string().allow(null).allow('').required().label("to"),
    start_date: Joi.string().allow(null).allow('').label("start_date"),
    end_date: Joi.string().allow(null).allow('').label("end_date"),
    package: Joi.string().allow(null).allow('').required().label("package"),
    amount: Joi.string().allow(null).allow('').label("amount"),
    patientName: Joi.string().allow(null).allow('').required().label("patientName"),
    gender: Joi.string().allow(null).allow('').required().label("gender"),
    message: Joi.string().allow(null).allow('').label("message"),
    phone: Joi.string().allow(null).allow('').required().label("phone"),
    alternative_phone: Joi.string().allow(null).allow('').label("alternative_phone"),
    DOB: Joi.string().allow(null).allow('').required().label("DOB"),
    rate: Joi.string().allow(null).allow('').label("rate"),
    ref: Joi.string().allow(null).allow('').label("payment_status"),
    payment_status: Joi.string().allow(null).allow('').label("payment_status"),
    status: Joi.string().allow(null).allow('').label("status"),
    type: Joi.string().allow(null).allow('').label("type"),
    start_time: Joi.string().allow(null).allow('').label("start_time"),
    end_time: Joi.string().allow(null).allow('').label("end_time"),
    reason_for_booking: Joi.string().allow(null).allow('').label("reason_for_booking"),
    reasonForBooking: Joi.string().allow(null).allow('').label("reasonForBooking"),
    booking_Desc: Joi.string().allow(null).allow('').label("booking_Desc"),
    rate_type: Joi.string().allow(null).allow('').label("rate_type"),
    booked_by: Joi.string().allow(null).allow('').label("booked_by"),
});


module.exports = { BookingvValidations }