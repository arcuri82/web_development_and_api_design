const utils = require("../src/utils");


test("Create matrix", () => {

    const r = 2;
    const c = 3;
    const v = "foo";

    const m = utils.createMatrix(r, c, v);

    expect(m.length).toEqual(r);

    for(let i=0; i<r; i++){

        expect(m[i].length).toEqual(c);

        for(let j=0; j<c; j++){
            expect(m[i][j]).toEqual(v);
        }
    }
});


test("Clone matrix", () =>{

    const before = "before";
    const after = "after";

    const m = utils.createMatrix(4, 7, before);
    const copy = utils.cloneMatrix(m);

    expect(copy[2][3]).toEqual(before);

    copy[2][3] = after;

    expect(copy[2][3]).toEqual(after);

    //if deep-cloning, m must not have changed
    expect(m[2][3]).toEqual(before);
});