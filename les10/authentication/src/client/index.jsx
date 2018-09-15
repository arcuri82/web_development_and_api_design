import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Home} from "./home";
import {Login} from "./login";
import {SignUp} from "./signup";


export class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userId: null
        };

        this.updateLoggedInUserId = this.updateLoggedInUserId.bind(this);
    }

    updateLoggedInUserId (userId) {
        this.setState({userId: userId});
    }

    isLoggedIn(){
        return this.state.userId !== null;
    }

    notFound(){

        return(
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );

    };

    render(){


        return(
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props} userId={this.state.userId}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props} userId={this.state.userId}/>}/>
                        <Route exact path="/"
                               render={props => <Home {...props} userId={this.state.userId}/>}/>
                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}