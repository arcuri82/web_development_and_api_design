const express = require('express')
const router = express.Router();
const passport = require('passport');

const Repository = require('./repository');


router.post('/api/login', passport.authenticate('local'), (req, res) => {

    res.status(204).send();
});

router.post('/api/signup', function(req, res){

    const created = Repository.createUser(req.body.userId, req.body.password);

    if(! created){
        res.status(400).send();
        return;
    }

    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
                return next(err);
            }

            res.status(204).send();
        });
    });
});

router.post('/api/logout', function(req, res){

    req.logout();
    res.status(204).send();
});

router.get("/api/balance", (req, res) => {

    if(req.user){
        res.json({balance: req.user.balance});
        return;
    }

    res.status(401).send();
});


router.post("/api/transfer", (req, res) => {

    if(! req.user){
        res.status(401).send();
        return;
    }

    const dto = req.body;

    const from = req.user.id;
    const to = dto.to;
    const amount = dto.amount;

    const transferred = Repository.transferMoney(from, to, amount);
    if(transferred){
        res.status(204);
    } else {
        res.status(400);
    }

    res.send();
});


module.exports = router;