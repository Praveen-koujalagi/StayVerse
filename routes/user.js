const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance
const User = require('../models/user.js'); // Import the User model
const wrapAsync = require('../utils/wrapAsync.js'); // Import wrapAsync for error handling
const passport = require('passport'); // Import passport for authentication
const userController = require('../controllers/users.js'); // Import user controller

router.route('/signup')
  .get(wrapAsync(userController.renderSignupForm)) // Route to render the signup form
  .post(wrapAsync(userController.signup)); // Route to handle user signup


router.route('/login')
  .get(wrapAsync(userController.renderLoginForm)) // Route to render the login form
  .post(passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), wrapAsync(userController.login)); // Route to handle login with passport authentication

// Logout route
router.post('/logout', userController.logout); // Route to handle user logout

module.exports = router; // Export the router for use in other files