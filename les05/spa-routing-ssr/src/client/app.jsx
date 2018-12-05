import React from "react";
import {Switch, Route} from 'react-router-dom'

import {Home} from "./home";
import {First} from "./first";
import {Second} from "./second";
import {NotFound} from "./not_found";


export const App = () => {

    return (
        <div>
            <Switch>
                <Route exact path="/first" component={First}/>
                <Route exact path="/second" component={Second}/>
                <Route exact path="/" component={Home}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    );

};