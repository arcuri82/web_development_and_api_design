const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
//const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const Repository = require('./repository');

const app = express();

if(process.env.CORS){
    console.log("Using CORS to allow all origins")
    app.use(cors());

    /*
        Even if we allow requests from all origins with
        "Access-Control-Allow-Origin: *"
        (which is what cors() does), it would still block
        requests with authentication (ie cookies).
        Ie, cannot use wildcard * when dealing with authenticated
        requests. We would have to explicitly state the origin (host + port),
        eg, as we did in previous examples:

        app.use(cors({
            origin: 'http://localhost:1234'
        }));
     */
}



//to handle JSON payloads
app.use(bodyParser.json());

//to handle Form POST
app.use(bodyParser.urlencoded({extended: true}));


//app.use(cookieParser());
app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));


passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Repository.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Repository.getUser(userId);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Repository.getUser(id);

    if (user !== undefined) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());


//--- Routes -----------
app.use('/', routes);

//handling 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;
