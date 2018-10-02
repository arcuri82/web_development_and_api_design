

export  class OpponentAI{

    // constructor(boardRef){
    //     this.handleNextMove = this.handleNextMove.bind(this);
    //     this.boardRef = boardRef;
    // }

    playNext(lastInsertedColumn, board){

        // const board = this.boardRef.current;
        const state = board.getBoardState();

        if(state.isGameFinished()){
            //nothing to do
            return;
        }

        const delay = 1000 * Math.random();
        setTimeout(() => this.handleNextMove(board), delay);
    }

    /*
        TODO need to handle cancellation of task, via a Promise
     */

    handleNextMove(board){

        // const board = this.boardRef.current;
        const state = board.getBoardState();

        const options = state.freeColumns();
        const chosen = options[Math.floor(options.length * Math.random())];

        const copy = state.copy();
        copy.selectColumn(chosen);

        board.setBoardState(copy);
    }
}
