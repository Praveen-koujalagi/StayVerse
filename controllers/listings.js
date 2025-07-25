const Listing = require('../models/listing');


module.exports.index = async (req, res) => {
    const { category, location, priceRange } = req.query;
    let filter = {};
    
    // Category filter
    if (category && category !== 'all') {
        filter.category = category;
    }
    
    // Location filter (search in title, location, and country)
    if (location && location.trim() !== '') {
        filter.$or = [
            { location: { $regex: location.trim(), $options: 'i' } },
            { country: { $regex: location.trim(), $options: 'i' } },
            { title: { $regex: location.trim(), $options: 'i' } }
        ];
    }
    
    // Price range filter
    if (priceRange && priceRange !== '') {
        if (priceRange === '50000+') {
            filter.price = { $gte: 50000 };
        } else {
            const [min, max] = priceRange.split('-').map(Number);
            filter.price = { $gte: min, $lte: max };
        }
    }
    
    let allListings = await Listing.find(filter);
    res.render('listings/index.ejs', { 
        listings: allListings, 
        selectedCategory: category || 'all',
        query: req.query
    });
}


module.exports.renderNewListingForm = (req, res) => {
  res.render('listings/new.ejs');
}

module.exports.showListing = async (req, res) => {
  let listing = await Listing.findById(req.params.id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
        select: 'username'
      }
    })
    .populate('owner', 'username'); // Populate owner field with username
  if (!listing) {
    req.flash('error', 'Listing not found');
    return res.redirect('/listings');
  }
  res.render('listings/show.ejs', { listing: listing });
}

module.exports.createListing = async (req, res) => {
    let url = req.file.path; // Use path for Cloudinary URL
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set the owner to the current logged-in user
    newListing.image = { url, filename };
    await newListing.save();
    req.flash('success', 'Listing created successfully!');
    res.redirect('/listings');
}

module.exports.renderEditForm = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash('error', 'Listing not found');
    return res.redirect('/listings');
  }

  let originalImageurl = listing.image.url; // Store the original image URL
  originalImageurl = originalImageurl.replace(/\/upload\//, '/upload/h_300,w_250/'); // Example transformation to resize the image
  res.render('listings/edit.ejs', { listing, originalImageurl });
}

module.exports.updateListing = async (req, res) => {
  let {id} = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

  if(typeof req.file !== 'undefined') {
  let url = req.file.path; // Use path for Cloudinary URL
  let filename = req.file.filename;
  listing.image = { url, filename }; // Update the image field
  await listing.save();
  }
  req.flash('success', 'Listing updated successfully!');
  res.redirect(`/listings`);
}

module.exports.destroyListing = async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash('success', 'Listing deleted successfully!');
  res.redirect('/listings');
}