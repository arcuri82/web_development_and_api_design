const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Home} = require('../../src/client/home');
const {stubFetch, flushPromises} = require('./mytest-utils');


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


test("Test display 1 book", async () => {

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