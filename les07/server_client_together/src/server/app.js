const express = require('express');
const repository = require("./repository");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

/*
    Return (ie GET) all the books.
    Can filter by publication year using the query parameter "since".
    The books will be returned as a list of JSON objects.
 */
app.get('/api/books', (req, res) => {

    /*
        Read the query parameters, if any, eg:

        http://localhost:8080/books?since=2001
     */
    const since = req.query["since"];

    if (since !== undefined && since !== null) {
        res.json(repository.getAllBooksSince(since));
    } else {
        res.json(repository.getAllBooks());
    }
});

/*
    Note the use of ":" to represent a variable placeholder.
    Here we return a specific book with a specific id, eg
    "http://localhost:8080/books/42"
 */
app.get('/api/books/:id', (req, res) => {

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

/*
    Handle HTTP DELETE request on a book specified by id
 */
app.delete('/api/books/:id', (req, res) => {

    const deleted = repository.deleteBook(req.params.id);
    if (deleted) {
        res.status(204);
    } else {
        //this can happen if book already deleted or does not exist
        res.status(404);
    }
    res.send();
});

/*
    Create a new book. The id will be chosen by the server.
    Such method should return the "location" header telling
    where such book can be retrieved (ie its URL)
 */
app.post('/api/books', (req, res) => {

    const dto = req.body;

    const id = repository.createNewBook(dto.title, dto.author, dto.year);

    res.status(201); //created
    res.header("location", "/api/books/" + id);
    res.send();
});


/*
    Handle PUT request, which completely replace the resource
    with a new one
 */
app.put('/api/books/:id', (req, res) => {

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

/*
    requests for API should return 404 if not previously handled,
    and not index.html
 */
app.all('/api*', (req,res) => {
    res.status(404);
    res.send();
});


app.use(express.static('public'));

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});


module.exports = app;