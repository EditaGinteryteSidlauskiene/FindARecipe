const Joi = require('joi');

module.exports.recipeSchem = Joi.object({
    recipe: Joi.object({
        title: Joi.string().required(),
        ingredient: Joi.string().required(),
        instructions: Joi.string().required(),
        // image: Joi.string(),
        description: Joi.string()
    }).required()
});