const express = require('express');
const app = express();
const session = require('express-session');

const port = 5321;
const path = require('path');

let staticPath = path.join(__dirname, 'build');

const rootRouter = express.Router();

const { initalizeSession } = require('./util/initalizeSession.js');

const passport = require('passport');


const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const firebase = require('firebase-admin');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const googleConfig = require("./carsurf-acf00-firebase-adminsdk-yrxue-a77a9b4c6d");


console.log(googleConfig);


const fbapp = initializeApp({
    credential: firebase.credential.cert(googleConfig)
});

const db = getFirestore(fbapp);

const userDB = db.collection("users");



app.use(express.static(staticPath));

app.use(express.json());

app.use(passport.initialize());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

initalizeSession(userDB);

rootRouter.get('/(*)?', (req, res) =>{
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.use(rootRouter);



app.post('/api/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
}));

app.post('/api/createAccount', (req, res) => {

   console.log(req.body);
    
});

app.listen(port, ()=>{

    console.log(`Listening on port: ${port}`);

});