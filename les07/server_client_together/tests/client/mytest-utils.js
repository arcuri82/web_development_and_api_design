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
    // a function that checks if the inputs in "fetch(url, init)" are valid
    predicate) {

    //define fetch method at global level, as it is not available on NodeJS
    global.fetch = (url, init) => {

        //crash if the predicate is not satisfied
        if(predicate !== null) {
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

export function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}
