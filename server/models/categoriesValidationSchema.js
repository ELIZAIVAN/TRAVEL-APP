const Joi = require("joi");

const categoriesSchema = Joi.object({
    entity: Joi.string().required(),
    

});

module.exports = categoriesSchema;
