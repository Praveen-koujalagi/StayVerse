if(process.env.NODE_ENV !== 'production') {
require('dotenv').config(); // Load environment variables from .env file
}

const express = require('express'); 
const app = express();
const mongoose = require('mongoose'); 
const Listing = require('./models/listing.js'); 
const path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method')); // For PUT and DELETE requests
const ejsmate = require('ejs-mate'); // For using EJS as the template engine
const wrapAsync = require('./utils/wrapAsync.js'); // Custom async error handler
const ExpressError = require('./utils/ExpressError.js'); // Custom error class for Express
const { listingSchema ,reviewSchema} = require('./schema.js'); // Import the Joi schema for validation
const Review = require('./models/review.js'); // Import the Review model
const session = require('express-session'); // For session management
const flash = require('connect-flash'); // For flash messages
const passport = require('passport'); // For authentication
const LocalStrategy = require('passport-local'); // For local authentication strategy
const User = require('./models/user.js'); // Import the User model

const listingRoutes = require('./routes/listings.js'); // Import the listings routes
const reviewRoutes = require('./routes/review.js'); // Import the reviews routes
const userRoutes = require('./routes/user.js'); // Import the user routes


const MONGO_URI = 'mongodb://127.0.0.1:27017/stayverse';

// Connect to MongoDB
main()
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsmate); // Use ejsmate for EJS rendering
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Cookie expires in 1 day
    maxAge: 1000 * 60 * 60 * 24, // Cookie max age in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
  }
};

app.use(session(sessionOptions)); // Use session middleware
app.use(flash()); // Use flash middleware for flash messages

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use passport session
passport.use(new LocalStrategy(User.authenticate())); // Use local strategy for authentication

passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

app.use((req, res, next) => {
  res.locals.success = req.flash('success'); // Make flash messages available in templates
  res.locals.error = req.flash('error'); // Make error messages available in templates
  res.locals.currentUser = req.user; // Make current user available in templates
  console.log('Session User:', req.user); // Debug log for user session
  next();
});

async function main() {
  await mongoose.connect(MONGO_URI);
}

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError('Invalid Listing Data', 400);
  }
  next();
};


app.use('/listings', listingRoutes); // Use the listings routes 
app.use('/listings/:id/reviews', reviewRoutes); // Use the reviews routes
app.use('/', userRoutes); // Use the user routes

app.get('/', (req, res) => {
  res.redirect('/listings');
});

// Debug route to check session
app.get('/debug', (req, res) => {
  res.json({
    user: req.user,
    session: req.session,
    isAuthenticated: req.isAuthenticated()
  });
});

app.all('*', (req, res,next) => {
  next(new ExpressError(' Page Not Found', 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
  let {statusCode = 500, message = 'Internal Server Error'} = err;
  res.render('error.ejs', { statusCode, message });
  // res.status(statusCode).send(message);
});

// Start server
app.listen(8080, () => {
  console.log('🚀 Server is running on http://localhost:8080');
});
