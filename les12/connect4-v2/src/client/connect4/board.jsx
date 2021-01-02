import React from "react";
import BoardState from '../../shared/board-state';

export class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getDefaultState();
    }

    getDefaultState() {

        //choose at random whether starting or not. X starts first.
        const isX = Math.random() >= 0.5;

        return {
            board: new BoardState(),
            posToInsert: null,
            isX: isX,
            needHandleOpponent: ! isX,
            lastInsertedColumn: null
        };
    }


    resetBoard = () => {
        this.setState(this.getDefaultState());
    };

    getBoardState(){
        return this.state.board;
    }

    setBoardState(board){
        this.setState({board: board})
    }

    setIsX(b){
        this.setState({isX: b});
    }

    playerIsNext() {
        return this.state.isX === this.state.board.isXandNotO()
            && !this.state.board.isGameFinished()
    }

    selectCell = (row, column) => {

        if (!this.state.board.isFreeCell(row, column)) {
            //already selected
            return;
        }

        if (!this.playerIsNext()) {
            //not the player turn
            return;
        }

        this.setState(prevState => {

            const copy = prevState.board.copy();
            copy.selectColumn(column);

            return {
                board: copy,
                needHandleOpponent: true,
                lastInsertedColumn: column
            };
        });
    };

    /*
        React life-cycle method called after component is re-rendered
        due to state change
     */
    componentDidUpdate(prevProps,prevState){
        if(this.state.needHandleOpponent){
            this.handleOpponent();
        }
    }

    componentDidMount(){
        if(this.state.needHandleOpponent){
            this.handleOpponent();
        }
    }

    /*
        Once we do our move, we need to wait for the opponent to do its move.
        To do that, we need to inform the opponent's object to play the next
        move.
        This needs to be done only once per turn.
        However, if it is the opponent which is starting, we still need to handle
        this code. And that is the reason why we call it even from the mounting
        of the component when the current user has not done any action yet.
     */
    handleOpponent = () => {
        this.setState({needHandleOpponent: false});

        this.props.opponent.playNext(this.state.lastInsertedColumn, this);
    };

    renderCell(row, column) {

        const board = this.state.board;
        const v = board.cells[row][column];

        let style = {cursor: "default"};
        let handler = null;

        if (board.isFreeCell(row, column) && this.playerIsNext()) {
            style = {cursor: "pointer"};
            handler = () => this.selectCell(row, column);
        }

        let highlight = "";

        const toInsert = this.state.posToInsert;

        if (this.playerIsNext()
            && toInsert
            && toInsert[0] === row
            && toInsert[1] === column) {

            highlight = "cell-to-insert";
        }

        /*
            If the game is finished in a Win/Defeat, we are going to display the
            winning 4 cells with a different color, based on whether we won or lost.
         */
        const winningPos = board.winningPositions;
        if (winningPos) {

            const won = this.state.isX ? board.result === 1 : board.result === 2;

            if (winningPos.findIndex(e => e[0] === row && e[1] === column) >= 0
            ) {
                if (won) {
                    highlight = "cell-victory";
                } else {
                    highlight = "cell-defeat";
                }
            }
        }

        return (
            <div className={"cell " + highlight}
                 key={"unique_cell_key_row_" + row + "_column_" + column}
                 style={style}
                 onClick={handler}
                 onMouseEnter={() => this.onMouseEnterCell(row, column)}
                 onMouseLeave={() => this.onMouseLeaveCell(row, column)}
            >
                {v}
            </div>
        );
    }

    /*
        Handle having special color to represent on which row a new coin
        will be inserted when we click on a column.
     */
    onMouseEnterCell = (row, column) => {

        const bottomRow = this.state.board.findBottom(column);

        this.setState({posToInsert: [bottomRow, column]});
    };

    onMouseLeaveCell = (row, column) => {

        this.setState(prevState => {
            if (prevState.posToInsert === null) {
                //nothing to do
                return;
            }
            if (prevState.posToInsert[1] === column) {
                return {posToInsert: null};
            } else {
                /*
                    Here, we handle possible case in which
                    entering column X is handled before leaving Y.
                    If we leave column Y and currently the state
                    is for X, then we should do nothing.
                 */
                return;
            }
        });
    };

    renderRow(row) {
        return (
            <div className={"cell-row"} key={"unique_row_key_" + row}>
                {this.state.board.cells[row].map((e, i) => this.renderCell(row, i))}
            </div>
        );
    }

    renderIndex(index) {
        return (
            <div className={"index"} key={"unique_index_key_" + index}>{index}</div>
        );
    }

    getInfoMessage(res) {

        const board = this.state.board;
        const won = this.state.isX ? board.result === 1 : board.result === 2;
        const lost = this.state.isX ? board.result === 2 : board.result === 1;

        let msg;
        if (res === 0) {
            const label = this.state.board.nextLabelToPlay();
            if(this.playerIsNext()){
                msg = "Your turn. Playing " + label;
            } else {
                msg = "Opponent's turn. Playing " + label;
            }
        } else if (won) {
            msg = "You Won! Well Done!"
        } else if (lost) {
            msg = "You Lost!"
        } else if (res === 3) {
            msg = "The Game Ended in a Tie!"
        } else if (res === 4) {
            msg = "The opponent has forfeited. You won the game!"
        }else {
            throw "Invalid result code: " + res;
        }

        return msg;
    }


    render() {

        const msg = this.getInfoMessage(this.state.board.result);

        const handler = this.props.newMatchHandler ? this.props.newMatchHandler : this.resetBoard;

        return (
            <div>
                <h2>{this.props.title}</h2>
                {this.state.board.cells.map((e, i) => this.renderRow(i))}
                {Array.from(Array(7)).map((e, i) => this.renderIndex(i))}

                <div className="game-info">
                    <div className="status">{msg}</div>
                    <div className="btn" onClick={handler}>New Match</div>
                </div>
            </div>
        );
    }
}
