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
        // Mapping old categories to new ones
        const categoryMapping = {
            'trending': 'apartment',
            'iconic-cities': 'loft',
            'mountains': 'cabin',
            'beachfront': 'villa',
            'countryside': 'cottage',
            'luxury': 'penthouse',
            'budget': 'studio',
            'family': 'house',
            'romantic': 'villa',
            'adventure': 'cabin'
        };

        let totalUpdated = 0;

        // Update each old category to new category
        for (const [oldCategory, newCategory] of Object.entries(categoryMapping)) {
            const result = await Listing.updateMany(
                { category: oldCategory },
                { $set: { category: newCategory } }
            );
            console.log(`Updated ${result.modifiedCount} listings from '${oldCategory}' to '${newCategory}'`);
            totalUpdated += result.modifiedCount;
        }

        // Update any remaining listings that don't match our new categories
        const validCategories = ['apartment', 'house', 'villa', 'cabin', 'hotel', 'resort', 'cottage', 'loft', 'studio', 'penthouse'];
        const remainingResult = await Listing.updateMany(
            { category: { $nin: validCategories } },
            { $set: { category: 'apartment' } }
        );
        
        console.log(`Updated ${remainingResult.modifiedCount} remaining listings to 'apartment'`);
        totalUpdated += remainingResult.modifiedCount;

        console.log(`\nTotal listings updated: ${totalUpdated}`);
        
        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error updating listings:', error);
        mongoose.connection.close();
    }
}