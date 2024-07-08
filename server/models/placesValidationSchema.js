const Joi = require("joi");

const placesSchema = Joi.object({
    placename: Joi.string().required(),
    location: Joi.string().required(),
    state: Joi.string().required(),
    rate: Joi.number().required(),
    //overallrating: Joi.number().required(),
    about: Joi.string().required(),
    facilities: Joi.required(),
    //image: Joi.array().required(),
    

});

module.exports = placesSchema;