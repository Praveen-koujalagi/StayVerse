const Listing = require('../models/listing');
const Review = require('../models/review');


module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const review = new Review(req.body.review);
  review.author = req.user._id; // Set the author to the current logged-in user
  review.listing = id; // Associate the review with the listing
  await review.save();
  
  // Add the review to the listing's reviews array
  const listing = await Listing.findById(id);
  listing.reviews.push(review);
  await listing.save();
  req.flash('success', 'Review added successfully!');
  res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  
  // Delete the review (authorization already checked by middleware)
  await Review.findByIdAndDelete(reviewId);
  const listing = await Listing.findById(id);
  listing.reviews.pull(reviewId);
  await listing.save();
  req.flash('success', 'Review deleted successfully!');
  res.redirect(`/listings/${id}`);
}