const express = require('express')
const passport = require('passport');

const Users = require('./data/users');

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


module.exports = router;
