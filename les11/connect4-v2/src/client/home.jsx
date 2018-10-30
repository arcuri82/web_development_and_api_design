import React from "react";
import { Link } from "react-router-dom";

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
          <h2>Connect Four Game</h2>

          <p>
            Welcome to the Connect Four Game! In this game, you alternate with
            an opponent in adding coins (X or O) into a 6x7 grid. The goal of
            the game is to align 4 of your coins, either horizontally,
            vertically or diagonally.
          </p>
          <p>
            You can play either against an AI, or against other players online.
            However, to play online, you need to create an account and be logged
            in.
          </p>
        </div>

        <div className="btnPart">
          <Link to={"/match/ai"} className={"btn"}>
            AI Match
          </Link>
          {loggedIn ? (
            <Link to={"/match/online"} className={"btn"}>
              Online Match
            </Link>
          ) : (
            <div className="btnDeActive">Online Match</div>
          )}
        </div>
      </div>
    );
  }
}
