import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Home} from "./home";
import Login from "./login";
import SignUp from "./signup";
import {AiMatch} from "./connect4/ai-match";
import {OnlineMatch} from "./connect4/online-match";
import HeaderBar from "./headerbar";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null
        };

        this.updateLoggedInUserId = this.updateLoggedInUserId.bind(this);
    }

    componentDidMount(){
        this.checkIfAlreadyLoggedIn();
    }


    async checkIfAlreadyLoggedIn() {

        const url = "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            //that is ok
            this.updateLoggedInUserId(null);
            return;
        }

        if (response.status !== 200) {
            //TODO
        } else {
            const payload = await response.json();
            this.updateLoggedInUserId(payload.userId);
        }
    };

    updateLoggedInUserId(userId) {
        this.setState({userId: userId});
    }


    notFound() {
        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );
    };


    render() {
        return (
            <BrowserRouter>
                <div>
                    <HeaderBar userId={this.state.userId}
                               updateLoggedInUserId={this.updateLoggedInUserId}/>
                    <Switch>
                        <Route exact path="/match/ai" component={AiMatch}/>
                        <Route exact path="/match/online"
                               render={props => <OnlineMatch {...props} userId={this.state.userId}/>}/>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       userId={this.state.userId}
                                                       updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        userId={this.state.userId}
                                                        updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/"
                               render={props => <Home {...props} userId={this.state.userId}/>}/>
                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
