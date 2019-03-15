const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');


const {SignUp} = require('../../src/client/signup');


function fillForm(driver, id, password, confirm){

    const userIdInput = driver.find("#userIdInput").at(0);
    const passwordInput = driver.find("#passwordInput").at(0);
    const confirmInput = driver.find("#confirmInput").at(0);
    const signUpBtn = driver.find("#signUpBtn").at(0);

//     TODO
// .simulate('change', {target: {value: }});
// .simulate('change', {target: {value: }});
// .simulate('change', {target: {value: }});
//     signUpBtn.simulate('submit');
}

test("Test password mismatch", async () => {

    const mismatch = "Passwords do not match";

    overrideFetch(app);

    const driver = mount(
        <MemoryRouter initialEntries={["/signup"]}>
            <SignUp/>
        </MemoryRouter>
    );


    expect(driver.html().includes(mismatch)).toEqual(false);

    fillForm(driver, "foo", "123", "not-matching");

    //TODO
    expect(driver.html().includes(mismatch)).toEqual(true);
});
