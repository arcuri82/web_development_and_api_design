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

        this.transferMoney = this.transferMoney.bind(this);
        this.onAmountToSendChange = this.onAmountToSendChange.bind(this);
        this.onSendToChange = this.onSendToChange.bind(this);
    }

    componentDidMount() {
        if (this.props.userId !== null && this.props.userId !== undefined) {
            this.updateBalance();
        }
    }


    onSendToChange(event) {
        this.setState({sendTo: event.target.value});
    }

    onAmountToSendChange(event) {
        this.setState({amountToSend: event.target.value});
    }


    async transferMoney() {

        if (this.props.userId === null || this.props.userId === undefined) {
            return;
        }

        const url = "/api/transfers";

        const payload = {to: this.state.sendTo, amount: this.state.amountToSend};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }


        if (response.status === 401) {
            this.setState({errorMsg: "Invalid userId/password"});
            return;
        }

        if (response.status !== 204) {
            this.setState({errorMsg: "Error when connecting to server: status code " + response.status});
            return;
        }

        this.updateBalance();
    }

    async updateBalance() {

        if (this.props.userId === null || this.props.userId === undefined) {
            return;
        }

        const url = "/api/balance";

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            this.setState({
                errorMsg: "ERROR when retrieving balance: " + err,
                balance: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                errorMsg: null,
                balance: payload.balance
            });
        } else {
            /*
                Here, if we get a 401, could happen if the session did timeout.
                We could automatically redirect to Login page.
             */
            this.setState({
                errorMsg: "Issue with HTTP connection: status code " + response.status,
                balance: null
            });
        }
    }

    renderLoggedIn() {
        return (
            <div>

                <p>Your balance is currently: {this.state.balance}</p>

                <p>Transfer money</p>

                <form method={"post"} action={"/api/transfers"}>

                    To: <input type="text"
                               name="to"
                               value={this.state.sendTo}
                               onChange={this.onSendToChange}/>
                    <br/>

                    Amount: <input type="text"
                                   name="amount"
                                   value={this.state.amountToSend}
                                   onChange={this.onAmountToSendChange}/>
                    <br/>


                    <div className="btn" onClick={this.transferMoney}>Transfer (AJAX)</div>
                    <button  className="btn">Transfer (Form)</button>
                </form>
            </div>
        );
    }

    renderNotLoggedIn() {
        return (
            <div>

                <p>
                    To be able to see your account you need to log in first.
                    If you do not have an account, you can sign up to create
                    a new one. You will receive 1000 free credits!!!
                </p>
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

        let error = <div></div>;
        if (this.state.errorMsg !== null) {
            //TODO css
            error = <div className="errorMsg"><p>{this.state.errorMsg}</p></div>
        }

        return (
            <div>
                <HeaderBar userId={this.props.userId}
                           updateLoggedInUserId={this.props.updateLoggedInUserId}/>

                <div>
                    <p className="header">Your Bank</p>
                </div>

                <div className="mainContent">
                    {pageContent}
                    {error}
                </div>
            </div>
        );
    }
}
