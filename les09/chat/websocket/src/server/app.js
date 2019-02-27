const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const ews = require('express-ws')(app);
const WebSocket = require('ws');


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

    const msg = {id: id, author: dto.author, text: dto.text};

    messages.push(msg);

    res.status(201); //created
    res.send();

    const nclients = ews.getWss().clients.size;
    console.log("Going to broadcast message to " + nclients +" clients");

    ews.getWss().clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const json = JSON.stringify(msg);
            console.log("Broadcasting to client: " + JSON.stringify(msg));
            client.send(json);
        } else {
            console.log("Client not ready");
        }
    });
});


app.ws('/', function(ws, req) {
    console.log('Established a new WS connection');
});

module.exports = app;