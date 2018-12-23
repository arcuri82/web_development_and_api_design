const express = require('express');

const OngoingMatches = require('../online/ongoing_matches');

const router = express.Router();

/*
    Create a new match.
    Only logged in users can play online.
 */
router.post('/matches', (req, res) => {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    //TODO

    res.status(201).send();
});


module.exports = router;