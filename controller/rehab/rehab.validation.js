const Joi = require('joi')

const addRehab = Joi.object().keys({
    Name: Joi.string().allow(null).allow('').label("Name"),
    admin_id: Joi.string().allow(null).allow('').label("full_name"),
    full_name: Joi.string().required().label("full_name"),
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password"),
    address: Joi.string().allow(null).allow('').label("address"),
    city: Joi.string().allow(null).allow('').label("city"),
    phone: Joi.string().required().label("phone"),
    details: Joi.string().allow(null).allow('').optional().label("details"),
    dob: Joi.string().allow(null).allow('').optional().label("dob"),
    education: Joi.string().allow(null).allow('').optional().label("education"),
    gender: Joi.string().allow(null).allow('').optional().label("gender"),
    perHour:Joi.string().allow(null).allow('').optional().label("perHour"),
    perDay:Joi.string().allow(null).allow('').optional().label("perDay"),
    images: Joi.array().allow(null).allow('').optional().label("lat"),
    lat: Joi.string().allow(null).allow('').optional().label("lat"),
    long: Joi.string().allow(null).allow('').optional().label("long"),
    description: Joi.string().allow(null).allow('').optional().label("description"),
    discount: Joi.any().allow(null).allow('').optional().label("discount")
});

const getRehablist = Joi.object().keys({
    Name: Joi.string().allow(null).allow('').label("full_name"),
    limit:Joi.number().required().label("limit"),
    page:Joi.number().required().label("page"),
    sort:Joi.string().label("sort"),
    search:Joi.string().label("search"),
    pricefilter:Joi.string().label("pricefilter"),
});


module.exports = { addRehab,getRehablist }