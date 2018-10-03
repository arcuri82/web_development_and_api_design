import React from "react";
import {Board} from "./board";
import {OpponentAI} from "./opponent-ai";


export class AiMatch extends React.Component {

    constructor(props) {
        super(props);

        this.refToBoard = React.createRef();
        this.opponent = new OpponentAI();
    }


    render() {

        return (
            <div>
                <Board ref={this.refToBoard}
                       opponent={this.opponent}
                       title={"Match against the AI"}/>
            </div>
        );
    }
}
