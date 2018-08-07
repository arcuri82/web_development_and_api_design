const React = require('react');
const { mount } = require('enzyme');
const {Board} = require("../src/board");

/*
    Useful links:

    https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md
    https://www.w3schools.com/cssref/css_selectors.asp
 */

test("Visualize board", ()=> {

    const driver = mount(<Board isGameOn={true}/>);

    const divs = driver.find('.cell');

    expect(divs.length).toEqual(42);
});


const clickTopRow = function(driver, column){

    const div = driver.find('.cell').at(column);

    div.simulate('click');
};

test("X wins horizontal", () => {

    let result = 0;

    let handler = (r,x) => {result = r;};

    const driver = mount(<Board isGameOn={true} resultHandler={handler}/>);

    expect(result).toBe(0); //game is on

    clickTopRow(driver, 0); // X
    clickTopRow(driver, 0); // O

    clickTopRow(driver, 1);
    clickTopRow(driver, 1);

    clickTopRow(driver, 2);
    clickTopRow(driver, 2);

    expect(result).toBe(0); // game still on

    clickTopRow(driver, 3);

    /*
       ooo
       xxxx
     */

    expect(result).toBe(1); // X won
});


test("O wins horizontal", () => {

    let result = 0;

    let handler = (r,x) => {result = r;};

    const driver = mount(<Board isGameOn={true} resultHandler={handler}/>);

    expect(result).toBe(0); //game is on

    clickTopRow(driver, 6); // X
    clickTopRow(driver, 0); // O

    clickTopRow(driver, 6); // X in column up to 3
    clickTopRow(driver, 1);

    clickTopRow(driver, 6);
    clickTopRow(driver, 2);

    clickTopRow(driver, 5); // X not winning

    expect(result).toBe(0); // game still on

    clickTopRow(driver, 3);

    /*
              x
              x
        0000 xx
     */

    expect(result).toBe(2); // Y won
});



test("X wins vertical", () => {

    let result = 0;

    let handler = (r,x) => {result = r;};

    const driver = mount(<Board isGameOn={true} resultHandler={handler}/>);

    expect(result).toBe(0); //game is on

    clickTopRow(driver, 0); // X
    clickTopRow(driver, 1); // O

    clickTopRow(driver, 0);
    clickTopRow(driver, 1);

    clickTopRow(driver, 0);
    clickTopRow(driver, 1);

    expect(result).toBe(0); // game still on

    clickTopRow(driver, 0);

    /*

        x
        xo
        xo
        xo
     */

    expect(result).toBe(1); // X won
});


test("X wins up diagonal", () => {

    let result = 0;

    let handler = (r,x) => {result = r;};

    const driver = mount(<Board isGameOn={true} resultHandler={handler}/>);

    expect(result).toBe(0); //game is on

    clickTopRow(driver, 0); // X
    clickTopRow(driver, 1); // O

    clickTopRow(driver, 1);
    clickTopRow(driver, 2);

    clickTopRow(driver, 2);
    clickTopRow(driver, 3);

    clickTopRow(driver, 2);
    clickTopRow(driver, 3);

    clickTopRow(driver, 3);
    clickTopRow(driver, 0);

    expect(result).toBe(0); // game still on

    clickTopRow(driver, 3);

    /*
           x
          xx
        oxxo
        xooo
     */

    expect(result).toBe(1); // X won
});


test("O wins down diagonal", () => {

    let result = 0;

    let handler = (r,x) => {result = r;};

    const driver = mount(<Board isGameOn={true} resultHandler={handler}/>);

    expect(result).toBe(0); //game is on

    clickTopRow(driver, 1); // X
    clickTopRow(driver, 0); // O

    clickTopRow(driver, 2);
    clickTopRow(driver, 3);

    clickTopRow(driver, 1);
    clickTopRow(driver, 1);

    clickTopRow(driver, 0);
    clickTopRow(driver, 2);

    clickTopRow(driver, 0);

    expect(result).toBe(0); // game still on

    clickTopRow(driver, 0);

    /*
       o
       xo
       xxo
       oxxo
     */

    expect(result).toBe(2); // O won
});