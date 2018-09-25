import React from "react";
import {Link, withRouter} from 'react-router-dom';

import HeaderBar from "./headerbar";

export class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {

        const userId = this.props.userId;
        const loggedIn = (userId !== null && userId !== undefined);


        return (
            <div>
                <HeaderBar userId={this.props.userId}
                           updateLoggedInUserId={this.props.updateLoggedInUserId}/>

                <div>
                    <h2>Connect Four Game</h2>

                    <p>
                        Welcome to the Connect Four Game!
                        In this game, you alternate with an opponent in
                        adding coins (X or O) into a 6x7 grid.
                        The goal of the game is to align 4 of your coins,
                        either horizontally, vertically or diagonally.
                    </p>
                    <p>
                        You can play either against an AI, or against other
                        players online.
                        However, to play online, you need to create an account
                        and be logged in.
                    </p>
                </div>

                <div>
                    <Link to={"/match/ai"} className={"btn"}>AI Match</Link>
                    {loggedIn ?
                        <Link to={"/match/online"} className={"btn"}>Online Match</Link>
                        :
                        //TODO
                        <div>Online Match</div>
                    }
                </div>

                {/* TODO LeaderBoard on the side */}
            </div>
        );
    }
}
