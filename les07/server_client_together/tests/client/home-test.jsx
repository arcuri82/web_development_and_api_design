const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Home} = require('../../src/client/home');
const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('./mytest-utils');
const rep = require('../../src/server/repository');
const app = require('../../src/server/app');


test("Test failed fetch", async () => {

    stubFetch(500, {}, null);

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home/>
        </MemoryRouter>
        );

    await flushPromises();

    const html = driver.html();

    //here we just check it appears somewhere in the updated HTML
    expect(html).toMatch("Issue");
});


test("Test display 1 book using stub", async () => {

    const title = "The Hitchhiker's Guide to the Galaxy";

    stubFetch(
        200,
        [{id:0, title: title, year: 1979, author: "Douglas Adams"}],
        (url) => url.endsWith("/api/books")
    );


    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home/>
        </MemoryRouter>
    );

    await flushPromises();

    const html = driver.html();

    //here we just check it appears somewhere in the updated HTML
    expect(html).toMatch(title);
});


test("Test display books using SuperTest", async () => {

    rep.initWithSomeBooks();
    overrideFetch(app);

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home/>
        </MemoryRouter>
    );

    // unfortunately, this does not work here
    //await flushPromises();

    //let's check if table is displayed within a certain amount of time
    const predicate = () => {
        //needed if changed HTML since component was mounted
        driver.update();
        const tableSearch = driver.find('.allBooks');
        const tableIsDisplayed =  (tableSearch.length >= 1);
        return tableIsDisplayed;
    };

    const displayedTable = await asyncCheckCondition(predicate, 3000, 200);
    expect(displayedTable).toBe(true);

    const books = rep.getAllBooks();
    const html = driver.html();

    for(let i=0; i<books.length; i++){
        expect(html).toMatch(books[i].title);
    }
});