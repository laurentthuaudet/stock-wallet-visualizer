const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
    currency: {
        type: String,
        required: true,
        unique: true
    },
    rate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);
