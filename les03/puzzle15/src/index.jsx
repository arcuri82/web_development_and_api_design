import React from "react";
import ReactDOM from "react-dom";
import {createMatrix, cloneMatrix} from "./utils";

class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cells: createMatrix(4,4,null)
        };

        //init values
        for(let r=0; r<4; r++){
            for(let c=0; c<4; c++){
                if(r !== 3 && c !== 3)
                this.state.cells[r][c] = (r * 4) + c + 1;
            }
        }
    }

    shuffle = () => {
        this.setState(prev => ({cells: cloneMatrix(prev.cells)}))
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


    render() {
        return (
            <div>
                <h2>15 Puzzle Game</h2>

            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById("root"));