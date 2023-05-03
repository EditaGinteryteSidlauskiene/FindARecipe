//This file consists functions for users

const User = require('../models/user');

//Calling function to display register form
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

//Calling function to register a new user. First, making user model instance with typed email and username.
//Then calling register function and passing just created user and the password.
//Then the user will be logged in.
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) next(err);
            req.flash('success', 'Welcome to Find A Recipe');
            res.redirect('/recipes');
        });
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

//Calling function to display login form
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

//When the user logs in, they should be redirected to the same page (e.g., new recipe),
//if the user logs in through 'Login' button, they should be redirected to 'Recipes' page
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo;
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

//Calling function to logout the user
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', "Goodbye");
        res.redirect('/recipes');
    });
}
