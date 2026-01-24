const express = require('express');
const router = express.Router();
const Option = require('../models/Option');

// GET all options
router.get('/', async (req, res) => {
    try {
        const options = await Option.find();
        res.json(options);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new option
router.post('/', async (req, res) => {
    const option = new Option({
        ticker: req.body.ticker,
        underlying: req.body.underlying,
        direction: req.body.direction,
        side: req.body.side,
        strike: req.body.strike,
        expirationDate: req.body.expirationDate,
        premium: req.body.premium,
        quantity: req.body.quantity,
        currentPrice: req.body.currentPrice
    });

    try {
        const newOption = await option.save();
        res.status(201).json(newOption);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) an option
router.put('/:id', async (req, res) => {
    try {
        const option = await Option.findById(req.params.id);
        if (!option) return res.status(404).json({ message: 'Option not found' });

        option.ticker = req.body.ticker || option.ticker;
        option.underlying = req.body.underlying || option.underlying;
        option.direction = req.body.direction || option.direction;
        option.side = req.body.side || option.side;
        option.strike = req.body.strike || option.strike;
        option.expirationDate = req.body.expirationDate || option.expirationDate;
        option.premium = req.body.premium || option.premium;
        option.quantity = req.body.quantity || option.quantity;
        option.currentPrice = req.body.currentPrice || option.currentPrice;

        const updatedOption = await option.save();
        res.json(updatedOption);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an option
router.delete('/:id', async (req, res) => {
    try {
        await Option.findByIdAndDelete(req.params.id);
        res.json({ message: 'Option deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
