const Joi = require("joi");

const savedplacesSchema = Joi.object({

    user_id: Joi.string().optional(),
    place_id: Joi.string().optional(),
});

module.exports = savedplacesSchema;