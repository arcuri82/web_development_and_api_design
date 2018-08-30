const express = require('express');
const repository = require("./repository");

const app = express();


app.get('/books', (req, res) => {
    res.json(repository.getAllBooks())
});

/*
    Note the use of ":" to represent a variable placeholder
 */
app.get('/books/:id', (req, res) => {

    const book = repository.getBook(req.params["id"]);

    if(book === undefined || book === null){
        res.status(404);
        res.send("404: Not found")
    } else {
        res.json(book);
    }
});


module.exports = app;