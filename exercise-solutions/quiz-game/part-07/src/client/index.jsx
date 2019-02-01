import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Match} from "./match";
import {Home} from "./home";


const notFound = () => {
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
                    <Route exact path="/match" component={Match}/>
                    <Route exact path="/" component={Home}/>
                    <Route component={notFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};


ReactDOM.render(<App/>, document.getElementById("root"));


