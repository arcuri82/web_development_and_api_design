import React from "react";
import {Link} from 'react-router-dom';


export class Home extends React.Component {

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

        const query = "query=" + encodeURIComponent("{getNews{id,title,author{id}}}");

        const url = "/graphql?" + query;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            this.setState({
                errorMsg: "ERROR when retrieving list of news: " + err,
                news: null
            });
            return;
        }

        if (response.status === 200) {

            if(payload.errors || !payload.data){
                this.setState({errorMsg: "ERROR in request", news: null
                });
            } else {
                this.setState({
                    errorMsg: null, news: payload.data.getNews
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
        if (!news || news.length === 0) {
            return (<p>There are now news</p>);
        }

        return (
            <div>
                <h2>Basic Forum</h2>
                <table>
                    <tr>
                        <th>Author</th>
                        <th>News</th>
                    </tr>
                    {news.map(n => {
                        return (
                            <tr>
                                <td><Link to={"/user?userId=" + n.author.id}>{n.author.id}</Link></td>
                                <td><Link to={"/news?newsId=" + n.id}>{n.title}</Link></td>
                            </tr>);
                    })}
                </table>
            </div>
        );
    }
}