//This file consists of routes for users

const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

router.route('/register')
    //Displaying register form
    .get(users.renderRegister)
    //Saving a new user
    .post(catchAsync(users.register));

router.route('/login')
    //Displaying a login form
    .get(users.renderLogin)
    //Logging in the user
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login);

//Logging out the user
router.get('/logout', users.logout);

//Exporting the router
module.exports = router;
