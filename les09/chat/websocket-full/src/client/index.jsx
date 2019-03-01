import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "Anonymous",
            text: "",
            messages: null
        };


    }

    componentDidMount() {

        this.socket = new WebSocket("ws://" + window.location.host);

        this.socket.onmessage = ( event => {

            const msgList = JSON.parse(event.data);

            this.setState(
                prev => {
                    if(prev.messages === null){
                        return {messages: msgList};
                    } else {
                        return {messages: [...prev.messages, ...msgList]};
                    }
                }
            );
        });
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onTextChange = (event) => {
        this.setState({text: event.target.value});
    };

    sendMsg = () => {

        const payload = JSON.stringify({author: this.state.name, text: this.state.text});

        this.socket.send(payload);

        //reset text after sending a message
        this.setState({text: ""});
    };


    render() {

        let messages = <div></div>;

        if(this.state.messages !== null){
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
                           onChange={this.onNameChange}/>
                </div>
                <br/>
                <div>
                    <p>Your message:</p>
                    <textarea  cols="50"
                               rows="5"
                               value={this.state.text}
                               onChange={this.onTextChange} />
                </div>
                <br/>

                <div id="sendId" className="btn" onClick={this.sendMsg}>Send</div>
                {messages}
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));