import React from "react";
import {createMatrix, cloneMatrix} from "./utils";

const X = "X";
const O = "O";

const ROWS = 6;
const COLUMNS = 7;

export class Board extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cells: createMatrix(ROWS,COLUMNS,""),
            counter: 0
        };
    }

    resetBoard(){
        this.setState({
            cells: createMatrix(ROWS,COLUMNS,""),
            counter: 0
        });
    }

    isFreeCell(row, column){

        const v = this.state.cells[row][column];

        return v !== X && v !== O;
    }

    isXandNotO() {
        return (this.state.counter % 2) === 0;
    }

    selectCell = (row, column) => {

        if(! this.isFreeCell(row, column)){
            //already selected
            return;
        }

        const value = this.isXandNotO() ? X : O;

        /*
            In a column, there can be plenty of cells that
            are free, especially at the beginning of the game.
            However, when clicking on a empty cell, the "coin"
            should land on the bottom of that column.
         */
        let bottomRow = row;
        for(let i=bottomRow+1; i<ROWS; i++){
            if(this.isFreeCell(i, column)){
                bottomRow = i;
            }
        }

        this.setState(prevState => {

            const copy = cloneMatrix(prevState.cells);
            copy[bottomRow][column] = value;

            const counter = prevState.counter + 1;

            const result = this.computeResult(copy, counter);
            const xIsNext = (counter % 2) === 0;

            this.props.resultHandler(result, xIsNext);

            return {
                cells: copy,
                counter: counter
            };
        });
    };

    renderCell(row, column){

        const v = this.state.cells[row][column];

        let style = {cursor:"default"};
        let handler = null;

        if(this.isFreeCell(row, column) && this.props.isGameOn){
            style = {cursor:"pointer"};
            handler = () => this.selectCell(row, column);
        }

        return(
            <div className={"cell"}
                 key={"unique_cell_key_row_"+row+"_column_"+column}
                 style={style}
                 onClick={handler}
            >
                {v}
            </div>
        );
    }

    renderRow(row){
        return(
            <div className={"cell-row"} key={"unique_row_key_"+row}>
                {this.state.cells[row].map((e,i) => this.renderCell(row, i))}
            </div>
        );
    }

    renderIndex(index){
        return(
            <div className={"index"} key={"unique_index_key_"+index}>{index}</div>
        );
    }

    render(){

        return(
            <div>
                {this.state.cells.map((e,i) => this.renderRow(i))}
                {Array.from(Array(7)).map((e,i) => this.renderIndex(i))}
            </div>
        );
    }


    isGameFinished(m, counter) {
        return this.computeResult(m, counter) !== 0;
    }

    computeResult(m, counter){

        if(this.doesXWin(m)){
            return 1;
        }
        if(this.doesOWin(m)){
            return 2;
        }
        if(counter >= (ROWS * COLUMNS) - 1){
            return 3;
        }

        return 0;
    }

    doesXWin(m) {
        return this.doesWin(m, X);
    }

    doesOWin(m) {
        return this.doesWin(m, O);
    }

    doesWin(m, v){

        //start with rows
        for(let r=0; r<ROWS; r++){
            for(let c=0; c<COLUMNS-3; c++){
                if(m[r][c]===v && m[r][c+1]===v && m[r][c+2]===v && m[r][c+3]===v){
                    return true;
                }
            }
        }

        //check columns
        for(let c=0; c<COLUMNS; c++){
            for(let r=0; r<ROWS-3; r++){
                if(m[r][c]===v && m[r+1][c]===v && m[r+2][c]===v && m[r+3][c]===v){
                    return true;
                }
            }
        }

        //up diagonals
        for(let c=0; c<COLUMNS-3; c++){
            for(let r=0; r<ROWS-3; r++){
                if(m[r][c]===v && m[r+1][c+1]===v && m[r+2][c+2]===v && m[r+3][c+3]===v){
                    return true;
                }
            }
        }

        //down diagonals
        for(let c=0; c<COLUMNS-3; c++){
            for(let r=3; r<ROWS; r++){
                if(m[r][c]===v && m[r-1][c+1]===v && m[r-2][c+2]===v && m[r-3][c+3]===v){
                    return true;
                }
            }
        }

        return false;
    }
}