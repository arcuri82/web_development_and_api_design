const express = require('express')
const passport = require('passport');

const Users = require('../db/users');
const Tokens = require('../ws/tokens');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.status(204).send();
});

router.post('/signup', function(req, res){

    const created = Users.createUser(req.body.userId, req.body.password);

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

router.post('/logout', function(req, res){

    req.logout();
    res.status(204).send();
});

router.post('/wstoken', function (req, res) {

    if(! req.user){
        res.status(401).send();
        return;
    }

    const t = Tokens.createToken(req.user.id);

    res.status(201).json({wstoken: t});
});



module.exports = router;
