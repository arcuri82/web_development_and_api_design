import React from "react";

/*
    The info panel has no state... the state belongs to the parent,
    and it is passed here as props.
    So no need to have a React.Component class.
    Can just have a function that takes as input props.
 */
export const Info = (props) =>{

    const res = props.result;

    let msg;
    if(res === 0){
        const player = props.xIsNext ? "X" : "O";
        msg = "Next Player is: " + player;
    } else if(res === 1){
        msg = "X Won!"
    } else if(res === 2){
        msg = "O Won!"
    } else if(res === 3){
        msg = "The Game Ended in a Tie!"
    } else {
        throw "Invalid result code: " + res;
    }

    return(
        <div className="game-info">
            <div className="status">{msg}</div>
            <div className="btn" onClick={props.resetHandler}>New Match</div>
        </div>
    );
};