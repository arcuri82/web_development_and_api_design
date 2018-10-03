import React from "react";
import openSocket from 'socket.io-client';

import {Board} from "./board";
import {OpponentOnline} from "./opponent-online";
import BoardState from "../../shared/board-state";

export class OnlineMatch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matchId: null,
            opponentId: null,
            errorMsg: null
        };

        this.refToBoard = React.createRef();
        this.opponent = new OpponentOnline();
        this.startNewMatch = this.startNewMatch.bind(this);
    }

    componentDidMount() {

        /*
            Every time we enter in this page, we open a WebSocket, and
            close it when we leave.
         */

        const userId = this.props.userId;
        if (userId === null) {
            this.setState({errorMsg: "You should log in first"});
            return;
        }

        this.socket = openSocket(window.location.origin);

        /*
            Here, we register a callback. Every time the server is sending
            a message with topic "update", such callback is executed
         */
        this.socket.on("update",  (dto) => {

            if (dto === null || dto === undefined) {
                this.setState({errorMsg: "Invalid response from server."});
                return;
            }

            if (dto.error !== null && dto.error !== undefined) {
                this.setState({errorMsg: dto.error});
                return;
            }

            const data = dto.data;

            /*
                Info about the game: eg the unique match id, and
                the id of the opponent
             */
            this.setState({
                matchId: data.matchId,
                opponentId: data.opponentId
            });

            this.opponent.setMatchId(data.matchId);

            /*
                After the opponent has done its move, or this is the
                first one, we update the state of the board.
                The state of the board in the client (ie the Browser) is
                only used to display (eg building the HTML).
                The actual state that matters is the one on the server.
                Each time a client does an action, the server must verify that
                the action is valid, and a user is not trying to cheat.
             */
            const boardCmp = this.refToBoard.current;
            boardCmp.setIsX(data.isX); //who is starting is decided by the server
            boardCmp.setBoardState(new BoardState(data.boardDto));
        });

        /*
            This happens when the socket is closed, either by the client, or
            the server.
         */
        this.socket.on('disconnect', () => {
            this.setState({errorMsg: "Disconnected from Server."});
        });


        this.opponent.setSocket(this.socket);

        /*
            Once a WebSocket is established, we need to authenticate it.
            Once authenticated, we can ask the server to start a new match.
         */
        this.doLogInWebSocket(userId).then(
            this.startNewMatch
        );
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    async startNewMatch() {

        /*
            When we try to start a new match, the current one (if any)
            should be deleted.
         */
        this.setState({
            matchId: null,
            opponentId: null,
            errorMsg: null
        });

        const url = "/api/matches";

        let response;

        try {
            response = await fetch(url, {
                method: "post"
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }


        if (response.status === 401) {
            //this could happen if the session has expired
            this.setState({errorMsg: "You should log in first"});
            this.props.updateLoggedInUserId(null);
            return;
        }

        if (response.status !== 201 && response.status !== 204) {
            this.setState({errorMsg: "Error when connecting to server: status code " + response.status});
            return;
        }
    };


    async doLogInWebSocket(userId) {

        /*
            WebSockets do not have direct support for authentication.
            So, here we first do an authenticated AJAX call to get a unique
            token associated with the current logged in user via the session
            cookie. Then, we emit such tokens on the WS connection to tell the
            server that such connection is coming from the logged in user, and
            not someone else.
            Note: this works because there is going to be a different WS socket
            on the server for each user.
         */

        const url = "/api/wstoken";

        let response;

        try {
            response = await fetch(url, {
                method: "post"
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }


        if (response.status === 401) {
            //this could happen if the session has expired
            this.setState({errorMsg: "You should log in first"});
            this.props.updateLoggedInUserId(null);
            return;
        }

        if (response.status !== 201) {
            this.setState({errorMsg: "Error when connecting to server: status code " + response.status});
            return;
        }

        const payload = await response.json();

        this.socket.emit('login', payload);
    };


    render() {

        if (this.state.errorMsg !== null) {
            return <div><p>[FAILURE] {this.state.errorMsg}</p></div>
        }

        if (this.state.matchId === null) {

            return <div><h3>Searching for a worthy opponent</h3></div>
        }

        return (
            <div>
                <Board ref={this.refToBoard}
                       opponent={this.opponent}
                       title={"Match against " + this.state.opponentId}
                       newMatchHandler={this.startNewMatch}
                />
            </div>
        );
    }
}
