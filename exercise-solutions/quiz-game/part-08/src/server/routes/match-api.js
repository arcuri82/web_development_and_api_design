const express = require('express');
const {getRandomQuizzes} = require('../db/quizzes');

const router = express.Router();



router.post('/matches', (req, res) => {

    const payload = getRandomQuizzes(3);

    res.status(201).json(payload);
});




module.exports = router;