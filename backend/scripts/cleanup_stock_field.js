const mongoose = require('mongoose');
const Stock = require('../models/Stock');

// Load environment variables if not running through docker-compose
if (!process.env.MONGODB_URI) {
    console.log('No MONGODB_URI found, using default localhost');
}

const FIELD_TO_REMOVE = 'quantity'; // Change this to the field you want to remove

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('Connected to MongoDB via script');
        try {
            // Use the native collection driver to unset the field, bypassing schema definition
            const result = await Stock.collection.updateMany({}, { $unset: { [FIELD_TO_REMOVE]: "" } });
            console.log(`Cleaned up '${FIELD_TO_REMOVE}' field from all documents.`);
            console.log(`Matched Count: ${result.matchedCount || 'N/A'}`);
            console.log(`Modified Count: ${result.modifiedCount}`);
        } catch (error) {
            console.error('Error during cleanup:', error);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => {
        console.error('Connection error:', err);
        process.exit(1);
    });
