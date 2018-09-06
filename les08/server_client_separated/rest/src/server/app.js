const express = require('express');
const repository = require("./repository");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

//to enable CORS filters
app.use(cors({
    origin: 'http://localhost:8080'
}));


app.get('/books', (req, res) => {

    const since = req.query["since"];

    if (since !== undefined && since !== null) {
        res.json(repository.getAllBooksSince(since));
    } else {
        res.json(repository.getAllBooks());
    }
});

/*
    Note the use of ":" to represent a variable placeholder
 */
app.get('/books/:id', (req, res) => {

    const book = repository.getBook(req.params["id"]);

    if (book === undefined || book === null) {
        res.status(404);
        res.send()
    } else {
        res.json(book);
    }
    /*
        Either "send()" or "json()" needs to be called, otherwise the
        call of the API will hang waiting for the HTTP response.
        The "json()" also setups the other needed headers related to the
        body, eg things like content-type and content-length
     */
});


app.delete('/books/:id', (req, res) => {

    const deleted = repository.deleteBook(req.params.id);
    if (deleted) {
        res.status(204);
    } else {
        //this can happen if book already deleted or does not exist
        res.status(404);
    }
    res.send();
});


app.post('/books', (req, res) => {

    const dto = req.body;

    const id = repository.createNewBook(dto.title, dto.author, dto.year);

    res.status(201); //created
    res.header("location", "/books/" + id);
    res.send();
});


app.put('/books/:id', (req, res) => {

    if(req.params.id !== req.body.id){
        res.status(409);
        res.send();
        return;
    }

    const updated = repository.updateBook(req.body);

    if (updated) {
        res.status(204);
    } else {
        //this can happen if entity did not exist
        res.status(404);
    }
    res.send();
});


module.exports = app;