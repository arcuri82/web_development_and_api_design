import React from "react";
import ReactDOM from "react-dom";

import {Current} from "./current";
import {Forecast} from "./forecast";

const API_KEY = "bde08c38dcc24dfbffc449466cea7e44";

const App = () => {
    return(
        <div>
            <h2>Weather App</h2>
            <div class="mainCitys">
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
