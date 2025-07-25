// Script to fix listings without owners
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const User = require('./models/user');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wanderlust') // Replace with your database URL
  .then(() => {
    console.log('Connected to MongoDB');
    fixListings();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

async function fixListings() {
  try {
    // Find listings without owners
    const listingsWithoutOwners = await Listing.find({ owner: { $exists: false } });
    console.log(`Found ${listingsWithoutOwners.length} listings without owners`);

    // Get the first user from the database (or create a default user)
    let defaultUser = await User.findOne();
    
    if (!defaultUser) {
      console.log('No users found. Creating a default user...');
      // You might want to create a default user here
      console.log('Please create a user first through your application');
      return;
    }

    // Update listings without owners
    if (listingsWithoutOwners.length > 0) {
      const result = await Listing.updateMany(
        { owner: { $exists: false } },
        { $set: { owner: defaultUser._id } }
      );
      console.log(`Updated ${result.modifiedCount} listings with default owner`);
    }

    // Also fix listings with null owners
    const listingsWithNullOwners = await Listing.find({ owner: null });
    console.log(`Found ${listingsWithNullOwners.length} listings with null owners`);

    if (listingsWithNullOwners.length > 0) {
      const result2 = await Listing.updateMany(
        { owner: null },
        { $set: { owner: defaultUser._id } }
      );
      console.log(`Updated ${result2.modifiedCount} listings with null owners`);
    }

    console.log('Cleanup completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
}
