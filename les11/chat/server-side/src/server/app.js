const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//to handle Form POST
app.use(bodyParser.urlencoded({ extended: true }));


//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));


let counter = 0;

const messages = [];


app.get('/', (req, res) => {

    let msgDiv = "<div>";

    for(let i=0; i<messages.length; i++){
        const m = messages[i];
        //WARNING: this is exploitable by XSS!!!
        msgDiv += "<p>" + m.author + ": " + m.text + "</p>";
    }
    msgDiv += "</div>";

    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="style.css"/>
                <title>Server-Side-Rendering-based Chat</title>
        </head>
        <body>
             <div>
                <h2>Server-Side-Rendering-based Chat</h2>
                <form method="post">
                    <div>
                        <p class="inputName">Your name:</p>
                        <input type="text" class="inputName" name="author"/>
                    </div>
                    <br/>
                    <div>
                        <p>Your message:</p>
                        <textarea  cols="50" rows="5" name="text"></textarea>
                    </div>
                    <br/>
                    <button class="btn">Send</button>
                </form>
                ${msgDiv}
            </div>
        </body>
        </html>
    `;

    res.send(html);
});


app.post('/', (req, res) => {

    const dto = req.body;

    const author = req.body.author;
    const text = req.body.text;

    const id = counter++;

    messages.push({id: id, author: author, text: text});

    /*
        redirect, with change from POST to GET.
        If we don't, then:
        1) would not be able to see the new message we just sent
        2) a reload of the page would trigger a new send
     */
    res.status(302);
    res.location("/");
    res.send();
});


module.exports = app;