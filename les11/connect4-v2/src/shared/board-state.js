import {createMatrix, cloneMatrix} from "./utils";

const X = "X";
const O = "O";

const ROWS = 6;
const COLUMNS = 7;

export class BoardState {

    constructor() {
        this.state = this.getDefaultState();
    }

    construct(dto){
        this.state = {
            cells: cloneMatrix(dto.cells),
            counter: dto.counter,
            winningPositions: cloneMatrix(dto.winningPositions)
        };
    }

    getDefaultState(){
        return {
            cells: createMatrix(ROWS, COLUMNS, ""),
            counter: 0,
            winningPositions: null
        };
    }

    rows(){
        return ROWS;
    }

    columns(){
        return COLUMNS;
    }

    resetBoard() {
        this.state = this.getDefaultState();
    }

    isFreeCell(row, column) {

        const v = this.state.cells[row][column];

        return v !== X && v !== O;
    }

    isXandNotO() {
        return (this.state.counter % 2) === 0;
    }

    findBottom(row, column) {

        let bottomRow = row;
        for (let i = bottomRow + 1; i < ROWS; i++) {
            if (this.isFreeCell(i, column)) {
                bottomRow = i;
            }
        }
        return bottomRow;
    }

    isGameFinished(m, counter) {
        return this.computeResult(m, counter).resultCode !== 0;
    }

    computeResult(m, counter) {

        const pos = this.winningPositions(m);

        if (pos === null) {
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

    winningPositions(m) {

        //start with rows
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLUMNS - 3; c++) {
                const v = m[r][c];
                if (v  && m[r][c + 1] === v && m[r][c + 2] === v && m[r][c + 3] === v) {
                    return [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]];
                }
            }
        }

        //check columns
        for (let c = 0; c < COLUMNS; c++) {
            for (let r = 0; r < ROWS - 3; r++) {
                const v = m[r][c];
                if (v  && m[r + 1][c] === v && m[r + 2][c] === v && m[r + 3][c] === v) {
                    return [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]];
                }
            }
        }

        //up diagonals
        for (let c = 0; c < COLUMNS - 3; c++) {
            for (let r = 0; r < ROWS - 3; r++) {
                const v = m[r][c];
                if (v  && m[r + 1][c + 1] === v && m[r + 2][c + 2] === v && m[r + 3][c + 3] === v) {
                    return [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]];
                }
            }
        }

        //down diagonals
        for (let c = 0; c < COLUMNS - 3; c++) {
            for (let r = 3; r < ROWS; r++) {
                const v = m[r][c];
                if (v  && m[r - 1][c + 1] === v && m[r - 2][c + 2] === v && m[r - 3][c + 3] === v) {
                    return [[r, c], [r - 1, c + 1], [r - 2, c + 2], [r - 3, c + 3]];
                }
            }
        }

        return null;
    }
}