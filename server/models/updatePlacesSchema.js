const Joi = require("joi");

const placesSchema = Joi.object({

    placename: Joi.string().optional(),
    location: Joi.string().optional(),
    state: Joi.string().optional(),
    rate: Joi.number().optional(),
    overallrating: Joi.number().optional(),
    about: Joi.string().optional(),
    facilities: Joi.array().optional(),
    image: Joi.array().optional(),
    
});

module.exports = placesSchema;
