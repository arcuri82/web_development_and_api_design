const {configure } = require('enzyme');
const jsdom = require('jsdom');
const Adapter = require('enzyme-adapter-react-16');


/*
    To be able to use Enzyme with Jest, we need this file, with this
    exact name.
    Here, we setup a virtual HTML page (on the server) in which our components
    will be "mounted" with Enzyme.
    JSDOM is used for such virtual pages on the server.
    Note the overriding of some global variables to point to JSDOM.
 */

function setUpDomEnvironment() {
    const { JSDOM } = jsdom;
    const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost/'});
    const { window } = dom;

    global.window = window;
    global.document = window.document;
    global.navigator = {userAgent: 'node.js'};
    copyProps(window, global);
}

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}

setUpDomEnvironment();

configure({ adapter: new Adapter() });
