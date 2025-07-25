const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js'); 
const wrapAsync = require('../utils/wrapAsync.js'); 
const ExpressError = require('../utils/ExpressError.js'); 
const { listingSchema } = require('../schema.js'); 
const isLoggedIn = require('../Middleware.js').isLoggedIn; // Import the isLoggedIn middleware
const listingController = require('../controllers/listings.js');
const multer = require('multer');
const { cloudinary, storage } = require('../cloudConfig.js'); // Import cloudinary and storage configuration
const upload = multer({ storage }); // Configure multer to use Cloudinary storage


// Validation middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError('Invalid Listing Data', 400);
  }
  next();
};

router.route('/')
  .get(wrapAsync(listingController.index)) // index route
  // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing)); // create route
  .post(isLoggedIn, upload.single('listing[imageUpload]'), validateListing, wrapAsync(listingController.createListing)); // create route with image upload

// new route
router.get('/new', isLoggedIn, listingController.renderNewListingForm);

router.route('/:id')
  .get(wrapAsync(listingController.showListing)) // show route
  .put(isLoggedIn, upload.single('listing[imageUpload]'), validateListing, wrapAsync(listingController.updateListing)) // update route
  .delete(isLoggedIn, wrapAsync(listingController.destroyListing)); // delete route

// edit route
router.get('/:id/edit', isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;