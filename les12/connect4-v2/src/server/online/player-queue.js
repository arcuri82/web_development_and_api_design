/*
    When a user wants to play, it needs an opponent.
    So, we need at least 2 players.
    A user has to wait until an opponent is available.

    If we always match a user against the first available opponent, then
    we would not need a queue, as such queue will at most contain a single user
    at any point in time.

    We could be more sophisticated. For example, we could try to match players
    with same skills (computed based on number of past victories).
    And, so, let some users wait on the queue for some seconds until a better opponent appears,
    even if the queue is not empty.
    However, to keep it simple, here we match against the first available opponent.
 */

const queue = [];


function addUser(id){

    if(queue.includes(id)){
        return false;
    }

    queue.push(id);
    return true;
}


function size(){
    return queue.length;
}

function hasUser(id){
    return queue.includes(id);
}

function takeUser(){

    if(queue.length === 0){
        return null;
    }

    return queue.shift();
}


module.exports = {addUser, size, takeUser, hasUser};

