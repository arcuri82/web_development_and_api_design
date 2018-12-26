import React from "react";
import ReactDOM from "react-dom";
import {Container} from "./container";

const App = () => {

    return(
        <div>
            <h2>Example of Shared State Lifted Up in Ancestor Components</h2>
            <Container ncounters={3}/>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));