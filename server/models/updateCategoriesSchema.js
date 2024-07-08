const Joi = require("joi");

const categoriesSchema = Joi.object({

    entity: Joi.string().optional(),
    image: Joi.string().optional()
    
});

module.exports = categoriesSchema;
