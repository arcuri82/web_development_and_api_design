import React from "react";
import HeaderBar from "./headerbar";

export class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            balance: null,
            errorMsg: null
        };

        this.transferMoney = this.transferMoney.bind(this);
    }

    componentDidMount(){
        if (this.props.userId !== null && this.props.userId !== undefined) {
            this.updateBalance();
        }
    }

    async transferMoney() {

        if (this.props.userId === null && this.props.userId === undefined) {
            return;
        }

        //TODO


        this.updateBalance();
    }

    async updateBalance(){

        if (this.props.userId === null && this.props.userId === undefined) {
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
                To: <input type="text" id="toId" className="input"/><br/>
                Amount: <input type="text" id="amountId"/><br/>
                <div className="btn" onClick={this.transferMoney}>Transfer</div>
            </div>

        //    TODO: with AJAX and with Form
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

        return (
            <div>
                <HeaderBar userId={this.props.userId}
                           updateLoggedInUserId={this.props.updateLoggedInUserId}/>

                <div>
                    <p className="header">Your Bank</p>
                </div>

                <div className="mainContent">
                    {pageContent}
                </div>
            </div>
        );
    }
}