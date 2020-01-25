import React from "react";
import { Link, withRouter } from "react-router-dom";

/*
    Just provide a header component for all pages, where we have a link to the
    home-page, and login/sing-up/logout buttons.
 */
class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }

  doLogout = async () => {
    const url = "/api/logout";

    let response;

    try {
      response = await fetch(url, { method: "post" });
    } catch (err) {
      alert("Failed to connect to server: " + err);
      return;
    }

    if (response.status !== 204) {
      alert("Error when connecting to server: status code " + response.status);
      return;
    }

    this.props.updateLoggedInUserId(null);
    this.props.history.push("/");
  };

  renderLoggedIn(userId) {
    return (
      <div className="msgDiv">
        <h3 className="notLoggedInMsg">
          Welcome {userId}
          !!!
        </h3>

        <div className="btn btnPartHeader" onClick={this.doLogout}>
          Logout
        </div>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div className="msgDiv">
        <div className="notLoggedInMsg">You are not logged in</div>
        <div className="btnPartHeader">
          <Link className="btn" to="/login">
            LogIn
          </Link>
          <Link className="btn" to="/signup">
            SignUp
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const userId = this.props.userId;

    let content;
    if (!userId) {
      content = this.renderNotLoggedIn();
    } else {
      content = this.renderLoggedIn(userId);
    }

    return (
      <div className={"headerBar"}>
        <Link className="btn home" to={"/"}>
          Home
        </Link>
        {content}
      </div>
    );
  }
}

export default withRouter(HeaderBar);
