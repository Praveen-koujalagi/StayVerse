const mongoose = require('mongoose');
const Listing = require('../models/listing');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/stayverse')
    .then(() => {
        console.log('Connected to MongoDB');
        updateListings();
    })
    .catch(err => {
        console.error('Connection error:', err);
    });

async function updateListings() {
    try {
        // Update all listings that don't have a category with a default value
        const result = await Listing.updateMany(
            { category: { $exists: false } },
            { $set: { category: 'apartment' } }
        );
        
        console.log(`Updated ${result.modifiedCount} listings with default category`);
        
        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error updating listings:', error);
        mongoose.connection.close();
    }
}
