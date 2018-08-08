import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Switch, Route} from 'react-router-dom'

import {Home} from "./home";
import {First} from "./first";
import {Second} from "./second";
import {NotFound} from "./not_found";

const App = () => {

    const hasHash = window.location.href.indexOf("#") >= 0;


    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/first" component={First}/>
                    <Route exact path="/second" component={Second}/>
                    <Route exact path="/" component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));