// Creating a model for recipes

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Making Schema
const RecipeSchema = new Schema({
    title: String,
    ingredients: String,
    instructions: String,
    category: {
        type: String,
        enum: [
            'Appetizer',
            'Salad',
            'Soup',
            'Main dish',
            'Dessert',
            'Drink'
        ]
    },
    image: {
        url: String,
        filename: String
    },
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// Export the schema
module.exports = mongoose.model('Recipe', RecipeSchema);