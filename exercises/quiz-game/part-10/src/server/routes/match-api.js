const express = require('express');

const {getMatch, createMatch} = require('../db/matches');
const {reportEndOfMatch} = require('../db/users');

const router = express.Router();



function getPayload(match){

    const quiz = match.quizzes[match.current];
    const shallowCopy = Object.assign({}, quiz);
    shallowCopy.indexOfRightAnswer = undefined;

    const payload = {
        id: match.id,
        currentIndex: match.current,
        currentQuiz: shallowCopy,
        victory: match.victory,
        defeat: match.defeat,
        numberOfQuizzes: match.quizzes.length
    };

    return payload;
}

/*
    Create a new match.
    Only logged in users can play online.
 */
router.post('/matches', (req, res) => {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    const match = createMatch(req.user.id, 3);
    const payload = getPayload(match);

    res.status(201).json(payload);
});


router.get('/matches/ongoing', (req, res) => {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    const match = getMatch(req.user.id);
    if(! match){
        res.status(404).send();
        return;
    }

    const payload = getPayload(match);

    res.status(200).json(payload);
});

router.post('/matches/ongoing', (req, res) => {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    const match = getMatch(req.user.id);
    if(! match || match.victory || match.defeat){
        res.status(400).send();
        return;
    }

    const quiz = match.quizzes[match.current];

    const dto = req.body;

    if(dto.answerIndex !== quiz.indexOfRightAnswer){
        match.defeat = true;
        reportEndOfMatch(req.user.id, false);
    } else {
        match.current++;
        if(match.current === match.quizzes.length){
            match.victory = true;
            reportEndOfMatch(req.user.id, true);
        }
    }

    const payload = getPayload(match);

    res.status(201).json(payload);
});

module.exports = router;