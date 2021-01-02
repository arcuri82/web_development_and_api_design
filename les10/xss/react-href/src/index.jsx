import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            homepageLink: "",
            text: ""
        };
    }

    onLinkChange = (event) => {
        this.setState({homepageLink: event.target.value});
    };

    onTextChange = (event) => {
        this.setState({text: event.target.value});
    };

    render(){

        return(
            <div>
                <h2>Examples of XSS in React</h2>

                <div>
                    <p className="inputLink">Link to your Homepage:</p>
                    <input type="text"
                           className="inputLink"
                           value={this.state.homepageLink}
                           onChange={this.onLinkChange}/>
                </div>

                <br/>

                <div>
                    <p>Your text:</p>
                    <textarea  cols="50"
                               rows="5"
                               value={this.state.text}
                               onChange={this.onTextChange} />
                </div>

                <br/>

                <hr/>

                <h3>Displayed Values</h3>

                <a href={this.state.homepageLink} > Link to homepage </a>

                <p>
                    Your text: {this.state.text}
                </p>


                <hr/>

                <h3>Discussion</h3>

                <p>
                    The displayed 'text' is somehow protected from XSS, as React will display it inside a string "".
                    Therefore, using something like the following will not work:
                </p>
                <p>
                    <b>
                    &lt;img src='x'
                         onError="document.getElementsByTagName('body')[0].innerHTML = &amp;quot;&lt;img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Pirate_Flag.svg/750px-Pirate_Flag.svg.png'/&gt;&amp;quot;;"/&gt;
                    </b>
                </p>
                <p>
                    On the other hand, "href" attributes will not be protected by default, and you would have to
                    manually verify that the URL is using either HTTP or HTTPS as protocol.
                    For example, the following XSS attack will work when used as homepage link provided by the user.
                    Note: you still have to manually click on the link to get the JS code running.
                </p>
                <p>
                    <b>javascript:alert('Welcome to XSS!')</b>
                </p>
                <p>
                    React knows about this issue, but for now (2019) it just issues a warning in the console.
                    Future versions of React might block it.
                </p>

            </div>


        );

    }
}


ReactDOM.render(<App />, document.getElementById("root"));