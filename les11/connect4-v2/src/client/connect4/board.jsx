import React from "react";
import {createMatrix, cloneMatrix} from "./utils";
import BoardState from '../shared/board-state';

export class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getDefaultState();

        this.selectCell = this.selectCell.bind(this);
        this.onMouseEnterCell = this.onMouseEnterCell.bind(this);
        this.onMouseLeaveCell = this.onMouseLeaveCell.bind(this);
    }

    getDefaultState(){
        return {
            board: new BoardState(),
            posToInsert: null
        };
    }

    resetBoard() {
        this.setState(this.getDefaultState());
    }

    selectCell(row, column) {

        if (!this.state.board.isFreeCell(row, column)) {
            //already selected
            return;
        }

        const value = this.state.board.isXandNotO() ? X : O;

        /*
            In a column, there can be plenty of cells that
            are free, especially at the beginning of the game.
            However, when clicking on a empty cell, the "coin"
            should land on the bottom of that column.
         */
        const bottomRow = this.findBottom(row, column);

        this.setState(prevState => {

            const copy = cloneMatrix(prevState.cells);
            copy[bottomRow][column] = value;

            const counter = prevState.counter + 1;

            const result = this.computeResult(copy, counter);
            const xIsNext = (counter % 2) === 0;

            this.props.resultHandler(result, xIsNext);

            return {
                cells: copy,
                counter: counter,
                winningPositions: result.positions
            };
        });
    }


    renderCell(row, column) {

        const board = this.state.board;
        const v = board.cells[row][column];

        let style = {cursor: "default"};
        let handler = null;

        if (board.isFreeCell(row, column) && this.props.isGameOn) {
            style = {cursor: "pointer"};
            handler = () => this.selectCell(row, column);
        }

        let highlight = "";

        const toInsert = this.state.posToInsert;
        if(this.props.isGameOn
            && toInsert !== null
            && toInsert[0] === row
            && toInsert[1] === column){

            highlight = "cell-to-insert";
        }

        const winningPos = board.winningPositions;
        if (winningPos !== null) {
            //TODO based on who is the player

            if (winningPos.findIndex(e => e[0] === row && e[1] === column) >= 0
            ) {
                if (v === X) {
                    highlight = "cell-victory";
                } else {
                    highlight = "cell-defeat";
                }
            }
        }

        return (
            <div className={"cell " + highlight}
                 key={"unique_cell_key_row_" + row + "_column_" + column}
                 style={style}
                 onClick={handler}
                 onMouseEnter={() => this.onMouseEnterCell(row, column)}
                 onMouseLeave={() => this.onMouseLeaveCell(row, column)}
            >
                {v}
            </div>
        );
    }

    onMouseEnterCell(row, column) {

        const bottomRow = this.state.board.findBottom(row, column);

        this.setState({posToInsert: [bottomRow, column]});
    }

    onMouseLeaveCell(row, column) {

        this.setState(prevState => {
            if(prevState.posToInsert === null){
                //nothing to do
                return;
            }
            if(prevState.posToInsert[1] === column){
                return {posToInsert: null};
            } else {
                /*
                    Here, we handle possible case in which
                    entering column X is handled before leaving Y.
                    If we leave column Y and currently the state
                    is for X, then we should do nothing.
                 */
                return;
            }
        });
    }

    renderRow(row) {
        return (
            <div className={"cell-row"} key={"unique_row_key_" + row}>
                {this.state.board.cells[row].map((e, i) => this.renderCell(row, i))}
            </div>
        );
    }

    renderIndex(index) {
        return (
            <div className={"index"} key={"unique_index_key_" + index}>{index}</div>
        );
    }

    render() {

        return (
            <div>
                {this.state.board.cells.map((e, i) => this.renderRow(i))}
                {Array.from(Array(7)).map((e, i) => this.renderIndex(i))}
            </div>
        );
    }
}