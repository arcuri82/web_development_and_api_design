import React from "react";

const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?appid=";

export class Forecast extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            term: "",
            message: null,
            forecast: null
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({term: event.target.value});
    }

    onFormSubmit(event) {
        /*
            Prevent the default action of submitting a form,
            which would be a POST request to the server we got
            the HTML from.
            But here we rather want to do AJAX to an external
            web service.
         */
        event.preventDefault();

        //note: this returns a Promise, but we do not need to handle it
        this.fetchWeather(this.state.term);

        this.setState({term: ""});
    }

    render() {

        let msg = <div/>;
        if (this.state.message !== null) {
            msg = <div className="forecastMsg">{this.state.message}</div>;
        }

        let forecast = <div/>;
        if (this.state.forecast !== null) {
            forecast = <table id="weatherTable">
                <thead>
                <tr>
                    <th>Time</th>
                    <th>Temperature (C)</th>
                    <th>Weather</th>
                </tr>
                </thead>
                <tbody>
                {this.state.forecast.map(f =>
                    <tr key={"key_" + f.time}>
                        <td>{f.time}</td>
                        <td>{f.temp}</td>
                        <td>{f.weather}</td>
                    </tr>
                )}
                </tbody>
            </table>
        }

        return (
            <div>
                <h3>Search Forecast for a Norwegian City</h3>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        placeholder="Get a five-day forecast in a Norwegian City"
                        className="form-control"
                        value={this.state.term}
                        onChange={this.onInputChange}
                    />
                    <button className="submitBtn" type="submit">Submit</button>
                </form>
                {msg}
                {forecast}
            </div>
        );
    }


    async fetchWeather(city) {

        const key = this.props.apiKey;
        const params = "&units=metric&q=" + city + ",no";

        const url = BASE_URL + key + params;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            const msg = "ERROR when retrieving forecast for " + city + ": " + err;
            this.setState({message: msg, forecast: null});
            return;
        }

        if (response.status === 200) {

            const msg = "Forecast for " + city;

            const forecast = payload.list.map(f => (
                {
                    temp: f.main.temp,
                    time: f.dt_txt,
                    weather: f.weather.map(w => w.main).join(", ")
                }
            ));

            this.setState({
                message: msg,
                forecast: forecast
            });

        } else if (response.status === 404) {
            //happens if we ask for a city that is not recognized
            const msg = "Cannot find forecast for " + city;
            this.setState({message: msg, forecast: null});

        } else {
            //something went wrong, but we got a response. eg, hit usage rate limit of the API
            const msg = "ERROR when retrieving forecast for " + city + ": " + payload.message;
            this.setState({message: msg, forecast: null});
        }
    }

}
