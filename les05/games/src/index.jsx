import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Home} from "./home";
import {Silly} from "./games/silly/silly";
import {Cards} from "./games/cards/cards";
import {NotFound} from "./not_found";

import "./style.css"

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/silly" component={Silly}/>
                    <Route exact path="/cards" component={Cards}/>
                    <Route exact path="/" component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));