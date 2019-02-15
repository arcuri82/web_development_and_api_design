const socketIo = require('socket.io');
const Tokens = require('./tokens');
const ActivePlayers = require('../online/active-players');
const OngoingMatches = require('../online/ongoing-matches');

let io;

const start = (server) => {

    //start a WebSocket server besides the REST API from Express
    io = socketIo(server);

    /*
        Every time a new user connects, a "connect" even is sent to the server,
        and we can obtain the "socket" object associated with such new user.
        On such object, we will register a series of event listeners using
        ".on".
     */
    io.on('connection', function(socket){

        /*
            WebSockets do not have a native concept of authentication.
            As WS is over HTTP, we could re-use the same session cookies,
            which will be sent together with the WS requests.
            But there are some limitations with such approach.
            You can see more details at:

            https://devcenter.heroku.com/articles/websocket-security

            Here, for simplicity, we use a general approach of token-based
            authentication.
            Once the user is authenticated via regular HTTP protocol, then
            it can query for a specific endpoint returning a token associated
            with the logged in user.
            Such token can then be sent as part of handshake when the first WS
            message is sent.
         */
        socket.on('login', (data) => {

            if(data === null || data === undefined){
                socket.emit("update", {error: "No payload provided"});
                return;
            }

            const token = data.wstoken;

            if(token === null || token === undefined){
                socket.emit("update", {error: "Missing token"});
                return;
            }

            //token can be used only once to authenticate only a single socket
            const userId = Tokens.consumeToken(token);

            if(userId === null || userId === undefined){
                socket.emit("update", {error: "Invalid token"});
                return;
            }

            /*
                if token was valid, then we can create an authenticated
                association with the given user for that token and the
                current socket
             */
            ActivePlayers.registerSocket(socket, userId);

            console.log("User '"+userId+"' is now connected with a websocket.");
        });

        //disconnect is treated specially
        socket.on('disconnect',  () => {

            const userId = ActivePlayers.getUser(socket.id);

            ActivePlayers.removeSocket(socket.id);

            /*
                if a user is leaving, any of its ongoing matches should be
                forfeit, which means that the opponent wins.
                If we do not do this, a user could cheat by just quitting
                the connection when it sees that it is losing a match
             */
            OngoingMatches.forfeit(userId);

            console.log("User '"+userId+"' is disconnected.");
        });
    });
};


module.exports = {start};