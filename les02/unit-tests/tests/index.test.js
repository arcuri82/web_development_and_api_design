const index = require('../src/index.js');


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

