const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        url: String,
        filename: String,
    },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['apartment', 'house', 'villa', 'cabin', 'hotel', 'resort', 'cottage', 'loft', 'studio', 'penthouse'],
        default: 'apartment' // Default category if not specified
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

listingSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
