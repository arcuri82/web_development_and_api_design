const Match = require('../game/match');


/*
    Map from user id to ongoing match
 */
const userIdToMatch = new Map();

const matchIdToMatch = new Map();


function startMatch(firstId, secondId){

    console.log("Starting a new match: '"+firstId+"' vs. '"+secondId+"'");

    // forfeit(firstId);
    // forfeit(secondId);

    const match = new Match(firstId, secondId);

    userIdToMatch.set(firstId, match);
    userIdToMatch.set(secondId, match);
    matchIdToMatch.set(match.matchId, match);

    match.start();
}

function forfeit(userId){

    const match = userIdToMatch.get(userId);
    if(match === undefined){
        return;
    }

    match.playerIds.forEach(id => userIdToMatch.delete(id));
    matchIdToMatch.delete(match.matchId);

    match.sendForfeit(userId);
}


function matchIsFinished(matchId){

    const match = matchIdToMatch.get(matchId);
    if(match === undefined){
        return;
    }

    match.playerIds.forEach(id => userIdToMatch.delete(id));
    matchIdToMatch.delete(match.matchId);
}

function isMatchGoingOn(matchId){
    return matchIdToMatch.has(matchId);
}

module.exports = {startMatch, forfeit, matchIsFinished};