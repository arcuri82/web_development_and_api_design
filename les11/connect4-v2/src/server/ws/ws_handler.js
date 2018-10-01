const socketIo = require('socket.io');
const Tokens = require('./tokens');
const ActivePlayers = require('../online/active_players');
const OngoingMatches = require('../online/ongoing_matches');

let io;

const start = (server) => {

    io = socketIo(server);

    io.on('connection', function(socket){

        socket.on('login', function(data){

            if(data === null || data === undefined){
                socket.emit("update", {error: "No payload provided"});
                return;
            }

            const token = data.wstoken;

            if(token === null || token === undefined){
                socket.emit("update", {error: "Missing token"});
                return;
            }

            const userId = Tokens.consumeToken(token);
            if(userId === null || userId === undefined){
                socket.emit("update", {error: "Invalid token"});
                return;
            }

            ActivePlayers.registerSocket(socket, userId);
        });

        //disconnect is treated specially
        socket.on('disconnect', function () {

            const userId = ActivePlayers.getUser(socket.id);

            ActivePlayers.removeSocket(socket.id);
            OngoingMatches.forfeit(userId);
        });
    });
};


module.exports = {start};