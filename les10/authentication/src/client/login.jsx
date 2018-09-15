import React from 'react';
import {Link} from 'react-router-dom';


export class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userId: "",
            password: ""
        };

        this.onUserIdChange = this.onUserIdChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.doLogIn = this.doLogIn.bind(this);
    }

    onUserIdChange(event){
        this.setState({userId: event.target.value});
    }

    onPasswordChange(event){
        this.setState({password: event.target.value});
    }

    doLogIn(){
        //TODO
    }

    render(){
        return(
            <div>
                <div>
                    <p>User Id:</p>
                    <input type="text"
                           value={this.state.userId}
                           onChange={this.onUserIdChange}/>
                </div>
                <div>
                    <p>Password:</p>
                    <input type="password"
                           value={this.state.password}
                           onChange={this.onPasswordChange}/>
                </div>

                <div className={btn} onClick={this.doLogIn}>Log In</div>
                <Link to={"/signup"}>Register</Link>
            </div>);
    }
}