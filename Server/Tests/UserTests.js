async function insertUserTest(userModel) {

    console.log('Inserting User1 into the users database:');

    await userModel.create({ username: 'User1', password: '123' });

}

async function insertUsersTest(userModel) {

    console.log('Inserting User2, User3 and User4 into the users database:');

    await userModel.create({ username: 'User2', password: '456' }, { username: 'User3', password: '456' }, { username: 'User4', password: '456' });

}

async function findUserTest(userModel) {

    console.log('Searching for User1 in the users database:');

    await userModel.findOne({ username: 'User1' }).then( function (user) {
        console.log(user.toJSON());
    });

}

async function findUsersTest(userModel) {

    console.log('Searching for users with password 456 in the users database:');

    await userModel.find({ password: '456' }).then( function (users) {
        for (let user of users) {
            console.log(user.toJSON());
        }
    });

}

async function deleteUserTest(userModel) {

    console.log('Deleting User1 from the users database:');

    await userModel.deleteOne({ username: 'User1' }).then();

}

async function deleteUsersTest(userModel) {

    console.log('Deleting users with password 456 from the users database:');

    await userModel.deleteMany({ password: '456' }).then();

}

async function allUsersTest(userModel) {

    await insertUserTest(userModel);
    await insertUsersTest(userModel);
    await findUserTest(userModel);
    await findUsersTest(userModel);
    await deleteUserTest(userModel);
    await deleteUsersTest(userModel);

}

module.exports = { insertUserTest, insertUsersTest, findUserTest, findUsersTest, deleteUserTest, deleteUsersTest, allUsersTest };
