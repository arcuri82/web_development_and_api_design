import React from "react";
import { Link } from "react-router-dom";

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.user) {
      /*
        If we are authenticated, we still want to update info from the server,
        e.g., the current number of victories and defeats, as the current info
        we hold might be outdated
       */
      this.props.fetchAndUpdateUserInfo();
    }
  }

  render() {
    const user = this.props.user;
    const loggedIn = user !== null && user !== undefined;

    return (
      <div className="main-content">
        <h2 className="heading">Play the Quiz Game</h2>

        <p>
          Welcome to the Quiz Game! In this game, you will get a series of
          questions, each one with 4 possible answers. Only 1 out of the 4
          answers is correct. If you answer wrongly to any of the questions, you
          lose! You win if you manage to answer correctly to all questions.
        </p>

        {loggedIn ? (
          <div>
            <Link to={"/match"} className={"button"}>
              Play
            </Link>
            <div className="action">
              <p>Victories: {user.victories}</p>
              <p>Defeats: {user.defeats}</p>
            </div>
          </div>
        ) : (
          <p>You need to log-in to start playing!</p>
        )}
      </div>
    );
  }
}
