import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Home} from "./home";
import {User} from "./user";
import {News} from "./news";

const NotFound = () => {

    return (
        <div>
            <h2>NOT FOUND: 404</h2>
            <p>
                ERROR: the page you requested in not available.
            </p>
        </div>
    );
};

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/user" component={User}/>
                    <Route exact path="/news" component={News}/>
                    <Route exact path="/" component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));