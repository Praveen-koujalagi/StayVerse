const joi = require('joi');

const listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().allow('', null), // Allow empty or null image
        price: joi.number().min(0).required(),
        location: joi.string().required(),
        country: joi.string().required(),
        category: joi.string().valid('apartment', 'house', 'villa', 'cabin', 'hotel', 'resort', 'cottage', 'loft', 'studio', 'penthouse').required()
    })
});

const reviewSchema = joi.object({
    review: joi.object({
        Rating: joi.number().min(1).max(5).required(),
        Comment: joi.string().required()
    })
});

module.exports = {
    listingSchema,
    reviewSchema
};