const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');


const {Home} = require('../../src/client/home');


const needToLogInMsg = "You need to log-in to start playing!";

test("Test not logged in", async () => {

    const driver = mount(<Home/>);

    const html = driver.html();
    expect(html.includes(needToLogInMsg)).toEqual(true);
});


test("Test logged in", async () => {

    const victories = 42;
    const defeats = 77;

    const user = {id: "Foo", victories, defeats};
    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} user={user}/>
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(needToLogInMsg)).toEqual(false);
    expect(html.includes(victories)).toEqual(true);
    expect(html.includes(defeats)).toEqual(true);
});