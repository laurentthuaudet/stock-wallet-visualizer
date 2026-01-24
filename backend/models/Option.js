const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        uppercase: true
    },
    underlying: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        enum: ['CALL', 'PUT'],
        required: true
    },
    side: {
        type: String, // 'ACHAT' (Long) or 'VENTE' (Short)
        enum: ['ACHAT', 'VENTE'],
        required: true
    },
    strike: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    premium: {
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    currentPrice: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = mongoose.model('Option', optionSchema);
