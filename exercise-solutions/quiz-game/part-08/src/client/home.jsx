import React from "react";
import {Link} from "react-router-dom";


export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }

    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        return (
            <div>
                <div>
                    <h2>Quiz Game</h2>

                    <p>
                        Welcome to the Quiz Game!
                        In this game, you will get a series of questions, each one with 4 possible answers.
                        Only 1 out of the 4 answers is correct.
                        If you answer wrongly to any of the questions, you lose!
                        You win if you manage to answer correctly to all questions.
                    </p>
                </div>


                {loggedIn ? (
                    <div>
                        <div className="btnPart">
                            <Link to={"/match"} className={"btn"}>
                                Play
                            </Link>
                        </div>
                        <p>Victories: {user.victories}</p>
                        <p>Defeats: {user.defeats}</p>
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
