const { string, required } = require('joi');
const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
  placename: {
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
  overallrating:{
    type: Number,
    required: true,
    default: 0
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


module.exports = mongoose.model("places", placesSchema);