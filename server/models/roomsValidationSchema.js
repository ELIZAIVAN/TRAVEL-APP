const Joi = require("joi");

const roomsSchema = Joi.object({
    roomtype: Joi.string().required(),
    NumberOfRooms: Joi.number().required(),
    NumberOfGuests: Joi.number().required(),
    details: Joi.string().required(),
    SmokingPreferences: Joi.string().required(),
    PricePerNight: Joi.number().required(),
    location: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    rating: Joi.number().required(),
    TotalReview: Joi.number().required(),
    description: Joi.string().required(),
    facilities: Joi.array().required(),
    hotel_id: Joi.string().required(),
    image: Joi.array().required(),
    

});

module.exports = roomsSchema;