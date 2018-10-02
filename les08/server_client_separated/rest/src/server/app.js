const express = require('express');
const repository = require("./repository");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

/*
    to enable CORS filters. If we do not enable it, then the JS code
    in bundle.js downloaded from "frontend" server (running on origin localhost:8080)
    would not be allowed to do requests against this REST service.
 */
app.use(cors({
    origin: 'http://localhost:8080'
}));

/*
    Here we define a series of endpoints, where HTTP will be routed to
    different endpoints based on the HTTP verb (eg GET and POST) and the
    path component of the URL, eg, "/books" when the URL is
    "http://localhost:8080/books"
 */

/*
    Return (ie GET) all the books.
    Can filter by publication year using the query parameter "since".
    The books will be returned as a list of JSON objects.
 */
app.get('/books', (req, res) => {

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

/*
    Handle HTTP DELETE request on a book specified by id
 */
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

/*
    Create a new book. The id will be chosen by the server.
    Such method should return the "location" header telling
    where such book can be retrieved (ie its URL)
 */
app.post('/books', (req, res) => {

    const dto = req.body;

    const id = repository.createNewBook(dto.title, dto.author, dto.year);

    res.status(201); //created
    res.header("location", "/books/" + id);
    res.send();
});


/*
    Handle PUT request, which completely replace the resource
    with a new one
 */
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