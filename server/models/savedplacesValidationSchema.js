const Joi = require("joi");

const savedplacesSchema = Joi.object({
    user_id: Joi.string().required(),
    place_id: Joi.string().required(),
});

module.exports = savedplacesSchema;