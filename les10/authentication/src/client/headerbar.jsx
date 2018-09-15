import React from 'react';


export class HeaderBar extends React.Component{

    constructor(props){
        super(props);

        this.doLogout = this.doLogout.bind(this);
    }


    doLogout(){
        //TODO
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
            <div>
                <Link to={"/"}>Home</Link>
                {content}
            </div>
        );
    }
}