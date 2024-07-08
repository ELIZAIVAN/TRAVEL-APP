const Joi = require("joi");

const servicesSchema = Joi.object({
    entity: Joi.string().required(),
    

});

module.exports = servicesSchema;