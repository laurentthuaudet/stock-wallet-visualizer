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
const stockRoutes = require('./routes/stocks');
const optionRoutes = require('./routes/options');
const exchangeRateRoutes = require('./routes/exchangeRates');

app.use('/api/stocks', stockRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/exchange-rates', exchangeRateRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
