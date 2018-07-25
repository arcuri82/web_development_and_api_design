const X = "X";
const O = "O";


export class Board {

    constructor(renderer) {
        this.cells = Array(9);
        this.renderer = renderer;

        this.reset();
    }

    reset() {
        this.cells.fill(null);
        this.counter = 0;
        this.renderer.reset();
        this.renderer.updateStatus("Next Player: " + (this.isXandNotO() ? X : O));
    }

    selectCell(index) {
        if (this.cells[index] !== null || this.isVictory()) {
            //nothing to do
            return;
        }

        const value = this.isXandNotO() ? X : O;
        this.cells[index] = value;
        this.renderer.updateCell(index, value);

        //is victory?
        if (this.doesXWin()) {
            this.renderer.updateStatus("X Won!");
        } else if (this.doesOWin()) {
            this.renderer.updateStatus("O Won!");
        } else if(this.counter >= 8){
            this.renderer.updateStatus("The Game Ended in a Tie!");
        } else {
            this.renderer.updateStatus("Next Player: " + (this.isXandNotO() ? O : X));
        }

        this.counter++;
    }

    isVictory() {
        return this.doesXWin() || this.doesOWin();
    }

    doesXWin() {
        return this.doesWin(X);
    }

    doesOWin() {
        return this.doesWin(O);
    }

    doesWin(value) {

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (this.cells[line[0]] === value
                && this.cells[line[1]] === value
                && this.cells[line[2]] === value) {
                return true;
            }
        }

        return false;
    }

    isXandNotO() {
        return (this.counter % 2) === 0;
    }
}

