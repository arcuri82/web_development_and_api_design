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
                <p>
                    Here we do dynamic routing with <em>React-Router</em>.
                    However, we do not use # anymore (although we could).
                    The problem is with Search Engine Optimization (SEO),
                    where your site would just look like a single page.
                    And not all crawlers have full support for JS.
                    In other words, you do not want your website to never
                    appear on search engines.
                </p>
                <p>
                    We will then use regular URL paths, like for example <em>/first</em>.
                    JS will still handle it with no problem.
                    There is a catch though.
                    If you bookmark the page and access it later, or send it as a link to
                    someone else, you will get a 404 error.
                    A simple way to see it is to go to <Link to={"/first"}>/first</Link> and
                    then press refresh in the browser.
                    This will give you an error.
                    Why?
                    Because the browser will do a HTTP request to  <em>/first</em>, which
                    does not exist.
                    The JS code to handle dynamic routing is on the home <em>/</em>.
                    There are two possible solutions: either instruct the server to always
                    return <em>/</em> for unknown static resources (which anyway will lead to correct
                    client-side rendering based on URL change in the browser), or extend
                    your web application to also do server-side rendering (if your backend
                    can run JS).
                </p>
                <p>
                    It is interesting to look at the resource <em>/doesNotExist</em>, which
                    does not exist.
                    Check the difference between accessing it via a React Link and a regular
                    &lt;a&gt; tag.
                    In both cases we get an error, but it is quite different.
                </p>
                <p>
                    Another interesting thing to notice is how <em>React-Router</em> decides
                    to represent its own dynamic links.
                    Look at the generated HTML source from the Developer Tools.
                    These will be regular &lt;a&gt; tags with valid <em>href</em> elements.
                    However, their default behavior is overridden with JS (so they do not do
                    HTTP calls once clicked).
                    Why? Because then even clients that do not use JS can follow those links
                    (as long as you enable server-side rendering).
                    Again, this is important for SEO and search engine web crawlers.
                </p>
            </div>
        </div>
    );
};