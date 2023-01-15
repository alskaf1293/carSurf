// Import the functions you need from the SDKs you need

const dotenv = require("dotenv");
dotenv.config();

const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");

const passport = require('passport');
const LocalStategy = require('passport-local');




const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries







// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJ_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSENGER_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const bcrypt = require('bcrypt');

const userDB = db.collection("users");

passport.use(new LocalStategy(function verify(username, password, cb){

    const query = userDB.where("username", "==", username).get()
        .then(user => {
            bcrypt.compare(password, user.data()['password'], (err, match) =>{
                if(err) throw err;
                if(!match){ return cb(null, false, {message: 'Username or Password is incorrect'})}

                else{
                    return cb(null, user);
                }

            });
        });


}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = userDB.doc(id).get()
        .then(user => done(null, user))
        .catch(err => done(err, user));
})


function login(){
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    });
}

module.exports = {login}; 