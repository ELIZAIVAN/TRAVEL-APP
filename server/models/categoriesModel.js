const { string, required } = require('joi');
const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  entity: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  }
  
});


module.exports = mongoose.model("Categories", categoriesSchema);