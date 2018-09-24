import React from "react";
import {Board} from "./board";
import {OpponentAI} from "./opponent-ai";


export class AiMatch extends React.Component {

    constructor(props) {
        super(props);

        this.refToBoard = React.createRef();

        this.refToBoard = React.createRef();
        this.opponent = new OpponentAI(this.refToBoard);
    }


    render() {

        return (
            <div>
                <Board ref={this.refToBoard} opponent={this.opponent}/>
            </div>
        );
    }
}
