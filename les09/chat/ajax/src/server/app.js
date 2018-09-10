const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

let counter = 0;

const messages = [];


app.get('/api/messages', (req, res) => {

    const since = req.query["since"];

    const data = messages;

    if (since !== undefined && since !== null) {
        res.json(data.filter(m => m.id > since));
    } else {
        res.json(data);
    }
});



app.post('/api/messages', (req, res) => {

    const dto = req.body;

    const id = counter++;

    messages.push({id:id, author: dto.author, text: dto.text});

    res.status(201); //created
    res.send();
});


module.exports = app;