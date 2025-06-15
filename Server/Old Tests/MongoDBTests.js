const express = require('express')
const mongoose = require('mongoose');

const website = express()

mongoose.connect('mongodb://127.0.0.1:27017/recipe-website');

const userSchema = new mongoose.Schema({ username: String, password: String }, { versionKey: false});

const userModel = mongoose.model('users', userSchema);

// Inserting into the website's database

userModel.create({ username: 'Joaquín', password: '789' });
userModel.create({ username: 'Luis Miguel', password: '789' }, { username: 'Juan', password: '789' });

// Searching in the website's database

userModel.findOne({ password: "456" }).then( function (user) {
    console.log(user.toJSON());
});

userModel.find({ password: "456" }).then( function (users) {
    for (let user of users) {
        console.log(user.toJSON());
    }
});

// Deleting from the website's database

userModel.deleteOne({ username: "Joaquín" }).then();
userModel.deleteMany({ password: "789" }).then();

website.listen(3456, () => {
    console.log('The website server is running!');
});
