const User = require('../models/user.js'); // Import the User model
const wrapAsync = require('../utils/wrapAsync.js'); // Import wrapAsync for error handling
const passport = require('passport'); // Import passport for authentication


module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup.ejs'); // Respond with the signup view
}

module.exports.signup =async (req, res, next) => {
    try {
        let { username, email, password } = req.body.user; // Extract user data from the request body
        const newUser = new User({ username, email, password }); // Create a new User instance
        const registeredUser = await User.register(newUser, password); // Register the user using the User model's register method
        req.login(registeredUser, (err) => { // Log in the user after registration
            if (err) return next(err);
            req.flash('success', 'Welcome to StayVerse!'); // Flash a success message
            res.redirect('/listings'); // Redirect to the listings page after successful registration
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login.ejs');
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back to StayVerse!');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have been logged out successfully!');
        res.redirect('/listings');
    });
}