const { string, required } = require('joi');
const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  entity: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
  
});


module.exports = mongoose.model("Services", servicesSchema);