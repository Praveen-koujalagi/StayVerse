const mongoose = require('mongoose');
const Listing = require('../models/listing');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/stayverse')
    .then(() => {
        console.log('Connected to MongoDB');
        checkListings();
    })
    .catch(err => {
        console.error('Connection error:', err);
    });

async function checkListings() {
    try {
        // Count total listings
        const totalListings = await Listing.countDocuments();
        console.log(`Total listings in database: ${totalListings}`);
        
        // Count listings without category
        const listingsWithoutCategory = await Listing.countDocuments({ category: { $exists: false } });
        console.log(`Listings without category: ${listingsWithoutCategory}`);
        
        // Count listings with category
        const listingsWithCategory = await Listing.countDocuments({ category: { $exists: true } });
        console.log(`Listings with category: ${listingsWithCategory}`);
        
        // Show a few sample listings
        const sampleListings = await Listing.find().limit(3);
        console.log('\nSample listings:');
        sampleListings.forEach((listing, index) => {
            console.log(`${index + 1}. Title: ${listing.title}, Category: ${listing.category || 'undefined'}`);
        });
        
        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error checking listings:', error);
        mongoose.connection.close();
    }
}
