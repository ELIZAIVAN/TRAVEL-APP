const { string, required } = require('joi');
const mongoose = require('mongoose');
const { description } = require('./userValidationSchema');

const placesSchema = new mongoose.Schema({
  RoomType: {
    type: String,
    required: true
  },
  NumberOfRooms:{
    type: Number,
    required: true
  },
  NumberOfGuests: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  SmokingPreference:{
    type: String,
    required: true,
  },
  PricePerNight: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  TotalReview: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: rooms
  },
  facilities: {
    type: [String],
    required: true
  },
  image: {
    type: [String],
    required: true
  }
  
});


module.exports = mongoose.model("places", placesSchema);