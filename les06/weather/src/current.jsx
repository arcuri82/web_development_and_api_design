import React from "react";

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?appid=";


export class Current extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            temperature: "?"
        };
    }

    /*
        this method is automatically called by React once the component is mounted.
        At this point in time, the constructor has been completed, and the method
        "render" has been called once.
        Point is, we do not want to have "expensive" operations on the constructor,
        as that can freeze the GUI for some time (even few hundred milliseconds could be
        noticeable).

        Also notice that you name this method EXACTLY as it is, with no typos.
        If you have a typo, eg "componenDidMount" (note the missing first "t"),
        then the method will never be called... ah, the beauty of dynamically
        typed languages!!!
     */
    componentDidMount() {

        /*
            We are going to make a request to the REST API via AJAX.
            We used the "old-style" XMLHttpRequest to send the message.
            This implies making an HTTP request.
            It might take some time before the server replies (hopefully
            no more than few hundred milliseconds).
            Once we get a reply, we need to update the state of this component
            with the payload of the response.
            To do that, we need to register a "callback" which will be executed
            AFTER this method is completed, once the server does reply.

            Note: you should no longer use XMLHttpRequest, but rather "fetch",
            as this latter uses Promises, which makes the handling of I/O easier.
         */

        const ajax = new XMLHttpRequest();

        //register the "callback" to handle the server's response
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE) {

                const payload = JSON.parse(ajax.response);

                if (ajax.status === 200) {

                    const temp = payload.main.temp;

                    this.setState({temperature: temp + "'"});

                } else {
                    //something went wrong

                    this.setState({temperature: "ERROR"});
                    alert("ERROR: " + payload.message);
                }
            }
        };

        const key = this.props.apiKey;
        const city = this.props.city;
        const params = "&units=metric&q=" + city + ",no";

        ajax.open("GET", BASE_URL + key + params, true);
        ajax.send();
    }

    render() {
        return (
            <span>{this.props.city + " " + this.state.temperature}</span>
        );
    }

}
