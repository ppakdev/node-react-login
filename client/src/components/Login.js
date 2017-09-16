import React, { Component } from 'react';
import { Paper, RaisedButton, TextField } from 'material-ui';
import NavBar from './NavBar';

import Auth from '../utils/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: false,
            passwordError: false,
            formSubmitted: false,
            invalidLogin: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;

        // localStorage cookie for now. ideally store tokens on backend and use redux for currentUser
        // simple login for now
        if (username.toLowerCase() === 'test@test.com' && password === 'password32#') {
            Auth.authenticate();
            // @TODO: research react-router 4 update to better handle redirects
            // react-router 4 got rid of browserHistory.push()
            window.location.href = '/listings';
        } else {
            this.setState({
                username: '',
                password: '',
                invalidLogin: true,
            });
        }
    }

    handleChange(e, val) {
        if (e.target.name === 'username') {
            // validate email address
            let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            let usernameError = !re.test(val);
            this.setState({ username: val, usernameError });
        } else {
            // validate length and non-alphanumeric
            let passwordError = (val.length < 10 || !(/[\W]/g.test(val)))
            this.setState({ password: val, passwordError });
        }

        // NOTE: validations would eventually be moved to a utils file 
        // and likely in conjunction with a redux-form library
    }

    render() {
        let passwordErrorText = '';
        if (this.state.passwordError) {
            passwordErrorText = 'Password must be greater than 10 characters and include at least 1 non-alphanumeric character';
        }

        let usernameErrorText = '';
        if (this.state.usernameError) {
            usernameErrorText = 'Username must be a valid email address';
        }

        // let invalidLoginText = '';
        // if (this.state.invalidLogin) {
            
        // }
        const style = {
            height: 300,
            width: 300,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
            paddingTop: 10,
          };
          

        return (
            <div className="App">
                <NavBar />
                <div class="container">
                    <Paper style={style} zDepth={2}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            hintText="Username"
                            floatingLabelText="Username"
                            name="username"
                            type="email"
                            value={this.state.username || ''}
                            errorText={usernameErrorText}
                            onChange={this.handleChange}
                            required
                        /><br />
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            value={this.state.password || ''}
                            errorText={passwordErrorText}
                            onChange={this.handleChange}
                            required
                        /><br />
                        <RaisedButton 
                            type="submit" 
                            label="Submit"
                            disabled={this.state.formSubmitted || (!this.state.username || !this.state.password)}
                            primary
                        />
                    </form>
                    </Paper>
                </div>
            </div>
        
        );
    }
}


export default Login;
