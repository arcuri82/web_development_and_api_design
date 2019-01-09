import React from "react";
import {Link} from 'react-router-dom'

//Note the use of "alias" in webpack.config.js to handle "~"
import {MyHomeLink} from "~/my_home_link";


export const Home = () => {

    return(
        <div>
            <h2>Which Game Do You Want to Play?</h2>

            <ul>
                <li><Link to={"/silly"}>Silly</Link></li>
                <li><Link to={"/cards"}>Cards</Link></li>
            </ul>
        </div>
    );
};