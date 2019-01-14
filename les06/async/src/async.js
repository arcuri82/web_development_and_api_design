/*
    Just execute the callback after short amount of time
 */
const executeCallBack = function(callback){

    setTimeout(callback, 1);
};


function sleep(ms) {
    /*
        To create a Promise, we need to give it as input a function.
        Such function will take two inputs from the Promise: a function "resolve",
        and a function "reject".
        The Promise is successfully completed when "resolve()" is called.
        On the other hand, it fails when "reject()" is called.
        In this example, it never fails, and we schedule the execution of the function "resolve()"
        after ms milliseconds.
     */
    return new Promise( (resolve, reject) => setTimeout(resolve, ms));
}


const example = async function(){

    console.log("A");

    executeCallBack(async () => {

        console.log("B");

        executeCallBack(() => {
            console.log("C");
        });

        await sleep(50);

        console.log("D");
    });

    await sleep(200);

    console.log("F");
};

example();

/*
Output:
A
B
C
D
F

Why?
A: first one
B: because example() is marked with async, on the event-loop thread it
   will run till the first await. The Promise in that sleep is going
   to be resolved only once a new task is pushed on the queue after at least
   100 ms. Within that time, because the event-loop is free, the callback can
   be executed.
C: as the first callback itself is marked async, the second callback can be
   executed while waiting for it, because the event-loop is free.
D: when C is printed, the setTimeout has been called twice, and will push two
   blocks back on the queue at the given times. The one for 50ms will come
   before the one for 200ms, and so D is printed before F.
 */