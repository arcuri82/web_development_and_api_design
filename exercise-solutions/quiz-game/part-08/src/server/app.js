const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const matchApi = require('./routes/match-api');

const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

//--- Routes -----------
app.use('/api', matchApi);

app.use(express.static('public'));

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});


module.exports = app;