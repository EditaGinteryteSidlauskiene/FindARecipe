// Creating a model for recipes

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('index').get(function () {
    return this.url.replace('/upload', '/upload/w_200,h_200');
})

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
    image: ImageSchema,
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