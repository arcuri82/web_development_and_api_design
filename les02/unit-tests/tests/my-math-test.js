const math = require('../src/my-math.js');


const array = [8,1,5,1,1,2,3];

test('Min', () => {
    expect(math.computeMin(array)).toEqual(1);
});


test('Max', () => {
    expect(math.computeMax(array)).toEqual(8);
});

test('Mean', () => {
    expect(math.computeMean(array)).toEqual(3);
});

test('Sum', () => {
    expect(math.computeSum(array)).toEqual(21);
});