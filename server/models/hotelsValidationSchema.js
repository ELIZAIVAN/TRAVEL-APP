const Joi = require("joi");

const hotelsSchema = Joi.object({
    hotelname: Joi.string().required(),
    location: Joi.string().required(),
    state: Joi.string().required(),
    rate: Joi.number().required(),
    review: Joi.string().required(),
    overallrating: Joi.number().required(),
    about: Joi.string().required(),
    facilities: Joi.array().required(),
    image: Joi.array().required(),
    

});

module.exports = hotelsSchema;