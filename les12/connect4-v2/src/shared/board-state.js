const {createMatrix, cloneMatrix} = require('./utils');

const X = "X";
const O = "O";

const ROWS = 6;
const COLUMNS = 7;

class BoardState {

    constructor(dto) {
        if(!dto){
            this.resetBoard();
        } else {
            this.cells = cloneMatrix(dto.cells);
            this.counter = dto.counter;
            this.winningPositions = cloneMatrix(dto.winningPositions);
            this.result = dto.result;
        }
    }

    /*
        When online multi-player, the state of the board has to be sent
        by the server to update a user with the opponent's movement.
        So, we need to extract a DTO (Data-Transfer-Object) in JSON format
        which can be sent via a WebSocket.
        Such DTO should contain the info to be able to re-instantiate a BoardState
        from it.
     */
    extractDto() {
        return {
            cells: cloneMatrix(this.cells),
            counter: this.counter,
            winningPositions: cloneMatrix(this.winningPositions),
            result: this.result
        };
    }

    copy() {
        return new BoardState(this.extractDto());
    }

    resetBoard() {
        this.cells = createMatrix(ROWS, COLUMNS, "");
        this.counter = 0;
        this.winningPositions = null;
        /*
        0: game still on
        1: X won
        2: O won
        3: tie
        4: forfeit

        Note that an enum would have been better, but JS does
        not have good support for it (as it is a weakly/dynamically typed language).
        */
        this.result = 0;
    }

    rows() {
        return ROWS;
    }

    columns() {
        return COLUMNS;
    }

    doForfeit(){
        this.result = 4;
    }

    isFreeCell(row, column) {

        const v = this.cells[row][column];

        return v !== X && v !== O;
    }

    isFreeColumn(column){
        return this.isFreeCell(0, column)
    }

    freeColumns(){

        return Array.from(Array(COLUMNS))
            .map((e,i) => i) // [0, 1, ..., 5, 6]
            .filter(e => this.isFreeColumn(e))
    }

    isXandNotO() {
        return (this.counter % 2) === 0;
    }

    nextLabelToPlay(){
        if(this.isXandNotO()){
            return X;
        } else {
            return O;
        }
    }

    selectColumn(column) {

        const bottomRow = this.findBottom(column);
        if (bottomRow < 0) {
            throw "Column " + column + " is full";
        }

        const value = this.isXandNotO() ? X : O;
        this.cells[bottomRow][column] = value;
        this.counter++;

        const res = this.computeResult(this.cells, this.counter);
        this.result = res.resultCode;
        this.winningPositions = res.positions;
    }

    /*
           In a column, there can be plenty of cells that
           are free, especially at the beginning of the game.
           However, when clicking on a empty cell, the "coin"
           should land on the bottom of that column.
     */
    findBottom(column) {

        let bottomRow = -1;

        for (let i = 0; i < ROWS; i++) {
            if (this.isFreeCell(i, column)) {
                bottomRow = i;
            } else {
                return bottomRow;
            }
        }

        return bottomRow;
    }

    isGameFinished() {
        return this.result !== 0;
    }

    computeResult(m, counter) {

        const pos = this.computeWinningPositions(m);

        if (!pos) {
            if (counter >= (ROWS * COLUMNS) - 1) {
                //tie
                return {resultCode: 3, positions: null}
            } else {
                return {resultCode: 0, positions: null}
            }
        }

        const r = pos[0][0];
        const c = pos[0][1];

        if (m[r][c] === X) {
            return {resultCode: 1, positions: pos};
        } else if (m[r][c] === O) {
            return {resultCode: 2, positions: pos};
        } else {
            throw "Internal error";
        }
    }

    computeWinningPositions(m) {

        //start with rows
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLUMNS - 3; c++) {
                const v = m[r][c];
                if (v && m[r][c + 1] === v && m[r][c + 2] === v && m[r][c + 3] === v) {
                    return [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]];
                }
            }
        }

        //check columns
        for (let c = 0; c < COLUMNS; c++) {
            for (let r = 0; r < ROWS - 3; r++) {
                const v = m[r][c];
                if (v && m[r + 1][c] === v && m[r + 2][c] === v && m[r + 3][c] === v) {
                    return [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]];
                }
            }
        }

        //up diagonals
        for (let c = 0; c < COLUMNS - 3; c++) {
            for (let r = 0; r < ROWS - 3; r++) {
                const v = m[r][c];
                if (v && m[r + 1][c + 1] === v && m[r + 2][c + 2] === v && m[r + 3][c + 3] === v) {
                    return [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]];
                }
            }
        }

        //down diagonals
        for (let c = 0; c < COLUMNS - 3; c++) {
            for (let r = 3; r < ROWS; r++) {
                const v = m[r][c];
                if (v && m[r - 1][c + 1] === v && m[r - 2][c + 2] === v && m[r - 3][c + 3] === v) {
                    return [[r, c], [r - 1, c + 1], [r - 2, c + 2], [r - 3, c + 3]];
                }
            }
        }

        return null;
    }
}


module.exports = BoardState;