const Joi = require('joi')

const favouriteUser = Joi.object().keys({
    is_add_rehab: Joi.boolean().required().label("type"),
    type: Joi.string().allow(null).allow('').label("full_name"),
    category: Joi.string().allow(null).allow('').label("full_name"),
    rehab_id: Joi.string().allow(null).allow('').label("full_name"),
    user_id: Joi.string().allow(null).allow('').label("full_name"),
});


module.exports = { favouriteUser }