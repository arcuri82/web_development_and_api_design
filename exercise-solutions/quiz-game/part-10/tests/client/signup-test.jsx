const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');


const {SignUp} = require('../../src/client/signup');
const {resetAllUsers, getUser, createUser} = require('../../src/server/db/users');


beforeEach(resetAllUsers);


function fillForm(driver, id, password, confirm){

    const userIdInput = driver.find("#userIdInput").at(0);
    const passwordInput = driver.find("#passwordInput").at(0);
    const confirmInput = driver.find("#confirmInput").at(0);
    const signUpBtn = driver.find("#signUpBtn").at(0);


    userIdInput.simulate('change', {target: {value: id}});
    passwordInput.simulate('change', {target: {value: password}});
    confirmInput.simulate('change', {target: {value: confirm}});

    signUpBtn.simulate('click');
}

test("Test password mismatch", async () => {

    const mismatch = "Not matching";

    overrideFetch(app);

    const driver = mount(
        <MemoryRouter initialEntries={["/signup"]}>
            <SignUp/>
        </MemoryRouter>
    );

    expect(driver.html().includes(mismatch)).toEqual(false);

    fillForm(driver, "foo", "123", "not-matching");

    const error = await asyncCheckCondition(
        () => {driver.update(); return driver.html().includes(mismatch)},
        2000 ,200);

    expect(error).toEqual(true);
});


test("Create user", async () =>{

    const userId = "Foo";
    expect(getUser(userId)).toEqual(undefined);

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
        <MemoryRouter initialEntries={["/signup"]}>
            <SignUp fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} history={history} />
        </MemoryRouter>
    );

    const password = "123";

    fillForm(driver, userId, password, password);


    const redirected = await asyncCheckCondition(
        () => {return page === "/"},
        2000 ,200);

    expect(redirected).toEqual(true);

    expect(getUser(userId).id).toEqual(userId);
});


test("Fail if user already exists", async () =>{

    const userId = "Foo";
    const password = "123";
    createUser(userId, password);

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
        <MemoryRouter initialEntries={["/signup"]}>
            <SignUp fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} history={history} />
        </MemoryRouter>
    );

    fillForm(driver, userId, password, password);

    const failed = await asyncCheckCondition(
        () => {driver.update(); return driver.html().includes('Invalid userId/password')},
        2000 ,200);

    expect(failed).toEqual(true);
});