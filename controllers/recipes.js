//This file consists functions for recipes

const Recipe = require('../models/recipe');
const { cloudinary } = require('../cloudinary');

//Variable of recipes categories
const categories = [
    'Appetizer',
    'Salad',
    'Soup',
    'Main dish',
    'Dessert',
    'Drink'];

//Function for a page that consists a list of all recipes
module.exports.index = async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
}

//Function to display a form to create a new recipe
module.exports.renderNewForm = (req, res) => {
    res.render('recipes/new', { categories });
}

//Function to create a new recipe. Taking information that the user typed and save it
module.exports.createRecipe = async (req, res, next) => {
    const newRecipe = new Recipe(req.body.recipe);
    const { path, filename } = req.file;
    newRecipe.image = { url: path, filename: filename };
    newRecipe.author = req.user._id;
    await newRecipe.save();
    req.flash('success', 'Successfully made a new recipe!');
    res.redirect(`/recipes/${newRecipe._id}`);
}

module.exports.showRecipe = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!');
        return res.redirect('/recipes');
    }
    res.render('recipes/show', { recipe });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!');
        return res.redirect('/recipes');
    }
    res.render('recipes/edit', { recipe, categories });
}

module.exports.updateRecipe = async (req, res, next) => {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
    if (req.file) {
        const imageName = updatedRecipe.image.filename;
        await cloudinary.uploader.destroy(imageName);
        const { path, filename } = req.file;
        updatedRecipe.image = { url: path, filename: filename };
    }
    await updatedRecipe.save();
    req.flash('success', 'Successfully updated recipe!');
    res.redirect(`/recipes/${updatedRecipe._id}`);
}

module.exports.deleteRecipe = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
}
