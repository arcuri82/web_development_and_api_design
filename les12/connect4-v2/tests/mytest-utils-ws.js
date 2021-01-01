// Origin: shared/mytest-utils-ws.js

const WS = require('ws');


/*
    A WebSocket connection can take some time to open (e.g., handshake messages).
    So, here we return a Promise which resolves to a boolean, specifying whether
    the WS was opened within a certain amount of timeoutMs milliseconds
 */
export function checkConnectedWS(ws, timeoutMs){

    /*
        Here we create 2 Promises:
        (1) that resolves to "false" within timeoutMs milliseconds
        (2) that resolves to "true" once the "open" callback is executed on the WS
     */

    let id;

    const timedOut = new Promise(resolve => {
        /*
            if the WS opens within the timeout, then we will need to
            cancel this callback. To do that, we need to know its
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


export class WsStub extends WS{

    constructor(url){
        super(url);

        /*
            The WS library takes "data" as input, whereas WebSocket in
            browser expect an event object with a field called "data".
            That is the reason why we pass it as input with "{data}",
            which is equivalent to "{data: data}"
         */

        this.on('message', data => {
            if(this.onmessage) {
                this.onmessage({data});
            }
        });

        this.on('open', data => {
            if(this.onopen) {
                this.onopen({data});
            }
        });

        this.on('error', data => {
            if(this.onerror) {
                this.onerror({data});
            }
        });

        this.on('close', data => {
            if(this.onclose) {
                this.onclose({data});
            }
        });

        this.close = (code, reason) => {
            this.terminate();
        };

        // this.send() does not need to be changed, as same signature
    }
}


export function overrideWebSocket(){
    global.WebSocket = WsStub;
}
