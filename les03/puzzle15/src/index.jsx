import React from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import {createMatrix, cloneMatrix} from "./utils";

class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cells: createMatrix(4,4,null)
        };
    }

    componentDidMount(){
        this.shuffle();
    }

    shuffle = () => {

        const values = _.shuffle(Array.from(Array(16)).map((e,i) => i===15 ? null : i+1));
        const board = createMatrix(4,4,null);
        for(let r=0; r<4; r++){
            for(let c=0; c<4; c++){
                board[r][c] = values[(r * 4) + c ];
            }
        }

        this.setState({cells: board})
    };

    static coordinatesOfFree(board){
        for(let r=0; r<4; r++) {
            for (let c = 0; c < 4; c++) {
                if(board[r][c] === null){
                    return {r,c}
                }
            }
        }
        throw "Invalid board state: no free cell"
    }

    isFreeCell(row, column){
        const free = App.coordinatesOfFree(this.state.cells);
        return  free.r === row && free.c === column;
    }

    isNextToFree(row, column){

        const free = App.coordinatesOfFree(this.state.cells);

        const left = row === free.r && column === free.c-1;
        const right = row === free.r && column === free.c+1;
        const up = row === free.r-1 && column === free.c;
        const down = row === free.r+1 && column === free.c;

        return left || right || up || down;
    }

    selectCell = (row, column) => {

        this.setState( prev => {
            const copy = cloneMatrix(prev.cells);
            const free = App.coordinatesOfFree(copy);

            const tmp = copy[row][column];
            copy[row][column] = copy[free.r][free.c];
            copy[free.r][free.c] = tmp;

            return {cells: copy};
        })
    };

    renderCell(row, column){

        const v = this.state.cells[row][column];

        let style = {cursor:"default", background:"white"};
        let handler = null;

        if(this.isFreeCell(row, column) ){
            style = {cursor:"default", background:"black"};
        }

        if(this.isNextToFree(row, column)){
            style = {cursor:"pointer", background:"white"};
            handler = () => this.selectCell(row, column);
        }

        return(
            <div className={"cell"}
                 key={"unique_cell_key_row_"+row+"_column_"+column}
                 style={style}
                 onClick={handler}
            >
                {v === null ? "" : v}
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

    isSolved(){

        let expected = 1;

        for(let r=0; r<4; r++) {
            for (let c = 0; c < 4; c++) {
                if(expected === 16){
                    return true;
                }
                if(this.state.cells[r][c] !== expected) {
                    return false;
                }
                expected++;
            }
        }

        throw "Logical bug"; // should never be reached
    }

    render() {
        return (
            <div>
                <h2>15 Puzzle Game</h2>
                {this.state.cells.map((e,i) => this.renderRow(i))}
                <div className={"btn"} onClick={this.shuffle}>Shuffle</div>
                {this.isSolved() ? <h3>You solved the puzzle! Congratulations!!!</h3> : <h3>Puzzle not solved yet</h3>}
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById("root"));