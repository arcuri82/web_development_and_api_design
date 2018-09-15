import React from "react";
import {Link} from 'react-router-dom';

import {HeaderBar} from "./headerbar";

export class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            balance: null,
            errorMsg: null
        };

        this.transferMoney = this.transferMoney.bind(this);
    }

    transferMoney() {
        //TODO
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
                <div>
                    <p className="header">Your Bank</p>
                </div>

                <div className="mainContent">

                    <HeaderBar userId={this.props.userId}/>
                    {pageContent}
                </div>
            </div>
        );
    }
}