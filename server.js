const express = require('express');
const app = express();
const session = require('express-session');

const port = 5321;
const path = require('path');

let staticPath = path.join(__dirname, 'build');

const rootRouter = express.Router();

const { createUser } = require('./api/sign-up');
const { login } = require('./api/login');


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

const accounts = {
    "devantthames@gmail.com": {
        password: "password123"
    },

    "enokethelred@gmail.com": {
        password: "password123"
    }

}
/*
app.post('/api/login', (req, res) =>{ 

    Object.entries(accounts).forEach(([key, value]) =>{
        console.log(req.body.password);
        if(req.body.email == key && req.body.password == value.password){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(500);
        }
    });
*/

app.post('/api/login', (req, res) =>{ 
    login(fbapp, req.body.email, req.body.password);
    res.send(200);
});

app.post('/api/createAccount', (req, res) => {
    createUser(fbapp, req.body.email, req.body.password);
    res.sendStatus(200);
});

app.listen(port, ()=>{

    console.log(`Listening on port: ${port}`);
})