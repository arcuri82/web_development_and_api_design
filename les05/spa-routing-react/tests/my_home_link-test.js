import React from "react";

const {mount} = require('enzyme');
import {MyHomeLink} from "../src/my_home_link";
import {Route, MemoryRouter} from 'react-router-dom';


test("Click link", () => {

    const driver = mount(
        <MemoryRouter>
            {/*
                    As it uses a Link, must be mounted inside a Route.
                 */}
            <Route component={MyHomeLink}/>
        </MemoryRouter>
    );

    /*
        WARNING: the use of "find" in Enzyme is very counter-intuitive...
        If you read the docs, you might expect it to return a wrapper to manipulate and
        interact with the DOM... well, it does, but it "may" also add other internal non-DOM
        nodes, like internal details of React that are not part of the rendered HTML (WTF!?!)...
        So, we need to filter them out with "hostNodes".
        See: https://github.com/enzymejs/enzyme/issues/836
     */
    const link = driver.find('#homeLink').hostNodes();

    expect(link).toBeDefined();

    /*
        Note: it can be possible to test that, when the link is clicked, the URL is changed properly.
        But it is bit messy to setup. And, anyway, routing between pages is more something to
        test in an E2E (End-to-End) test rather than the component testing that we do here.
     */
});