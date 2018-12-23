import React from "react";
import {Link} from "react-router-dom";




export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userId = this.props.userId;
        const loggedIn = userId !== null && userId !== undefined;

        return (
            <div>
                <div>
                    <h2>Quiz Game</h2>

                    <p>
                        Welcome to the Quiz Game! In this game,

                        TODO
                    </p>
                </div>


                {loggedIn ? (
                    <div className="btnPart">
                        <Link to={"/match"} className={"btn"}>
                            Start New Match
                        </Link>
                    </div>
                ) : (
                   <p>
                       You need to log-in to start playing!
                   </p>
                )}

            </div>
        );
    }
}
