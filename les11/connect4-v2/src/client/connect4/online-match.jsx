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
        this.opponent = new OpponentOnline(this.refToBoard);
    }

    componentDidMount() {

        const userId = this.props.userId;
        if (userId === null) {
            this.setState({errorMsg: "You should log in first"});
            return;
        }

        this.socket = openSocket(window.location.origin);

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

            this.setState({
                matchId: data.matchId,
                opponentId: data.opponentId
            });

            this.opponent.setMatchId(data.matchId);

            const boardCmp = this.refToBoard.current;
            boardCmp.setIsX(data.isX);
            boardCmp.setBoardState(new BoardState(data.boardDto));
        });

        this.socket.on('disconnect', () => {
            this.setState({errorMsg: "Disconnected from Server."});
        });


        this.opponent.setSocket(this.socket);

        this.doLogInWebSocket(userId).then(
            this.startNewMatch
        );
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    async startNewMatch() {
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
            this.setState({errorMsg: "You should log in first"});
            //TODO update logout
            return;
        }

        if (response.status !== 201) {
            this.setState({errorMsg: "Error when connecting to server: status code " + response.status});
            return;
        }

    };


    async doLogInWebSocket(userId) {

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
            this.setState({errorMsg: "You should log in first"});
            //TODO update logout
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
