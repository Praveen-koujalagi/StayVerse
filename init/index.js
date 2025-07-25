const mongoose = require('mongoose');
const initdata = require('./data.js'); 
const Listing = require('../models/listing.js');

const MONGO_URI = 'mongodb://127.0.0.1:27017/stayverse';

// Connect to MongoDB
main()
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error);
  });

async function main() {
  await mongoose.connect(MONGO_URI, {
  });
}

const initDB = async () => {
  try {
    // Clear existing listings
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log('✅ Database initialized with sample data');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initDB();