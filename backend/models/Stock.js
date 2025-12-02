const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  thesis: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  classifications: [{
    type: String
  }]
});

module.exports = mongoose.model('Stock', stockSchema);
