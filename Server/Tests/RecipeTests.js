async function insertRecipeTests(recipeModel) {

    console.log('Inserting Recipe1 into the recipes database:');

    await recipeModel.create(
        { name: 'Recipe1', description: 'My first recipe.', tags: { vegetarian: true, vegan: true }, image: 101010, comments: [
            { username: 'User1', text: 'My first comment.' },
            { username: 'User2', text: 'My second comment.' },
            { username: 'User3', text: 'My third comment.' }]
        }
    );

}

async function insertRecipesTests(recipeModel) {

    console.log('Inserting Recipe2, Recipe3 and Recipe4 into the recipes database:');

    await recipeModel.create(
        { name: 'Recipe2', description: 'My second recipe.', tags: { vegetarian: false, vegan: false }, image: 101010, comments: [
            { username: 'User1', text: 'My first comment.' },
            { username: 'User2', text: 'My second comment.' },
            { username: 'User3', text: 'My third comment.' }]
        },
        { name: 'Recipe3', description: 'My third recipe.', tags: { vegetarian: false, vegan: false }, image: 101010, comments: [
            { username: 'User1', text: 'My first comment.' },
            { username: 'User2', text: 'My second comment.' },
            { username: 'User3', test: 'My third comment.' }]
        },
        { name: 'Recipe4', description: 'My fourth recipe.', tags: { vegetarian: false, vegan: false }, image: 101010, comments: [
            { username: 'User1', text: 'My first comment.' },
            { username: 'User2', text: 'My second comment.' },
            { username: 'User3', text: 'My third comment.' }]
        }
    );

}

async function findRecipeTest(recipeModel) {

    console.log('Searching for Recipe1 in the recipes database:');

    await recipeModel.findOne({ name: 'Recipe1', tags: { vegetarian: true, vegan: true } }).then( function (recipe) {
        console.log(recipe.toJSON());
    });

}

async function findRecipesTest(recipeModel) {

    console.log('Searching for recipes with at least one comment in the recipes database:');

    await recipeModel.find({ tags: { vegetarian: false, vegan: false }, comments: { $ne: [] } }).then( function (recipes) {
        for (let recipe of recipes) {
            console.log(recipe.toJSON());
        }
    });

}

async function deleteRecipeTest(recipeModel) {

    console.log('Deleting Recipe1 from the recipes database:');

    await recipeModel.deleteOne({ name: 'Recipe1', tags: { vegetarian: true, vegan: true } }).then();

}

async function deleteRecipesTest(recipeModel) {

    console.log('Deleting recipes with at least one comment from the recipes database:');

    await recipeModel.deleteMany({ tags: { vegetarian: false, vegan: false }, comments: { $ne: [] } }).then();

}

async function allRecipesTest(recipeModel) {

    await insertRecipeTests(recipeModel);
    await insertRecipesTests(recipeModel);
    await findRecipeTest(recipeModel);
    await findRecipesTest(recipeModel);
    await deleteRecipeTest(recipeModel);
    await deleteRecipesTest(recipeModel);

}

module.exports = { insertRecipeTests, insertRecipesTests, findRecipeTest, findRecipesTest, deleteRecipeTest, deleteRecipesTest, allRecipesTest };
