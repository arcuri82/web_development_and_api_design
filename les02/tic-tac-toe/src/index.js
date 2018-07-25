import {Board} from "./board"



class HtmlBoardRenderer{

    constructor(){

        this.statusDiv = document.getElementById("statusDisplayId");
        this.cellDivs = Array(9);

        for(let i=0; i<this.cellDivs.length; i++){
            this.cellDivs[i] = document.getElementById("cell_" + i);
        }

        this.reset();
    }


    reset() {

        for(let i=0; i<this.cellDivs.length; i++){
            this.updateCell(i, null);
        }

        this.updateStatus("");
    }


    updateCell(index, value){

        const div = this.cellDivs[index];

        if(value === null){
            div.innerHTML = "";
            div.style.cursor = "pointer";
        } else {
            div.innerHTML = value;
            div.style.cursor = "default";
        }
    }

    updateStatus(message){
        this.statusDiv.innerHTML = message;
    }
}


const renderer = new HtmlBoardRenderer();
const board = new Board(renderer);

const bindBoardEvents = function () {

    for(let i=0; i<renderer.cellDivs.length; i++){

        const div = renderer.cellDivs[i];
        div.onclick = () => {board.selectCell(i)};
    }
};

bindBoardEvents();


const initNewMatchBtn = function(){

    const btn = document.getElementById("newMatchBtnId");
    btn.onclick = () => board.reset();
};

initNewMatchBtn();
