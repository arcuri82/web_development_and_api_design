import React from "react";
import {Board} from "./board";
import {Info} from "./info";

export class Connect4 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            /*
               0: game still on
               1: X won
               2: O won
               3: tie

               Note that an enum would have been better, but JS does
               not have good support for it (as it is a weakly/dynamically typed language).
             */
            result: 0,
            xIsNext: true
        };

        this.refToBoard = React.createRef();
    }

    updateAfterSelection = (res, xIsNext) => {

        this.setState({result: res, xIsNext: xIsNext});
    };

    resetBoard = () => {
        this.refToBoard.current.resetBoard();

        this.setState({result:0, xIsNext: true});
    };

    render() {

        return (
            <div>
                <Board ref={this.refToBoard}
                       resultHandler={(r, x) => this.updateAfterSelection(r, x)}
                       isGameOn={this.state.result === 0}/>
                <Info result={this.state.result}
                      xIsNext={this.state.xIsNext}
                      resetHandler={this.resetBoard}
                />
            </div>
        );
    }
}
