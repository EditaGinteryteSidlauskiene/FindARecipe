//This file will be run when changes on the model or data will be made

const mongoose = require('mongoose');
const recipe = require('../models/recipe');
// Require the model
const Recipe = require('../models/recipe');
const recipes = require('./recipes');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://editaginteryte:lOuijT0WKVsm4LgJ@cluster0.1q5stcr.mongodb.net/test');
    // Making sure that the database is connected
    console.log('Database connected');
}



//Deleting all data and saving new recipes to the database
const seedDB = async () => {
    await Recipe.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const recipe = new Recipe(recipes[i]);
        if (!recipe.title) {
            break;
        }
        recipe.image = {
            url: 'https://res.cloudinary.com/dlm9q9wtg/image/upload/v1681221899/Find%20a%20recipe/uxywpxmtczhfkv8xglil.jpg',
            filename: 'Find a recipe/psnvspfs8l3om0vomgrj'
        };
        recipe.description = "Lorem AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        recipe.author = '642c21df20ecdb26cf02a5d1';
        await recipe.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})