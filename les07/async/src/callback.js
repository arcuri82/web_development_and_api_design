
/*
    Just execute the callback after short amount of time
 */
const executeCallBack = function(callback){

    setTimeout(callback, 1);
};


const blockingSleep = function (ms) {

    ms += new Date().getTime();

    while (new Date().getTime() < ms){}
};


const example = function(){

    console.log("A");

    executeCallBack(() => {

        console.log("B");

        executeCallBack(() => {
            console.log("C");
        });

        blockingSleep(100);

        console.log("D");
    });

    blockingSleep(100);

    console.log("F");
};


example();

/*
Output:
A
F
B
D
C

Why?
A: first one
F: before any callback can be executed on the event-loop, the current method
   call example() has to be completed.
B: once example() is completed, and only then, the callback can be executed.
   Note that setTimeout(callback, 1) does not guarantee that the callback will
   be executed after exactly 1ms, but just that it will be pushed to the queue
   of the event-loop after 1ms. If the current task is blocking the CPU in a
   infinite loop, then the callback will never be executed.
   In our case, it is blocked for 100ms, and so callback cannot be executed
   exactly after 1ms.
D: same reason as for F
 */