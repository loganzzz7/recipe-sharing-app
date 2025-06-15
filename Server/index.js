const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const userTests = require('./Tests/UserTests');
// const recipeTests = require('./Tests/RecipeTests');
const userRouter = require('./Routes/UserRoutes');
const recipeRouter = require('./Routes/RecipeRoutes');

const website = express();
website.use(cors({
    // swapped origin from ip to localhost
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}));
website.use(cookieParser());
website.use(express.json());

website.use('/UserRoutes', userRouter);
website.use('/RecipeRoutes', recipeRouter);

// mongoose.connect('mongodb://127.0.0.1:27017/recipe-website');

// const userModel = require('./Models/Users');
// const recipeModel = require('./Models/Recipes');

// userTests.allUsersTest(userModel);
// recipeTests.allRecipesTest(recipeModel);

website.listen(3456, () => {
    console.log('The website server is running!');
});
