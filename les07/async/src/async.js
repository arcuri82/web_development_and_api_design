/*
    Just execute the callback after short amount of time
 */
const executeCallBack = function(callback){

    setTimeout(callback, 1);
};

function sleep(ms) {

    return new Promise( (resolve, reject) => setTimeout(resolve, ms));
}


const example = async function(){

    console.log("A");

    executeCallBack(async () => {

        console.log("B");

        executeCallBack(() => {
            console.log("C");
        });

        await sleep(100);

        console.log("D");
    });

    await sleep(100);

    console.log("F");
};

example();

/*
A
B
C
F
D

TODO explanation
 */