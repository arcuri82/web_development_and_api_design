const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

//to enable CORS filters
app.use(cors());

//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

let counter = 0;

const messages = new Map();


app.get('/api/messages', (req, res) => {

    const since = req.query["since"];

    const data = Array.from(messages.values());

    if (since !== undefined && since !== null) {
        res.json(data.filter(m => m.id > since));
    } else {
        res.json(data);
    }
});



app.post('/api/messages', (req, res) => {

    const dto = req.body;

    const id = counter++;

    messages.set(id, {id:id, author: dto.author, text: dto.text});

    res.status(201); //created
    res.send();
});


module.exports = app;