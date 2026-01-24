const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// GET all stocks
router.get('/', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new stock
router.post('/', async (req, res) => {
    const existingStock = await Stock.findOne({ name: req.body.name });
    if (existingStock) {
        return res.status(400).json({ message: 'Une action avec ce nom existe déjà.' });
    }

    const stock = new Stock({
        name: req.body.name,
        ticker: req.body.ticker,
        thesis: req.body.thesis,
        quantity: req.body.quantity,
        currency: req.body.currency,
        classifications: req.body.classifications,
        strategy: req.body.strategy,
        averagePrice: req.body.averagePrice,
        currentPrice: req.body.currentPrice
    });

    try {
        const newStock = await stock.save();
        res.status(201).json(newStock);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) a stock
router.put('/:id', async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        stock.name = req.body.name || stock.name;
        stock.ticker = req.body.ticker || stock.ticker;
        stock.thesis = req.body.thesis || stock.thesis;
        stock.quantity = req.body.quantity !== undefined ? req.body.quantity : stock.quantity;
        stock.currency = req.body.currency || stock.currency;
        stock.classifications = req.body.classifications || stock.classifications;
        stock.strategy = req.body.strategy || stock.strategy;
        stock.averagePrice = req.body.averagePrice || stock.averagePrice;
        stock.currentPrice = req.body.currentPrice || stock.currentPrice;

        const updatedStock = await stock.save();
        res.json(updatedStock);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a stock
router.delete('/:id', async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
        res.json({ message: 'Stock deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
