const express = require('express');
const passport = require('passport');

const Users = require('../db/users');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.status(204).send();
});

router.post('/signup', function (req, res) {

    const created = Users.createUser(req.body.userId, req.body.password);

    if (!created) {
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

router.post('/logout', function (req, res) {

    req.logout();
    res.status(204).send();
});


/*
    Just return the id of the user, if the request is
    authenticated with a valid session cookie
 */
router.get('/user', function (req, res) {

    if (!req.user) {
        res.status(401).send();
        return;
    }

    res.status(200).json({
            id: req.user.id,
            victories: req.user.victories,
            defeats: req.user.defeats
        }
    );
});


module.exports = router;
