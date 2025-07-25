const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :id from parent route
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../Middleware.js'); // Import all needed middleware
const reviewsController = require('../controllers/reviews.js');

//  post Reviews routes
router.post('/', isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));

// Delete review route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.destroyReview));

module.exports = router;