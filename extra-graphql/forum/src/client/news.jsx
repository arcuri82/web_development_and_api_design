import React from "react";
import {Link} from 'react-router-dom';


export class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            news: null,
            errorMsg: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {

        const id = new URLSearchParams(window.location.search).get("newsId");

        if (!id) {
            this.setState({
                errorMsg: "ERROR: unspecified news id",
                user: null
            });
            return;
        }

        const query = encodeURIComponent("{getNewsById(id:\"" + id + "\"){title,text,author{id},comments{text,author{id}}}}");

        const url = "/graphql?query=" + query;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            this.setState({
                errorMsg: "ERROR when retrieving news: " + err,
                user: null
            });
            return;
        }

        if (response.status === 200) {

            if (payload.errors || !payload.data) {
                this.setState({
                    errorMsg: "ERROR in request", news: null
                });
            } else {
                this.setState({
                    errorMsg: null, news: payload.data.getNewsById
                });
            }

        } else {
            this.setState({
                errorMsg: "Issue with HTTP connection: status code " + response.status,
                news: null
            });
        }
    }

    render() {

        const error = this.state.errorMsg;
        if (error) {
            return (
                <p>
                    {error}
                </p>);
        }

        const news = this.state.news;

        if(! news){
            return(<h3>Loading...</h3>);
        }

        return (
            <div>
                <p>
                    <Link to={"/"}>Home</Link>
                </p>

                <h2>{news.title}</h2>
                <p>By <Link to={"/user?userId=" + news.author.id}>{news.author.id}</Link></p>
                <p>{news.text}</p>

                <ul>
                    {news.comments.map(c =>
                        <li>
                            <Link to={"/user?userId=" + c.author.id}>{c.author.id}</Link>: {c.text}
                        </li>)
                    }
                </ul>

            </div>
        );
    }
}