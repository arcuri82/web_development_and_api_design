import React from "react";
import {Link} from 'react-router-dom'


export const Home = () => {
    return (
        <div>
            <h2>React Router Examples With Server-Side-Rendering (SSR)</h2>

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

                <p>
                    First of all, now not only we need to build
                    the client (i.e., <b>yarn build:client</b> to generate the <em>bundle.js</em> file),
                    but we also need to build the server (i.e., <b>yarn build:server</b>).
                    Point is, from the server we are going to call JSX code, which cannot be run directly (recall
                    that JSX is <b>NOT</b> JavaScript).
                    So, we first need to use <em>Babel</em> to transpile all needed files into a new folder (e.g.,
                    called <em>build</em>), having <em>only</em> valid JavaScript code (no JSX).
                    Then, we start the server from this build folder (i.e., <b>yarn start</b>).
                </p>
                <p>
                    Now, the homepage at "<b>/</b>" is always going to be rendered on the server first on the server.
                    Every time we request a page that is dynamic and does not exist in the <em>public</em> folder,
                    then we render it on the server (including 404 error pages).
                    With the Developer Tools opened, follow the &lt;a&gt; links, and verify that the correct
                    full page is returned in the HTTP body responses.
                    However, still when using React Links no request should be made to the server, unless
                    you are refreshing the page.
                </p>
                <p>
                    From the Developer Tools, now <em>disable</em> JavaScript.
                    <em> The app should still work just fine</em>,
                    both for React and &lt;a&gt; links.
                    It simply makes a new HTTP call for every single link click, getting a new HTML page each time.
                </p>
                <p>
                    Note however that this is just a simple example.
                    To have a fully isomorphic page, there are more details that need to be handled,
                    like initial JS state and async HTTP requests on page load (which would have to be
                    handled on the server).
                </p>
            </div>
        </div>
    );
};