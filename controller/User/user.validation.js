const Joi = require('joi')

const registerUser = Joi.object().keys({
    type: Joi.string().required().label("type"),
    role: Joi.string().required().label("role"),
    full_name: Joi.string().required().label("full_name"),
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password"),
    address: Joi.string().label("address"),
    city: Joi.string().required().label("city"),
    phone: Joi.string().required().label("phone"),
    is_rehab_employee: Joi.boolean().allow(null).allow('').label("is_rehab_employee"),
    is_rehab_admin: Joi.boolean().allow(null).allow('').label("is_rehab_admin"),
    rehab: Joi.string().allow(null).allow('').optional().label("rehab"),
    is_super_admin: Joi.boolean().allow(null).allow('').optional().label("is_super_admin"),
    availability: Joi.string().allow(null).allow('').optional().label("availability"),
    details: Joi.string().allow(null).allow('').optional().label("details"),
    dob: Joi.string().allow(null).allow('').optional().label("dob"),
    education: Joi.string().allow(null).allow('').optional().label("education"),
    experience: Joi.string().allow(null).allow('').optional().label("experience"),
    gender: Joi.string().allow(null).allow('').optional().label("gender"),
    hospital:Joi.string().allow(null).allow('').optional().label("hospital"),
    emergency:Joi.string().allow(null).allow('').optional().label("emergency"),
    perHour:Joi.string().allow(null).allow('').optional().label("perHour"),
    perDay:Joi.string().allow(null).allow('').optional().label("perDay"),
    images: Joi.array().allow(null).allow('').optional().label("lat"),
    lat: Joi.string().allow(null).allow('').optional().label("lat"),
    long: Joi.string().allow(null).allow('').optional().label("long"),
    ref: Joi.string().allow(null).allow('').optional().label("ref"),
    rgNo: Joi.string().allow(null).allow('').optional().label("rgNo"),
    speciality: Joi.string().allow(null).allow('').optional().label("speciality"),
    unAvailability: Joi.string().allow(null).allow('').optional().label("unAvailability"),
});
const getuserUser = Joi.object().keys({
    type: Joi.string().required().label("type"),
    role: Joi.string().required().label("role"),
    full_name: Joi.string().allow(null).allow('').label("full_name"),
    limit:Joi.number().required().label("limit"),
    page:Joi.number().required().label("page"),
    sort:Joi.string().label("sort"),
    search:Joi.string().label("search"),
    pricefilter:Joi.string().label("pricefilter"),
});


module.exports = { registerUser,getuserUser }