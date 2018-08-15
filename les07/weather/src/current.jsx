import React from "react";

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?appid=";


export class Current extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            temperature: "?"
        };
    }

    //this method is automatically called by React once the component is mounted
    componentDidMount() {

        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE) {

                const payload = JSON.parse(ajax.response)

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
