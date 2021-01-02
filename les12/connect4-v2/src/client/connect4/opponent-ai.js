

export  class OpponentAI{


    playNext(lastInsertedColumn, board){

        const state = board.getBoardState();

        if(state.isGameFinished()){
            //nothing to do
            return;
        }

        /*
            Just simulate a delay for the AI, instead of doing
            an insertion immediately.
         */
        const delay = 1000 * Math.random();
        setTimeout(() => this.handleNextMove(board), delay);
    }

    /*
        WARNING:
        what happens if a user start a new game before the callback
        of the setTimeout is executed?
        We would have to handle such case.
     */

    handleNextMove(board){

        /*
            For simplicity, the "AI" will just choose at random
            among the available columns
         */
        const state = board.getBoardState();

        const options = state.freeColumns();
        const chosen = options[Math.floor(options.length * Math.random())];

        const copy = state.copy();
        copy.selectColumn(chosen);

        board.setBoardState(copy);
    }
}
