const express = require('express');

const PlayerQueue = require('../online/player-queue');
const ActivePlayers = require('../online/active-players');
const OngoingMatches = require('../online/ongoing-matches');

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

    if(PlayerQueue.hasUser(req.user.id)){
        //already in the queue, nothing to do
        res.status(204).send();
        return;
    }

    /*
        If a user tries to start a new match while it was playing
        another one, such previous match must be forfeited.
        Otherwise, a user might cheat by just starting a new match
        when it sees it is losing the current one.
     */
    OngoingMatches.forfeit(req.user.id);

    while (PlayerQueue.size() > 0) {

        /*
            Get a user from the queue of waiting players
         */
        const opponent = PlayerQueue.takeUser();
        if (!ActivePlayers.isActive(opponent)) {
            //this can happen if a user has disconnected
            continue;
        }

        OngoingMatches.startMatch(req.user.id, opponent);

        res.status(201).send();
        return;
    }

    /*
        This could happen if there is no user in the queue.
        The current user has to wait for when an opponent shows up.
     */
    PlayerQueue.addUser(req.user.id);
    res.status(201).send();
});


module.exports = router;