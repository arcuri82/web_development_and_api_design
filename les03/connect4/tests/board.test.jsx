// const React = require('react');
// const jsdom = require('jsdom');
// const Adapter = require('enzyme-adapter-react-16');
//
// const { mount, configure } = require('enzyme');
// configure({ adapter: new Adapter() });
//
// global.document = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
// global.window = document.defaultView;
// global.navigator = {userAgent: 'node.js'};


const {Board} = require("../src/board");
const React = require('react');
const { mount } = require('enzyme');



test("Visualize board", ()=> {

    const wrapper = mount(<Board isGameOn={true}/>);

    const divs = wrapper.find('.cell');

    expect(divs.length).toEqual(42);
});