import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Home} from "./home";
import {First} from "./first";
import {Second} from "./second";
import {NotFound} from "./not_found";

const App = () => {

    return (
        <BrowserRouter>
            {/*
                To use React-Router, the root component needs to be inside a BrowserRouter.
                Then, we have a Switch, which is the same concept of "switch" in programming
                languages (ie, equivalent to a chain of if/else).
                Only one single Route will be active. Those are checked in order, from top
                to bottom, based on the "path" attribute.
                If such value does match the path element of the URL in the address bar of
                the browser, then the "component" will be rendered in the switch, whereas all
                the others will be ignored.

                If for any reason you need to pass some properties to the rendered components,
                then instead of using "component" (which does not accept JSX), you need to
                use "render". This takes as input a function, whose input itself is the props
                of this component (ie App), if any
            */}
            <div>
                <Switch>
                    <Route exact path="/first" component={First}/>
                    <Route exact path="/second" render={(props) => <Second />}/>
                    <Route exact path="/" component={Home}/>
                    {/*
                        Note that this last Route has no "path". If there was no match
                        in any of the previous Route's paths, then this last one will
                        act as "default"
                    */}
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));