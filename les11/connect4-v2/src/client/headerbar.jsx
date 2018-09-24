import React from 'react';
import {Link, withRouter} from 'react-router-dom';


class HeaderBar extends React.Component{

    constructor(props){
        super(props);

        this.doLogout = this.doLogout.bind(this);
    }


    async doLogout(){

        const url = "/api/logout";


        let response;

        try {
            response = await fetch(url, {method: "post"});
        } catch (err) {
            alert("Failed to connect to server: "+ err);
            return;
        }

        if(response.status !== 204){
            alert("Error when connecting to server: status code "+ response.status);
            return;
        }

        this.props.updateLoggedInUserId(null);
        this.props.history.push('/');
    }

    renderLoggedIn(userId){
        return(
            <div >

                <h3>Welcome {userId}!!!</h3>

                <div className="btn" onClick={this.doLogout}>Logout</div>
            </div>
        );
    }

    renderNotLoggedIn(){
        return(
            <div>
                <p>You are not logged in</p>

                <Link to="/login">LogIn</Link>
                <Link to="/signup">SignUp</Link>
            </div>

        );
    }

    render(){
        const userId = this.props.userId;

        let content;
        if(userId === null || userId === undefined){
            content = this.renderNotLoggedIn();
        } else {
            content = this.renderLoggedIn(userId);
        }

        return(
            <div className={"headerBar"}>
                <Link to={"/"}>Home</Link>
                {content}
            </div>
        );
    }
}

export default withRouter(HeaderBar);