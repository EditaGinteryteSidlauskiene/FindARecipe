const Recipe = require('../models/recipe');
const Review = require('../models/reviews');

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

module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted');
    res.redirect(`/recipes/${id}`);
}