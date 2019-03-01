const express = require('express');
const app = express();
const ews = require('express-ws')(app);
const WebSocket = require('ws');


//still need to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

let counter = 0;

const messages = [];


app.ws('/', function(ws, req) {
    console.log('Established a new WS connection');

    /*
        new connection, send all existing messages.
        Note: this would not handle the case of a client that already
        had the data from previous connection, and started a new one (will get duplicates)
     */
    ws.send(JSON.stringify(messages));

    /*
        Here, we register a callback, which is going to be executed every time a client
        does a send() to the server
     */
    ws.on('message', fromClient => {

        /*
            what we get from client is a string.
            not only we need to parse it into a JSON object, but
            also want to add a unique id to it (which we would need
            if wanted to handle avoiding sending duplicated msgs)
         */

        const dto = JSON.parse(fromClient);
        const id = counter++;
        const msg = {id: id, author: dto.author, text: dto.text};

        //add to our current local store
        messages.push(msg);

        //do a broadcast to all existing clients
        ews.getWss().clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                /*
                    even if a single msg, we will have it in a list of size 1.
                    This does simplify the code on the client, as it does not
                    need to distinguish between the download of all msgs on connection
                    and these following broadcasts, i.e., they ll have the same structure.
                 */
                client.send(JSON.stringify([msg]));
            }
        });
    })
});

module.exports = app;