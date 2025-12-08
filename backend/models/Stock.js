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
  averagePrice: {
    type: Number,
    default: 0
  },
  currentPrice: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Stock', stockSchema);
