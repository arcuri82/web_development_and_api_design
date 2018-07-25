const {Board} = require('../src/board.js');

class FakeRenderer{
    reset() {}
    updateCell(index, value){}
    updateStatus(message){}
}

test('Empty board', () => {

    const board = new Board(new FakeRenderer());

    expect(board.isVictory()).toBe(false);
});


test('X wins', () => {

    const board = new Board(new FakeRenderer());

    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    /*
        XXX
        OO-
        ---
     */

    //X
    board.selectCell(0);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    //O
    board.selectCell(3);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    //X
    board.selectCell(1);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    //O
    board.selectCell(4);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    //X
    board.selectCell(2);
    expect(board.doesXWin()).toBe(true); //X wins
    expect(board.doesOWin()).toBe(false);
});


test('O wins', () => {

    const board = new Board(new FakeRenderer());

    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    /*
        XX-
        OOO
        X--
     */

    //X
    board.selectCell(0);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    //O
    board.selectCell(3);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    //X
    board.selectCell(1);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    //O
    board.selectCell(4);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    //X
    board.selectCell(6);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(false);

    //O
    board.selectCell(5);
    expect(board.doesXWin()).toBe(false);
    expect(board.doesOWin()).toBe(true); // O wins
});


