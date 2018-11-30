const express = require('express')
const router = express.Router();
const passport = require('passport');

const Repository = require('./repository');


/*
    The login will apply the Passport filter to check if provided
    username/password are correct.
    See "passport.use(new LocalStrategy" in app.js
 */
router.post('/api/login', passport.authenticate('local'), (req, res) => {

    res.status(204).send();
});

router.post('/api/signup', function(req, res){

    const created = Repository.createUser(req.body.userId, req.body.password);

    if(! created){
        res.status(400).send();
        return;
    }

    /*
        The incoming HTTP request was not authenticated. However, once we
        create a valid new user, we should manually authenticate the request.
        Otherwise, user would need to make a separate "/api/login" call.
     */
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

/*
    Provide info on logged in user
 */
router.get("/api/user", (req, res) => {

    /*
        If a user is logged in by providing the right session cookie,
        then Passport will automatically instantiate a valid User object
        and add it to the incoming "req" object
     */

    if(req.user){
        res.json({
            userId: req.user.id,
            balance: req.user.balance
        });
        return;
    }

    res.status(401).send();
});


router.post("/api/transfers", (req, res) => {

    if(! req.user){
        res.status(401).send();
        return;
    }

    const dto = req.body;

    const from = req.user.id;
    const to = dto.to;
    const amount = dto.amount;

    const transferred = Repository.transferMoney(from, to, amount);

    /*
        In general, we would not need to support
        both Form and JSON in the same App: just JSON.
        Form-submissions are mainly used in server-side
        rendering apps with no/limited JS.
        However, here we support both just for didactical reasons.
     */

    const form = req.is("application/x-www-form-urlencoded");

    if(form){
        res.status(302);
        if(transferred) {
            //back to home page
            res.location("/");
        } else {
            /*
                Note: we do not support it in the GUI,
                but the use of query params is what
                usually employed when displaying errors
                coming from a Form request.
             */
            res.location("/?error=true");
        }
        res.send();
    } else {
        //JSON
        if (transferred) {
            res.status(204);
        } else {
            res.status(400);
        }

        res.send();
    }
});


module.exports = router;
