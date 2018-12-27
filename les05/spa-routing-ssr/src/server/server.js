const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const Renderer = require('./renderer');


app.get("/", (req, res) => {
    res.send(Renderer.serverSideRender(req.url));
});

app.use(express.static('public'));


app.use((req, res) => {
    res.send(Renderer.serverSideRender(req.url));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Started server on port ' + port);
});

