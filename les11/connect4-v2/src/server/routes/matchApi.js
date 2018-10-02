const express = require('express');

const PlayerQueue = require('../online/player_queue');
const ActivePlayers = require('../online/active_players');
const OngoingMatches = require('../online/ongoing_matches');

const router = express.Router();


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

    OngoingMatches.forfeit(req.user.id);

    while (PlayerQueue.size() > 0) {

        const opponent = PlayerQueue.takeUser();
        if (!ActivePlayers.isActive(opponent)) {
            continue;
        }

        OngoingMatches.startMatch(req.user.id, opponent);

        res.status(201).send();
        return;
    }

    PlayerQueue.addUser(req.user.id);
    res.status(201).send();
});


module.exports = router;