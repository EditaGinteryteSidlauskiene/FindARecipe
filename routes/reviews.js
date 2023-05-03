//This file consists of routes for reviews

const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');

const catchAsync = require('../utils/catchAsync');

//Save a review
router.post('/', isLoggedIn, catchAsync(reviews.createReview));

//Delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

//Exporting the router
module.exports = router;
