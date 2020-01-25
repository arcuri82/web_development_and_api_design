/*
    Tests are run on NodeJS, which uses "require()" to handle modules and
    not "import"
 */
const index = require('../src/index.js');

/*
    With Jest included in package.json, and properly configured, then
    in these files we can use the method "test" to write unit tests.
    It takes 2 inputs:
    - the name of the test
    - a function that is going to be executed, representing the code
      of the test

    We use "expect(result).toBe(expectedValue)"
    to write check on whether the "result" we get from testing the code
    is the expected one. If it is not, then the test fails.
*/


test('Not a string', () => {
    expect(index.validateInput(1)).toBe(false);
});

test('Invalid character', () => {
    expect(index.validateInput("1 <")).toBe(false);
});



test('Single element', () => {
   expect(index.validateInput("1")).toBe(true);
});

test('Multi-elements', () => {
    expect(index.validateInput("1, 2")).toBe(true);
});

test('Negative value', () => {
    expect(index.validateInput("-1")).toBe(true);
});

test('Complex example', () => {
    expect(index.validateInput("   -1,2,   -3  , 1  ")).toBe(true);
});

