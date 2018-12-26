const {reportEndOfMatch} = require("./users");
const {quizzes} = require("./quizzes");

/**
 * Key -> User Id
 * Value -> Match info
 */
const matches = new Map();

let counter = 0;


function createMatch(userId, numberOfQuizzes) {

    const ongoing = matches.get(userId);
    if (ongoing) {
        reportEndOfMatch(userId, false);
    }

    const id = counter;
    counter++;

    const selection = Array(numberOfQuizzes);

    let i = 0;
    while (i < numberOfQuizzes) {

        const k = Math.floor(quizzes.length * Math.random());
        if (k in selection) {
            continue;
        }

        selection[i] = k;
        i++;
    }

    const match = {
        id: id,
        current: 0,
        quizzes: Array.from(selection).map(e => quizzes[e]),
        victory: false,
        defeat: false
    };

    matches.set(userId, match);

    return match;
}

function getMatch(userId) {
    return matches.get(userId);
}


module.exports = {getMatch, createMatch};