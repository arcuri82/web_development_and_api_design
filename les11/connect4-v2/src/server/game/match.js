const crypto = require("crypto");

const BoardState = require('../../shared/board-state');
const ActivePlayers = require('../online/active_players');

class Match{

    constructor(firstPlayerId, secondPlayerId, callbackWhenFinished){

        this.board = new BoardState();

        this.playerIds = [firstPlayerId, secondPlayerId];

        this.matchId = this.randomId();

        this.sockets = new Map();

        this.sockets.set(firstPlayerId, ActivePlayers.getSocket(firstPlayerId));
        this.sockets.set(secondPlayerId, ActivePlayers.getSocket(secondPlayerId));

        this.xId = this.playerIds[Math.floor(Math.random() * 2)];

        this.callbackWhenFinished = callbackWhenFinished;
    }


    randomId(){
        return crypto.randomBytes(10).toString('hex');
    }

    start(){

        this.registerListener(this.playerIds[0]);
        this.registerListener(this.playerIds[1]);

        this.sendState(this.playerIds[0]);
        this.sendState(this.playerIds[1]);
    }

    registerListener(userId){

        const socket = this.sockets.get(userId);

        socket.removeAllListeners('insertion');

        socket.on('insertion', data => {

            if (data === null || data === undefined) {
                socket.emit("update", {error: "No payload provided"});
                return;
            }

            const counter = data.counter;
            const position = data.position;
            const matchId = data.matchId;

            console.log("Handling message from '" + userId+"' for counter " + counter + " in match " + this.matchId);

            const expectedCounter = this.board.counter + 1;

            if(counter !== expectedCounter){
                socket.emit("update", {error: "Invalid operation"});
                console.log("Invalid counter: "+counter+" !== " + expectedCounter);
                return;
            }

            if(matchId !== this.matchId){
                //socket.emit("update", {error: "Invalid operation"});
                console.log("Invalid matchId: "+matchId+" !== " + this.matchId);
                return;
            }

            //TODO check correct player, and position

            this.board.selectColumn(position);

            this.sendState(this.opponentId(userId));

            if(this.board.isGameFinished()){
                this.callbackWhenFinished(this.matchId);
            }
        });
    }

    opponentId(userId){
        if(userId === this.playerIds[0]){
            return this.playerIds[1];
        }
        return this.playerIds[0];
    }

    sendState(userId){

        console.log("Sending update to '" +userId+"' for match " + this.matchId);

        const payload = {
            data: {
                matchId: this.matchId,
                boardDto: this.board.extractDto(),
                isX: userId === this.xId,
                opponentId: this.opponentId(userId)
            }
        };

        const socket = this.sockets.get(userId);

        socket.emit('update', payload);
    }

    sendForfeit(userId){

        this.board.doForfeit();
        this.sendState(this.opponentId(userId));
    }
}


module.exports = Match;