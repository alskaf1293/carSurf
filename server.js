const express = require('express');
const app = express();



const port = 5321;
const path = require('path');

let staticPath = path.join(__dirname, 'build');

const rootRouter = express.Router();
const login = require('./api/login.js');
const createAccount = require('./api/createAccount.js');

app.use(express.static(staticPath));

rootRouter.get('/(*)?', (req, res) =>{
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.use(rootRouter);

app.post('/api/login', login());

app.post('/api/createAccount', createAccount())

app.listen(port, ()=>{

    console.log(`Listening on port: ${port}`);

});