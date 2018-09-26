import React from "react";
import {Board} from "./board";
import {OpponentAI} from "./opponent-ai";
import HeaderBar from "../headerbar";


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
                <HeaderBar userId={this.props.userId}
                           updateLoggedInUserId={this.props.updateLoggedInUserId}/>

                <Board ref={this.refToBoard}
                       opponent={this.opponent}
                       title={"Match against the AI"}/>
            </div>
        );
    }
}
