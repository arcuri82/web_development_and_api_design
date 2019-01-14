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
    }

    onInputChange = (event) => {
        this.setState({term: event.target.value});
    };

    onFormSubmit = (event) => {
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
    };

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
                <form id='formId' onSubmit={this.onFormSubmit}>
                    <input id={'formInputId'}
                        placeholder="Get a five-day forecast in a Norwegian City"
                        className="form-control"
                        value={this.state.term}
                        onChange={this.onInputChange}
                    />
                    <button id='submitBtnId' className="submitBtn" type="submit">Submit</button>
                </form>
                {msg}
                {forecast}
            </div>
        );
    }


    /*
        Notice the use of "async" keyword here.
        This means that, when this method is executed on the event-loop,
        it does not have to run to completion.

        It can automatically split in execution blocks, around the "await"s.
        Here, we have 3 blocks:
        - (1) before first await
        - (2) between the 2 awaits
        - (3) after the last await
     */
    async fetchWeather(city) {

        const key = this.props.apiKey;
        const params = "&units=metric&q=" + city + ",no";

        const url = BASE_URL + key + params;

        let response;
        let payload;

        try {
            /*
                The "await" here is on the Promise objects returned by those methods.
                When the "fetch" is executed, this execution block (1) is completed,
                and the event-loop handler is free to execute any other method (eg,
                the event handler of a onclick in a HTML tag).
                The thread executing this code (ie the event-loop) is NOT waiting
                for the response. This is the reason why it is called "Non-blocking I/O".

                Once the "callback" of the fetch is completed, and the response is
                taken from the server, such I/O operation will push block (2) on the
                queue of the event-loop.
             */

            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            const msg = "ERROR when retrieving forecast for " + city + ": " + err;
            this.setState({message: msg, forecast: null});
            return;
        }

        /*
            Once we reached this code, we have got a response from the server,
            and we can process it.
            The use of async/await here allows to deal with such asynchrony of
            operations (sending a HTTP request and waiting for a response) in
            a "sequential" way WITHOUT blocking the event-loop thread.

            When you have a single callback, you might not appreciate how powerful
            this approach is. The major payoff is when you have several callbacks,
            each one nested and depending on another, which is usually referred to as
            "callback hell".
         */

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
