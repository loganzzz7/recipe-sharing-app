const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt = 13;
const secretKey = 'MySecretKey';

const userModel = require('../Models/Users');

const userRouter = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/recipe-website');

userRouter.post('/login', async (req, res) => {

    await userModel.findOne({ username: req.body.username }).then( async function (user) {

        if (user == null) {
            
            res.send(false);
            res.end();
            
        } else {

            const comparePasswords = await bcrypt.compare(req.body.password, user.password);
            // jwt 1 hr exp time
            const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '1h' });

            // cookie 1 hr exp time
            res.cookie('token', token, { maxAge: 60*60*1000, httpOnly: true });
            
            res.send(comparePasswords);
            res.end();
            
        }

    });

});

userRouter.post('/lookup', async (req, res) => {

    await userModel.findOne({ username: req.body.username }).then( function (user) {
        res.send(user != null);
        res.end();
    });

});

userRouter.post('/signup', async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await userModel.create({ username: req.body.username, password: hashedPassword }).then( function () {
        res.end();
    });
    
});

userRouter.post('/logout', async (req, res) => {

    res.clearCookie('token');
    res.end();

});

module.exports = userRouter;
