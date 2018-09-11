const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

//to handle Form POST
app.use(bodyParser.urlencoded({ extended: true }));


//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));



module.exports = app;