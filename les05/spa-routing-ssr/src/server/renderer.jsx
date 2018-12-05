import React from "react";
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {App} from "../client/app"


export const serverSideRender = (url) => {

    /*
        Here must use StaticRouter instead of BrowserRouter, as we
        are not in a browser
     */
    const content = renderToString(
        <StaticRouter context = {{}} location={url}>
            <App/>
        </StaticRouter>
    );

    const html = `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="style.css"/>
            <title>React Router Examples With Server-Side-Rendering (SSR)</title>
        </head>
        <body>

        <div id="root">${content}</div>

        <script src="bundle.js"></script>

        </body>
    </html>
    `;

    return html;
};