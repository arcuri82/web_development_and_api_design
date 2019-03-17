const request = require('supertest');
const WS = require('ws');

/*
    Here, we stub away the calls to "fetch", as not available in NodeJS (ie, they
    are specific to the browser, like alert()).

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
    Override fetch() to make calls to the backend using SuperTest
 */
function overrideFetch(app){

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
function asyncCheckCondition(predicate, totalTimeMS, intervalMS){

    const start = Date.now();

    return new Promise((resolve) => {
        recursiveTimeoutCheck(predicate, totalTimeMS, intervalMS, start, resolve);
    });
}

function recursiveTimeoutCheck(predicate, totalTimeMS, intervalMS, start, resolve){
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
function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}


/*
    A WebSocket connection can take some time to open (e.g., handshake messages).
    So, here we return a Promise which resolves to a boolean, specifying whether
    the WS was opened within a certain amount of timeoutMs milliseconds
 */
function checkConnectedWS(ws, timeoutMs){

    /*
        Here we create 2 Promises:
        (1) that resolves to "false" within timeoutMs milliseconds
        (2) that resolves to "true" once the "open" callback is executed on the WS
     */

    let id;

    const timedOut = new Promise(resolve => {
        /*
            if the WS opens within the timeout, then we will need to
            cancel this callaback. To do that, we need to know its
            id, and so we store it in a variable.
         */
        id = setTimeout(() => resolve(false), timeoutMs);
    });

    const opened = new Promise(resolve => {
        ws.on('open', () => resolve(true));
    });

    /*
        Here, we return a "race" between the 2 Promises: this is a new Promise
        which resolves to the first of these 2 Promises that is resolved.
        However, after any of these 2 Promises is resolved, we need to clear the
        timeout. This is not strictly necessary (ie not changing semantics, as
        the race is resolved only once), but it is good for debugging and avoiding
        having dangling timeout callbacks on the event-loop.
        Also notice that this "then()" Promise has to return the same result
        resolved in the race (ie, a boolean "x" coming from "resolve(x)").
     */

    return Promise.race([opened, timedOut])
        .then(result => {
            if(result) {
                //if WS was opened, and so result===resolve(true), then clear the timeout
                clearTimeout(id);
            }
            return result;
        });
}


class WsStub extends WS{

    constructor(url){
        super(url);

        this.on('message', data => {
            this.onmessage({data});
        });

        this.on('open', data => {
            this.onopen({data});
        });

        this.close = () => this.terminate();
    }
}


function overrideWebSocket(){
    global.WebSocket = WsStub;
}



module.exports = {stubFetch, flushPromises, overrideFetch, asyncCheckCondition, checkConnectedWS, overrideWebSocket};