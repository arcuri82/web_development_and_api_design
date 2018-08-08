import React from "react";
import ReactDOM from "react-dom";
import {Connect4} from "./connect4";

const App = () => {
    return(
        <div>
            <h2>Connect Four Game</h2>
            <Connect4/>

            <div>
                <h4>
                    NPM Commands
                </h4>
                <ul>
                    <li><strong>npm install webpack webpack-cli webpack-dev-server --save-dev</strong></li>
                    <li><strong>npm install react react-dom</strong></li>
                    <li><strong>npm install babel-core babel-loader  babel-preset-react  --save-dev</strong></li>
                    <li><strong>npm install jest babel-jest babel-preset-es2015 --save-dev</strong></li>
                    <li><strong>npm install react-addons-test-utils enzyme enzyme-adapter-react-16 --save-dev</strong></li>
                </ul>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));