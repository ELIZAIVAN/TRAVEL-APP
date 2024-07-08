const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const userValidationSchema = Joi.object({
    phonenumber: Joi.string().min(10).required(),
    password: Joi.string().min(6).required(),
    


});

const updateValidationSchema = Joi.object({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    phonenumber: Joi.string().min(10).optional(),
    password: Joi.string().min(6).optional(),
    image: Joi.string().optional(),
    
});    



module.exports = userValidationSchema;


