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

        /*
            As whether we are logged in or not will impact the rendering of
            all pages, such state info as to be stored here in the root component.
            If a user is logged in, then we stored its userId here.
            A null value means the user is not logged in.
         */

        this.state = {
            userId: null
        };
    }

    /*
        Whether we are logged in or not depends on the session cookie.
        That is what is sent to the server at each HTTP request.
        If missing, we will get a 401 status code error.
        It could happen that, when this component is mounted, there is
        already a valid cookie.
        A simple example is when we manually refresh the page from the browser:
        the component will be re-mounted with new state (and so userId is null),
        although we have a valid cookie.
        So, here we do a AJAX call to the server. If such call is authenticated,
        then will we get the user id, and so update the componet's state.
     */
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
           //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();
            this.updateLoggedInUserId(payload.userId);
        }
    };

    updateLoggedInUserId = (userId) => {
        this.setState({userId: userId});
    };


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
        /*
            When we have a switch, to have a component for a page we just use
            the attribute "component".
            However, if we need to pass some props to the component, we need
            to use the attribute "render".
         */

        return (
            <BrowserRouter>
                <div>
                    <HeaderBar userId={this.state.userId}
                               updateLoggedInUserId={this.updateLoggedInUserId}/>
                    <Switch>
                        <Route exact path="/match/ai" component={AiMatch}/>
                        <Route exact path="/match/online"
                               render={props => <OnlineMatch {...props} userId={this.state.userId}
                                                             updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
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
