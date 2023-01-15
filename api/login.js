// Import the functions you need from the SDKs you need

const dotenv = require("dotenv");
dotenv.config();

const passport = require('passport');
const LocalStategy = require('passport-local');




function login(){
    console.log("BETTTT");
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    });
}

module.exports = {login}; 