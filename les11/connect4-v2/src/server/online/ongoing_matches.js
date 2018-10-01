const Match = require('../game/match');


/*
    Map from user id to ongoing match
 */
const matches = new Map();



function startMatch(firstId, secondId){

    forfeit(firstId);
    forfeit(secondId);

    const match = new Match(firstId, secondId);

    matches.set(firstId, match);
    matches.set(secondId, match);

    match.start();
}

function forfeit(userId){

    const match = matches.get(userId);
    if(match === undefined){
        return;
    }

    matches.playerIds().forall(id => matches.delete(id));

    match.sendForfeit(userId);
}


module.exports = {startMatch, forfeit};