const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ticker: {
    type: String,
    uppercase: true
  },
  thesis: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  currency: {
    type: String,
    required: true,
    default: 'EUR',
    enum: ['EUR', 'USD', 'JPY', 'NOK', 'SEK', 'AUD', 'CAD']
  },
  percentage: {
    type: Number,
    default: 0
  },
  averagePrice: {
    type: Number,
    default: 0
  },
  currentPrice: {
    type: Number,
    default: 0
  },
  classifications: {
    type: [String],
    default: []
  },
  strategy: {
    type: String,
    enum: ['etf', 'holding', 'perso', 'cash'],
    default: 'perso'
  }
});

module.exports = mongoose.model('Stock', stockSchema);
