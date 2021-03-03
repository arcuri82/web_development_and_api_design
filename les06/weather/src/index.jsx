import React from "react";
import ReactDOM from "react-dom";

import {Current} from "./current";
import {Forecast} from "./forecast";

/*
    We are going to use a third-party REST API from the network.
    You need to be connected to internet to get this example working,
    as we will need to connect to http://api.openweathermap.org

    Furthermore, to use such API, we need to be registered as a user.
    Every time we access the API, we need to send an authentication token,
    representing who we are.
    It is not uncommon for APIs to have "rate-limits" to the number of calls
    you can do. If you want to do more calls, you need to pay.

    It comes without saying that, if you want to build your own app that
    does access http://api.openweathermap.org, you should register a new
    user and use a different key, instead of the following.

    WARNING: it is a bad practice to have API keys on GitHub, as anyone can steal them...
    so, don't do it for your APIs... but here this one is here just for simplicity, and as it
    is not paid, not a big deal if it get stolen...
 */
const API_KEY = "bde08c38dcc24dfbffc449466cea7e44";

const App = () => {
    return(
        <div>
            <h2>Weather App</h2>
            <div className="mainCities">
                Weather in main cities:<br/>
                <Current city={"Oslo"} apiKey = {API_KEY}/><br/>
                <Current city={"Bergen"} apiKey = {API_KEY}/><br/>
                <Current city={"Stavanger"} apiKey = {API_KEY}/><br/>
            </div>
            <Forecast apiKey = {API_KEY}/>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
