import React from "react";
import {Link} from 'react-router-dom'


export const Home = () => {
    return (
        <div>
            <h2>React Router Examples</h2>

            <div>
                <h4>React-Router Links</h4>
                <ul>
                    <li><Link to={"/"}>/</Link></li>
                    <li><Link to={"/first"}>/first</Link></li>
                    <li><Link to={"/second"}>/second</Link></li>
                    <li><Link to={"/doesNotExist"}>/doesNotExist</Link></li>
                </ul>
            </div>

            <div>
                <h4>Standard &lt;a&gt; Links</h4>
                <ul>
                    <li><a href={"/"}>/</a></li>
                    <li><a href={"/first"}>/first</a></li>
                    <li><a href={"/second"}>/second</a></li>
                    <li><a href={"/doesNotExist"}>/doesNotExist</a></li>
                </ul>
            </div>

            <div>
                <h4>Explanation</h4>
                TODO
            </div>


            <div>
                <h4>
                    NPM Commands
                </h4>
                <ul>
                    <li><strong>npm install webpack webpack-cli webpack-dev-server --save-dev</strong></li>
                    <li><strong>npm install react react-dom react-router-dom</strong></li>
                    <li><strong>npm install babel-core babel-loader babel-preset-react --save-dev</strong></li>
                </ul>
            </div>
        </div>
    );
};