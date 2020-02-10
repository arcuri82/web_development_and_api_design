import React from 'react';
import {withRouter} from 'react-router-dom'

class SignUp extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userId: "",
            password: "",
            confirm: "",
            errorMsg: null
        };
    }

    onUserIdChange = (event) => {
        this.setState({userId: event.target.value, errorMsg: null});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value, errorMsg: null});
    };

    onConfirmChange = (event) => {
        this.setState({confirm: event.target.value, errorMsg: null});
    };

    doSignUp = async () => {

        const {userId, password, confirm} = this.state;

        if(confirm !== password){
            this.setState({errorMsg: "Passwords do not match"});
            return;
        }

        const url = "/api/signup";

        const payload = {userId: userId, password: password};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: "+ err});
            return;
        }


        if(response.status === 400){
            this.setState({errorMsg: "Invalid userId/password"});
            return;
        }

        if(response.status !== 201){
            this.setState({errorMsg: "Error when connecting to server: status code "+ response.status});
            return;
        }

        this.setState({errorMsg: null});
        this.props.updateLoggedInUserId(userId);
        this.props.history.push('/');
    };

    render(){

        let error = <div></div>;
        if(this.state.errorMsg){
            //TODO css
            error = <div className="errorMsg"><p>{this.state.errorMsg}</p></div>
        }

        let confirmMsg = "Ok";
        if(this.state.confirm !== this.state.password){
           confirmMsg = "Not matching";
        }

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
                    <div>{confirmMsg}</div>
                </div>

                {error}

                <div className="btn" onClick={this.doSignUp}>Sign Up</div>
            </div>
        );
    }
}

export default withRouter(SignUp);
