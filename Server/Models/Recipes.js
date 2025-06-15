const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: String,
    text: String
}, { versionKey: false});

const recipeSchema = new mongoose.Schema({
    name: String,
    author: String,
    ingredients: String,
    instructions: String,
    tags: { gluten: Boolean, alcoholic: Boolean, vegetarian: Boolean },
    cuisine: String,
    cookTime: String,
    imageBinary: Buffer,
    comments: [ commentSchema ]
}, { versionKey: false});

const recipeModel = mongoose.model('recipes', recipeSchema);

module.exports = recipeModel;
