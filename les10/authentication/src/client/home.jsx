import React from "react";
import HeaderBar from "./headerbar";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sendTo: "",
      amountToSend: "",
      balance: null,
      errorMsg: null
    };
  }

  componentDidMount() {
    this.updateBalance();
  }

  onSendToChange = (event) => {
    this.setState({ sendTo: event.target.value });
  };

  onAmountToSendChange = (event) => {
    this.setState({ amountToSend: event.target.value });
  };

  transferMoney = async () => {
    if (this.props.userId === null || this.props.userId === undefined) {
      return;
    }

    const url = "/api/transfers";

    const payload = { to: this.state.sendTo, amount: this.state.amountToSend };

    let response;

    try {
      response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      this.setState({ errorMsg: "Failed to connect to server: " + err });
      return;
    }

    if (response.status === 401) {
      this.setState({ errorMsg: "Invalid userId/password" });
      return;
    }

    if (response.status !== 204) {
      this.setState({
        errorMsg:
          "Error when connecting to server: status code " + response.status
      });
      return;
    }

    this.updateBalance();
  }

  async updateBalance() {
    const url = "/api/user";

    let response;

    try {
      response = await fetch(url);
    } catch (err) {
      this.setState({
        errorMsg: "ERROR when retrieving balance: " + err,
        balance: null
      });
      return;
    }

    if (response.status === 401) {
      //we are not logged in, or session did timeout
      this.props.updateLoggedInUserId(null);
      return;
    }

    if (response.status === 200) {
      const payload = await response.json();

      this.setState({
        errorMsg: null,
        balance: payload.balance
      });

      this.props.updateLoggedInUserId(payload.userId);
    } else {
      this.setState({
        errorMsg: "Issue with HTTP connection: status code " + response.status,
        balance: null
      });
    }
  }

  renderLoggedIn() {
    return (
      <div className="signupArea">
        <p>Your balance is currently: {this.state.balance}</p>

        <p>Transfer money</p>

        <form method={"post"} action={"/api/transfers"}>
          To:{" "}
          <input
            type="text"
            name="to"
            value={this.state.sendTo}
            onChange={this.onSendToChange}
            className="lastInput"
          />
          <br />
          Amount:{" "}
          <input
            type="text"
            name="amount"
            value={this.state.amountToSend}
            onChange={this.onAmountToSendChange}
            className="lastInput"
          />
          <br />
          <div className="btn" onClick={this.transferMoney}>
            Transfer (AJAX)
          </div>
          <button className="transBtn btn">Transfer (Form)</button>
        </form>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div>
        <span>
          To be able to see your account you need to log in first. If you do not
          have an account, you can sign up to create a new one. You will receive
          1000 free credits!!!
        </span>
      </div>
    );
  }

  render() {
    const userId = this.props.userId;
    let pageContent;

    if (userId === null || userId === undefined) {
      pageContent = this.renderNotLoggedIn();
    } else {
      pageContent = this.renderLoggedIn();
    }

    let error = <div />;
    if (this.state.errorMsg !== null) {
      error = (
        <div className="errorMsg">
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }

    return (
      <div>
        <HeaderBar
          userId={this.props.userId}
          updateLoggedInUserId={this.props.updateLoggedInUserId}
        />

        <div>
          <p className="bankLogo">My Bank</p>
        </div>

        <div className="mainContent">
          {pageContent}
          {error}
        </div>
      </div>
    );
  }
}
