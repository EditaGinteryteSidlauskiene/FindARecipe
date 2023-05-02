//This file consists functions for reviews

const Recipe = require('../models/recipe');
const Review = require('../models/reviews');

//Function to create a new review. Finding recipe by Id, taking typed text and assigning it to the variable 'review'.
//Setting author of the review, saving both review and recipe.
module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    recipe.reviews.push(review);
    await review.save();
    await recipe.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/recipes/${recipe._id}`);
}

//Function to delete a review. First, deleting reviewId from the recipe object, so it would not reference to not existing review.
//Then, deleting the review.
module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted');
    res.redirect(`/recipes/${id}`);
}
