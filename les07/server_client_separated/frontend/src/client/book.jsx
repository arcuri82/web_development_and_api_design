import React from "react";
import {Link, withRouter} from 'react-router-dom'


class Book extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            author: this.props.author ? this.props.author : "",
            title: this.props.title ? this.props.title : "",
            year: this.props.year ? this.props.year : ""
        };

        this.ok = this.props.ok ? this.props.ok : "Ok";
    }

     onFormSubmit = async (event) => {
        /*
            in this component, we have an actual HTML form.
            when it is submitted, we want to prevent it from doing
            an actual POST using x-www-form-urlencoded format, we need JSON.
         */
        event.preventDefault();

        /*
            here we make the call with AJAX, on which we have full control
         */
        const completed = await this.props.okCallback(
            this.state.author,
            this.state.title,
            this.state.year,
            this.props.bookId);

        /*
            when the call is completed, we need to decide what to do.
            If there was no problem, then we need to tell the browser
            to go to the homepage.
            otherwise, should issue an error
         */

        if(completed) {
            /*
                this will change the address bar, and so trigger
                a re-rendering of React-Router
             */
            this.props.history.push('/');
        } else {
            //we use alert() just for simplicity for this example...
            alert("Failed to create new Book")
        }
    };

    onAuthorChange = (event) => {
        this.setState({author: event.target.value});
    };

    onTitleChange = (event) => {
        this.setState({title: event.target.value});
    };

    onYearChange = (event) => {
        this.setState({year: event.target.value});
    };

    render() {

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="inputTitle">Author(s):</div>
                    <input
                        placeholder={"Type the author(s) of this book"}
                        value={this.state.author}
                        onChange={this.onAuthorChange} 
                        className="bookInput"
                    />
                    <div className="inputTitle">Title:</div>
                    <input
                        placeholder={"Type the title of this book"}
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        className="bookInput"
                    />
                    <div className="inputTitle">Year:</div>
                    <input
                        placeholder={"Type the year in which this book was published"}
                        value={this.state.year}
                        onChange={this.onYearChange}
                        className="bookInput"
                    />

                    <button type="submit" className={"btn"}>{this.ok}</button>
                    <Link to={"/"}><button className={"btn"}>Cancel</button></Link>
                </form>
            </div>
        );
    }
}


/*
    Needed, because otherwise this.props.history would be undefined
 */
export default withRouter(Book);