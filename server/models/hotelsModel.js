const { string, required } = require('joi');
const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
  hotelname: {
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  overallrating:{
    type: Number,
    required: true
  },
  about: {
    type: String,
    required: true
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


module.exports = mongoose.model("hotels", hotelsSchema);