const express = require('express');
const {getRandomQuizzes} = require('../db/quizzes');

const router = express.Router();



router.post('/matches', (req, res) => {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    const payload = getRandomQuizzes(3);

    res.status(201).json(payload);
});




module.exports = router;