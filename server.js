const express = require('express');
const app = express();

const rootRouter = express.Router();

const port = 5321;

const path = require('path');

let staticPath = path.join(__dirname, 'build');

app.use(express.static(staticPath));

rootRouter.get('/(*)?', (req, res) =>{
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.use(rootRouter);


app.listen(port, ()=>{

    console.log(`Listening on port: ${port}`);

});