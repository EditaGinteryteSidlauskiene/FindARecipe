// Creating a model for recipes

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const ImageSchema = new Schema({
//     url: String,
//     filename: String
// })

// ImageSchema.virtual('index').get(function () {
//     return this.url.replace('/upload', '/upload/w_auto,h_200,f_auto,q_auto');
// })

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