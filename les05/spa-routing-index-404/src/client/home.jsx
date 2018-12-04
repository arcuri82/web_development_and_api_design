import React from "react";
import {Link} from 'react-router-dom'


export const Home = () => {
    return (
        <div>
            <h2>React Router Examples With 404 Rather Returning <em>index.html</em> Content</h2>

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
                    First of all, so far we have been using WebPack as a HTTP server.
                    Which is fine for debugging/development, but not for production.
                    So, here we start to use <em>NodeJS</em> to serve files.
                    We need to first create the <em>bundle.js</em> file for the frontend,
                    and then start <em>NodeJS</em>.
                </p>
                <p>
                    Here, our configuration for <em>NodeJS</em> is rather simple: we just
                    need to tell it where to find the static files (e.g., HTML, CSS and JS) to serve,
                    and what to do in case of <em>not-found</em> resource.
                    Instead of doing a 404, we do return the content of <em>index.html</em>.
                    <em>Why???</em>
                    The trick here is that then the browser can re-render the page correctly based on
                    URL address bar.
                </p>
                <p>
                    With the Developer Tools opened, follow the React Links.
                    Pages should be correctly displayed, with no HTTP request to the server.
                    Now, do the same for the &lt;a&gt; links.
                    The pages are still correctly displayed, but new HTTP calls are made, in which
                    the body payload of the response contains the HTML of <em>index.html</em>.
                </p>
                <p>
                    From the Developer Tools, disable the use of JavaScript.
                    Follow any link, either React Links or &lt;a&gt; links: should get the same
                    result, i.e. an empty page, with no error.
                    Recall that React Links are still rendered as &lt;a&gt; tags, but with overridden
                    JavaScript <em>onClick()</em> handlers.
                    So, we get back the basic <em>index.html</em> page.
                    But its content does not get populated, as <em>bundle.js</em> is not executed.
                </p>
            </div>
        </div>
    );
};