/*
    This would be the access to a Database (eg, Postgres or MySQL).
    But, here, for simplicity, we do all in memory.
 */

// map from ids to books
const books = new Map();

//used to create unique ids
let counter = 0;

function initWithSomeBooks(){

    books.clear()
    counter = 0;

    createNewBook("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 1979);
    createNewBook("The Lord of the Rings", "J. R. R. Tolkien", 1954);
    createNewBook("The Last Wish", "Andrzej Sapkowski", 1993);
    createNewBook("A Game of Thrones", "George R. R. Martin", 1996);
    createNewBook("The Call of Cthulhu", "H. P. Lovecraft", 1928);
}

function createNewBook(title, author, year){

    const id = "" + counter;
    counter++;

    const book = {
        id: id,
        title: title,
        author: author,
        year: year
    };

    books.set(id, book);

    return id;
}

function deleteBook(id){

    return books.delete(id);
}

function getBook(id){

    return books.get(id);
}

function getAllBooks(){

    return Array.from(books.values());
}

function updateBook(book){

    if(! books.has(book.id)){
        return false;
    }

    books.set(book.id, book);
    return true;
}

function getAllBooksSince(year){

    return books.values().filter(b => b.year >= year);
}

module.exports = {initWithSomeBooks, getAllBooks, getAllBooksSince,
    createNewBook, getBook, updateBook, deleteBook};
