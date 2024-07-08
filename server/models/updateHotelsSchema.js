const Joi = require("joi");

const hotelsSchema = Joi.object({

    placename: Joi.string().optional(),
    location: Joi.string().optional(),
    state: Joi.string().optional(),
    rate: Joi.number().optional(),
    review: Joi.number().optional(),
    overallrating: Joi.number().optional(),
    about: Joi.string().optional(),
    facilities: Joi.array().optional(),
    image: Joi.array().optional(),
    
});

module.exports = hotelsSchema;
