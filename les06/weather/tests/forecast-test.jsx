const React = require('react');
const {mount} = require('enzyme');

const {Forecast} = require('../src/forecast');


test("Test can render form", () => {

    const driver = mount(<Forecast/>);

    const forms = driver.find('#formInputId');
    expect(forms.length).toEqual(1);

    const btns = driver.find('#submitBtnId');
    expect(btns.length).toEqual(1);
});


/*
    Here, we stub away the calls to "fetch", as not available in NodeJS (ie, they
    are specific to the browser, like alert()).
    And anyway, we cannot rely on availability of external server for our unit tests.

    A complication here is that fetch() returns a Promise. Once such Promise is resolved,
    accessing response.json() is itself a function returning another Promise.
    Here, we resolve these Promises immediately.
 */
function stubFetch(
    // http status to return, eg 200
    status,
    //the json payload
    payload,
    // a function that checks if the inputs in "fetch(url, init)" are valid
    predicate) {

    //define fetch method at global level, as it is not available on NodeJS
    global.fetch = (url, init) => {

        //crash if the predicate is not satisfied
        predicate(url, init);

        return new Promise((resolve, reject) => {

            const httpResponse = {
                status: status,
                json: () => {return new Promise(
                    (res, rej) => {res(payload);}
                )}
            };

            resolve(httpResponse);
        });
    };
}

/*
    Tricky: even when simulating a click, we are still on a single thread.
    So, not all Promises in the component might have been resolved.
    Without getting a reference to such Promises, we cannot "await" for them
    directly.
    So, we create a new Promise which is going to be executed and resolved in
    the next step of the event-loop. Waiting for it will imply that all currently
    registered Promises are resolved.
    However, such an approach does NOT work when you can have tasks scheduled
    with setTimeout()
 */

function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

test("Test fetch and render weather", async () => {

    const driver = mount(<Forecast/>);

    const formInput = driver.find('#formInputId').at(0);
    const btn = driver.find('#submitBtnId').at(0);

    const city = 'oslo';
    const temp = '25';
    const time = "2019-01-01 12:00:00";
    const weather = 'Snow';

    /*
        Here: we stub away a successful 200 response, with the given JSON payload.
        We also check with a predicate if the component is using fetch() with the
        right query parameter
     */

    stubFetch(
        200,
        {
            list: [
                {
                    main: {temp: temp},
                    dt_txt: time,
                    weather: [{main:weather}]
                }
            ]
        },
        (url, init) => {
            if (!url.includes("q=" + city + ",no")) {
                throw 'Fetch with wrong URL: ' + url;
            }
        }
    );

    //fill city name, and then submit
    formInput.simulate('change', {target: {value: city}});
    //Note: due to Enzyme limitations, simulating "click" will not
    //work here, and we rather need to simulate a 'submit'
    btn.simulate('submit');

    //make sure all other currently scheduled Promises are completed
    await flushPromises();

    const html = driver.html();
    console.log(html);

    //here we just check those values do appear somewhere in the updated HTML
    expect(html.includes(city)).toBe(true);
    expect(html.includes(temp)).toBe(true);
    expect(html.includes(weather)).toBe(true);
    expect(html.includes(time)).toBe(true);
});