import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { authMethods } from './firebase/authmethods';

import './login.css';

export default function Login({ isLoggedIn, onLogin }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    if (isLoggedIn) {
        return <Redirect to="/cards"/>
    }

        return (
            <div className="container-lg">
                <h3> Please Log in to see some cards</h3>
                <TextField
                    id="outlined-email-input"
                    label="Login"
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    onChange={(event) => {event.persist(); setLogin(login + event.target.value)}}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={(event) => {event.persist(); setPassword(password + event.target.value)}}
                />
                <div className="buttons-lg">
                    <Button variant="contained" color="primary" onClick={() => {authMethods.signin(login, password); onLogin()}}>
                        Log In
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => {authMethods.signup(login, password); onLogin()}}>
                        Register
                    </Button>
                </div>

            </div>
        );
    

    
}