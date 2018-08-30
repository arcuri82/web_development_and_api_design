const request = require('supertest');
const app = require('../../src/server/app');
const rep = require('../../src/server/repository');

beforeAll(() => {rep.initWithSomeBooks();});

test("Test get all", async () =>{

    const response = await request(app).get('/books');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(5);
});


test("Test not found book", async () => {

    const response = await request(app).get('/books/-3');
    expect(response.statusCode).toBe(404);
});


test("Test retrieve each single book", async () => {

    const responseAll = await request(app).get('/books');
    expect(responseAll.statusCode).toBe(200);

    const books = responseAll.body;
    expect(books.length).toBe(5);

    for(let i=0; i<books.length; i++){

        const res = await request(app).get('/books/'+books[i].id);
        const book = res.body;

        expect(book.title).toBe(books[i].title)
    }
});