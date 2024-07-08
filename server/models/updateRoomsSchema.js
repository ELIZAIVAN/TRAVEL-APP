const Joi = require("joi");

const roomsSchema = Joi.object({

    roomtype: Joi.string().optional(),
    NumberOfRooms: Joi.number().optional(),
    NumberOfGuests: Joi.number().optional(),
    details: Joi.string().optional(),
    SmokingPreferences: Joi.string().optional(),
    PricePerNight: Joi.number().optional(),
    location: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    rating: Joi.number().optional(),
    TotalReview: Joi.number().optional(),
    description: Joi.string().optional(),
    facilities: Joi.array().optional(),
    hotel_id: Joi.string().optional(),
    image: Joi.array().optional(),
    
});

module.exports = roomsSchema;
