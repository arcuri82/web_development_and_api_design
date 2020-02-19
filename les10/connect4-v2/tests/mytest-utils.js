// Origin: shared/mytest-utils.js

const request = require('supertest');


/*
    Here, we stub away the calls to "fetch", as not available in NodeJS (ie, they
    are specific to the browser, like alert()).

    A complication here is that fetch() returns a Promise. Once such Promise is resolved,
    accessing response.json() is itself a function returning another Promise.
    Here, we resolve these Promises immediately.
 */
export function stubFetch(
    // http status to return, eg 200
    status,
    //the json payload
    payload,
    // an optional function that checks if the inputs in "fetch(url, init)" are valid
    predicate) {

    //define fetch method at global level, as it is not available on NodeJS
    global.fetch = (url, init) => {

        //if defined, crash if the predicate is not satisfied
        if(predicate) {
            predicate(url, init);
        }

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
    Override fetch() to make calls to the backend using SuperTest
 */
export function overrideFetch(app){

    const agent = request.agent(app);

    global.fetch = async (url, init) => {

        let response;

        if(!init || !init.method || init.method.toUpperCase() === "GET"){
            response = await agent.get(url);
        } else if(init.method.toUpperCase() === "POST"){
            response = await agent.post(url)
                .send(init.body)
                .set('Content-Type', init.headers ? init.headers['Content-Type'] : "application/json");
        } else if(init.method.toUpperCase() === "PUT"){
            response = await agent.put(url)
                .send(init.body)
                .set('Content-Type', init.headers ? init.headers['Content-Type'] : "application/json");
        } else if(init.method.toUpperCase() === "DELETE"){
            response = await agent.delete(url);
        } else {
            throw "Unhandled HTTP method: " + init.method;
        }

        const payload = response.body;

        return new Promise( (resolve, reject) => {

            const httpResponse = {
                status: response.statusCode,
                json: () => {return new Promise(
                    (res, rej) => {res(payload);}
                )}
            };

            resolve(httpResponse);
        });
    };
}

/*
    Return a Promise on the boolean result of the given predicate.
    We wait up to totalTimeMs for the predicate to evaluate to true.
    We check the predicate every intervalMS.
    If timeout elapses, then the Promise resolves to false.
 */
export function asyncCheckCondition(predicate, totalTimeMS, intervalMS){

    const start = Date.now();

    return new Promise((resolve) => {
        recursiveTimeoutCheck(predicate, totalTimeMS, intervalMS, start, resolve);
    });
}

export function recursiveTimeoutCheck(predicate, totalTimeMS, intervalMS, start, resolve){
    const elapsed = Date.now() - start;
    if(elapsed > totalTimeMS){
        resolve(false);
    } else if(predicate()){
        resolve(true);
    } else {
        setTimeout(() => {
            recursiveTimeoutCheck(predicate, totalTimeMS, intervalMS, start, resolve);
        }, intervalMS);
    }
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
    with setTimeout(), or when there are chains of Promises revolved after different
    ticks of the main event-loop.
 */
export function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}





