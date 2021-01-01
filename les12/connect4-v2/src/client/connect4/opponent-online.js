

export  class OpponentOnline{

    setSocket(socket){
        this.socket = socket;
    }

    setMatchId(matchId){
        this.matchId = matchId;
    }

    playNext(lastInsertedColumn, boardCmp){

        /*
            Each time we do a move (ie click on a column), we need to
            send such info to the server, so the opponent can be informed that
            now it is its turn to play.
            We will be informed of the opponent's move when reading on the
            socket "update".
         */

        if(!lastInsertedColumn){
            //first round, no need to inform server
            return;
        }

        const boardState = boardCmp.getBoardState();

        /*
            Not only we send the column index of where we did our move,
            but also the matchId and the current counter.
            This is because then the server can verify if this is the
            correct message it expects, and ignore it / send an error msg
            if matchId/counter do not match for the current ongoing game.
         */

        const payload = JSON.stringify({
            topic:'insertion',
            counter: boardState.counter,
            position: lastInsertedColumn,
            matchId: this.matchId
        });

        this.socket.send(payload);
    }

}
