

export  class OpponentOnline{

    constructor(boardRef, socket){
        this.handleNextMove = this.handleNextMove.bind(this);
        this.boardRef = boardRef;
        this.socket = socket;
        this.matchId = null;
    }

    playNext(lastInsertedColumn){

        const boardCmp = this.boardRef.current;
        const boardState = boardCmp.state.getBoardState();

        this.socket.emit('insertion', {
            counter: boardState.counter,
            position: lastInsertedColumn,
            matchId: this.matchId
        });
    }

}
