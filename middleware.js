//This file consists of middlewares

const { campgroundSchema } = require('./schemas.js');
const Recipe = require('./models/recipe');
const Review = require('./models/reviews');

//A middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
}

//A middleware to check if the user is the auhtor of the recipe
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/recipes/${id}`);
    }
    next();
}

//A middleware to check if the user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/recipes/${id}`);
    }
    next();
}
