import React from 'react';
import {Link} from 'react-router-dom';


export class SignUp extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userId: "",
            password: "",
            confirm: ""
        };

        this.onUserIdChange = this.onUserIdChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmChange = this.onConfirmChange.bind(this);
        this.doSignUp = this.doSignUp.bind(this);
    }

    onUserIdChange(event){
        this.setState({userId: event.target.value});
    }

    onPasswordChange(event){
        this.setState({password: event.target.value});
    }

    onConfirmChange(event){
        this.setState({confirm: event.target.value});
    }

    doSignUp(){
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
                <div>
                    <p>Confirm:</p>
                    <input type="password"
                           value={this.state.confirm}
                           onChange={this.onConfirmChange}/>
                </div>

                <div className={btn} onClick={this.doSignUp}>Sign Up</div>
            </div>
        );
    }
}