//This is file consists of routes for recipes

const express = require('express');
const router = express.Router();
const recipes = require('../controllers/recipes');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    //Display the list of all recipes
    .get(catchAsync(recipes.index))
    //Saving created recipe
    .post(isLoggedIn, upload.single('image'), catchAsync(recipes.createRecipe))

//Displaying a form to create a new recipe
router.get('/new', isLoggedIn, recipes.renderNewForm);

router.route('/:id')
    //Show the chosen recipe
    .get(isLoggedIn, catchAsync(recipes.showRecipe))
    //Updating recipe
    .put(isLoggedIn, isAuthor, upload.single('image'), catchAsync(recipes.updateRecipe))
    //Deleting recipe
    .delete(isLoggedIn, isAuthor, catchAsync(recipes.deleteRecipe))

//Edit the recipe
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(recipes.renderEditForm));

//Exporting the router
module.exports = router;
