const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const recipeModel = require('../Models/Recipes');
const recipeRouter = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/recipe-website');

recipeRouter.post('/addrecipe', async (req, res) => {
    // remove "data:image;base64," heading regex
    const base64Regex = /^data:image\/\w+;base64,/;

    const base64Image = req.body.imageBinary.replace(base64Regex, "");
    const binaryImage = Buffer.from(base64Image, 'base64');

    const request = {
        name: req.body.name,
        author: req.body.author,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        tags: { gluten: req.body.tags.gluten, alcoholic: req.body.tags.alcoholic, vegetarian: req.body.tags.vegetarian },
        cuisine: req.body.cuisine,
        cookTime: req.body.cookTime,
        imageBinary: binaryImage,
        comments: req.body.comments
    }

    await recipeModel.create(request).then( function (document) {
        res.send(document._id);
        res.end();
    });

});

recipeRouter.post('/editrecipe', async (req, res) => {

    // remove "data:image;base64," heading regex
    const base64Regex = /^data:image\/\w+;base64,/;

    const base64Image = req.body.imageBinary.replace(base64Regex, "");
    const binaryImage = Buffer.from(base64Image, 'base64');

    const request = {
        $set: {
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            tags: { gluten: req.body.tags.gluten, alcoholic: req.body.tags.alcoholic, vegetarian: req.body.tags.vegetarian },
            cuisine: req.body.cuisine,
            cookTime: req.body.cookTime,
            imageBinary: binaryImage
        }
    }

    // found is handler issue
    console.log(request);

    const documentObjID = new ObjectId(req.body.documentID);

    await recipeModel.updateOne({ _id: documentObjID }, request).then( function (document) {
        res.end();
    });

});

recipeRouter.post('/getrecipes', async (req, res) => {

    await recipeModel.find().then( function (recipes) {

        const modifiedRecipes = recipes.map(recipe => {

            const recipeToObj = recipe.toObject();

            // if has img, convert back
            if (recipeToObj.imageBinary) {
                recipeToObj.imageBinary = `${recipeToObj.imageBinary.toString('base64')}`;
            }
            
            return recipeToObj;
        
        });

        res.send(modifiedRecipes);
        res.end();

    });

});

recipeRouter.post('/removerecipe', async (req, res) => {

    const documentObjID = new ObjectId(req.body.documentID);

    await recipeModel.deleteOne({ _id: documentObjID }).then( function () {
        res.end();
    });

});

module.exports = recipeRouter;
