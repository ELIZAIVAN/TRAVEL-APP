const Joi = require("joi");

const servicesSchema = Joi.object({

    entity: Joi.string().optional(),
    image: Joi.string().optional()
    
});

module.exports = servicesSchema;
