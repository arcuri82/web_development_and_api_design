import React from "react";

export class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "Anonymous",
            text: "",
            messages: null
        };


    }

    componentDidMount() {
        this.fetchMessages();

        this.socket = new WebSocket("ws://" + window.location.host);

        this.socket.onmessage = (event => {

            const msg = JSON.parse(event.data);

            this.setState(
                prev => {
                    if (prev.messages === null) {
                        return {messages: [msg]};
                    } else {
                        return {messages: [...prev.messages, msg]};
                    }
                }
            );
        });
    }

    componentWillUnmount() {
        if(this.socket){
            this.socket.close();
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onTextChange = (event) => {
        this.setState({text: event.target.value});
    };

    sendMsg = async () => {

        const url = "/api/messages";

        const payload = {author: this.state.name, text: this.state.text};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== 201) {
            alert("Error when connecting to server: status code " + response.status);
            return;
        }

        //reset text after sending a message
        this.setState({text: ""});
    };


    fetchMessages = async () => {

        let since = "";
        if (this.state.messages !== null && this.state.messages.length !== 0) {
            since = "?since=" + Math.max(...this.state.messages.map(m => m.id));
        }

        const url = "/api/messages" + since;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status === 200) {

            this.setState(
                prev => {
                    if (prev.messages === null) {
                        return {messages: payload};
                    } else {
                        return {messages: prev.messages.concat(payload)};
                    }
                }
            );

        } else {
            alert("Error when connecting to server: status code " + response.status);
        }
    };


    render() {

        let messages = <div></div>;

        if (this.state.messages !== null) {
            messages = <div>
                {this.state.messages.map(m =>
                    <p key={"msg_key_" + m.id}> {m.author + ": " + m.text}</p>
                )}
            </div>;
        }

        return (
            <div>
                <h2>WebSocket-based Chat</h2>
                <div>
                    <p className="inputName">Your name:</p>
                    <input type="text"
                           className="inputName"
                           value={this.state.name}
                           onChange={this.onNameChange}
                           id="nameInputId"
                    />
                </div>
                <br/>
                <div>
                    <p>Your message:</p>
                    <textarea cols="50"
                              rows="5"
                              value={this.state.text}
                              onChange={this.onTextChange}
                              id="msgInputId"
                    />
                </div>
                <br/>

                <div id="sendBtnId" className="btn" onClick={this.sendMsg}>Send</div>
                {messages}
            </div>
        );
    }
}