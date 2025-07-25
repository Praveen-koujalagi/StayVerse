const listings = require('express').Router();
const Listing = require('./models/listing.js'); // Import the Listing model
const Review = require('./models/review.js'); // Import the Review model
const { listingSchema, reviewSchema } = require('./schema.js'); // Import schemas
const ExpressError = require('./utils/ExpressError.js'); // Import ExpressError

module.exports.isLoggedIn = (req, res, next) => {
         if (!req.isAuthenticated()) {
          req.session.redirectUrl = req.originalUrl; // Store the original URL to redirect after login
          req.flash('error', 'You must be logged in to access this page');
          return res.redirect('/login'); // Redirect to login if not authenticated
  }
  next();   // Proceed to the next middleware or route handler
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Store the original URL to redirect after login
  }
  next(); // Proceed to the next middleware or route handler
};

module.exports.isOwner = async (req, res, next) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to edit this listing');
    return res.redirect(`/listings/${id}`);
  }
  next();
};



module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError('Invalid Listing Data', 400);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError('Invalid Review Data', 400);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId, id } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash('error', 'Review not found');
    return res.redirect(`/listings/${id}`);
  }
  if (!review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to delete this review');
    return res.redirect(`/listings/${id}`);
  }
  next();
};