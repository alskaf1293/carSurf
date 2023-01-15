const express = require('express');
const app = express();

const port = 5321;
const path = require('path');

let staticPath = path.join(__dirname, 'build');

const rootRouter = express.Router();

const { login } = require('./api/login.js');
const { createAccount } = require('./api/createAccount.js');
const { initalizeSession } = require('./util/initalizeSession.js');

const passport = require('passport');


const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_PRIVATE_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJ_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSENGER_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const fbapp = initializeApp(firebaseConfig);
const db = getFirestore(fbapp);

const userDB = db.collection("users");



app.use(express.static(staticPath));

initalizeSession(userDB);

rootRouter.get('/(*)?', (req, res) =>{
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.use(rootRouter);

app.post('/api/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

app.post('/api/createAccount', passport.authenticate('local', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
}));

app.listen(port, ()=>{

    console.log(`Listening on port: ${port}`);

});