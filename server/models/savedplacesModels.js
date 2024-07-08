const { string, required, ref } = require('joi');
const mongoose = require('mongoose');
const user = require('./userModel');

const savedplacesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: user,
  },
  place_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: places,
  }
  
});


module.exports = mongoose.model("savedplaces", savedplacesSchema);