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
                //shouldn't really happen
                res.status(500).send();
            } else {
                res.status(201).send();
            }
        });
    });
});

router.post('/logout', function(req, res){

    req.logout();
    res.status(204).send();
});

/*
    Create a one-time random token associated with the current
    logged in user, which is defined by the provided session cookie.
 */
router.post('/wstoken', function (req, res) {

    if(! req.user){
        res.status(401).send();
        return;
    }

    const t = Tokens.createToken(req.user.id);

    res.status(201).json({wstoken: t});
});

/*
    Just return the id of the user, if the request is
    authenticated with a valid session cookie
 */
router.get('/user', function (req, res) {

    if(! req.user){
        res.status(401).send();
        return;
    }

    res.status(200).json({userId: req.user.id});
});


module.exports = router;
