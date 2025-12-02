const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Stock = require('./models/Stock');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.get('/api/stocks', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/stocks', async (req, res) => {
    const existingStock = await Stock.findOne({ name: req.body.name });
    if (existingStock) {
        return res.status(400).json({ message: 'Une action avec ce nom existe déjà.' });
    }

    const stock = new Stock({
        name: req.body.name,
        thesis: req.body.thesis,
        percentage: req.body.percentage,
        classifications: req.body.classifications
    });

    try {
        const newStock = await stock.save();
        res.status(201).json(newStock);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/stocks/:id', async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
        res.json({ message: 'Stock deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/stocks/:id', async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        stock.name = req.body.name || stock.name;
        stock.thesis = req.body.thesis || stock.thesis;
        stock.percentage = req.body.percentage || stock.percentage;
        stock.classifications = req.body.classifications || stock.classifications;

        const updatedStock = await stock.save();
        res.json(updatedStock);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
