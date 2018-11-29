import React from "react";
import ReactDOM from "react-dom";
import {Connect4} from "./connect4";

const App = () => {
    return(
        <div>
            <h2>Connect Four Game</h2>
            <Connect4/>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));