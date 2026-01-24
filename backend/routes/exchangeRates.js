const express = require('express');
const router = express.Router();
const ExchangeRate = require('../models/ExchangeRate');

// GET all rates
router.get('/', async (req, res) => {
    try {
        const rates = await ExchangeRate.find();
        // Convert array to object { USD: 1.05, ... }
        const ratesObj = {};
        rates.forEach(r => {
            ratesObj[r.currency] = r.rate;
        });
        // Ensure EUR is always 1 if not in db
        if (!ratesObj['EUR']) ratesObj['EUR'] = 1;

        res.json(ratesObj);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST update rates
router.post('/', async (req, res) => {
    const rates = req.body; // Expect { USD: 1.05, JPY: 158 ... }
    try {
        const promises = Object.entries(rates).map(([currency, rate]) => {
            return ExchangeRate.findOneAndUpdate(
                { currency },
                { rate },
                { upsert: true, new: true }
            );
        });
        await Promise.all(promises);
        res.json({ message: 'Rates updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
