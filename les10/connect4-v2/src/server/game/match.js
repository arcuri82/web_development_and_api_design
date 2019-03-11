const crypto = require("crypto");

const BoardState = require('../../shared/board-state');
const ActivePlayers = require('../online/active-players');

/*
    Class used to represent a Match between two players.
    Every time a player does a move, we need to inform the opponent.
    This is done via WebSockets.

    Each match will have an id selected at random.
 */
class Match{

    constructor(firstPlayerId, secondPlayerId, callbackWhenFinished){

        this.board = new BoardState();

        this.playerIds = [firstPlayerId, secondPlayerId];

        this.matchId = this.randomId();

        /*
            Given two users playing this match, we need to get the WS sockets
            associated with them.
            Those are needed to send messages to those 2 users.
         */
        this.sockets = new Map();
        this.sockets.set(firstPlayerId, ActivePlayers.getSocket(firstPlayerId));
        this.sockets.set(secondPlayerId, ActivePlayers.getSocket(secondPlayerId));

        //who is starting is selected at random
        this.xId = this.playerIds[Math.floor(Math.random() * 2)];

        //instruct what to do once a match is finished
        this.callbackWhenFinished = callbackWhenFinished;
    }


    randomId(){
        return crypto.randomBytes(10).toString('hex');
    }

    start(){

        this.registerListener(this.playerIds[0]);
        this.registerListener(this.playerIds[1]);

        /*
            When a new match is started, we need to update
            both players, to inform them who has the first move.
         */
        this.sendState(this.playerIds[0]);
        this.sendState(this.playerIds[1]);
    }

    registerListener(userId){

        /*
            The users will send messages on the WS each time they make a move.
            So, we need to register a listener on the event "insertion" for
            the sockets associated to the 2 players
         */

        const socket = this.sockets.get(userId);

        /*
            A player could play many matches, in sequence, on the same socket.
            Once a match is over, we should not read any further message for it.
            A user should be able to play only 1 match at a time.
            At each new match, we need to register a new handler for the
            "insertion" event, bound to the current match.
            So, to avoid problems, we just delete all existing handlers when a new
            match is started, as anyway a user can play only 1 match at a time.
         */
        socket.addMessageHandler("insertion", (dto, socket) => {this.insertionWsHandler(dto, socket, userId)});
    }

    insertionWsHandler(dto, socket, userId){

        const counter = dto.counter;
        const position = dto.position;
        const matchId = dto.matchId;

        console.log("Handling message from '" + userId+"' for counter " + counter
            + " in match " + this.matchId);

        const expectedCounter = this.board.counter + 1;

        /*
            We start with some input validation, eg checking if the received
            message was really meant for this ongoing match.
         */

        if(counter !== expectedCounter){
            socket.send(JSON.stringify({topic: "update", error: "Invalid operation"}));
            console.log("Invalid counter: "+counter+" !== " + expectedCounter);
            return;
        }

        if(matchId !== this.matchId){
            console.log("Invalid matchId: "+matchId+" !== " + this.matchId);
            return;
        }

        /*
            WARNING: the checks above are a starting point, but they are
            not sufficient. For example, we are not checking if the position
            is valid.
            You might think that, if the code in the frontend (ie bundle.js) is
            bug-free, then that should not be a problem.
            But a logged in user could craft messages manually with a program.

            This is a issue. For example, this game is NOT secure, even if we
            are using authentication on the WS socket channels.
            For example, it can be "easy" for a user to CHEAT.
            When a user sends its move via the socket, it can craft immediately
            a second message representing the move of the opponent, by just
            using "counter+1" in data.counter.

            This problem can be fixed here by checking if the move for action with
            index "counter" is actually expected to come from this user's socket and
            not the opponent.
         */

        //update the state of the game
        this.board.selectColumn(position);

        //send such state to the opponent
        this.sendState(this.opponentId(userId));

        if(this.board.isGameFinished()){
            this.callbackWhenFinished(this.matchId);
        }
    };


    opponentId(userId){
        if(userId === this.playerIds[0]){
            return this.playerIds[1];
        }
        return this.playerIds[0];
    }

    sendState(userId){

        console.log("Sending update to '" +userId+"' for match " + this.matchId);

        const payload = {
            topic: "update",
            data: {
                matchId: this.matchId,
                boardDto: this.board.extractDto(),
                isX: userId === this.xId,
                opponentId: this.opponentId(userId)
            }
        };

        const socket = this.sockets.get(userId);

        socket.send(JSON.stringify(payload));
    }

    sendForfeit(userId){

        this.board.doForfeit();
        this.sendState(this.opponentId(userId));
    }
}


module.exports = Match;