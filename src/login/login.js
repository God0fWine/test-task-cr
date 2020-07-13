import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { authMethods } from '../firebase/authmethods';

import './login.css';

// Функция аутентификации пользователя
const logIn = async(login, password, onLogin, setPassword, setLogin) => {
    let res = await authMethods.signin(login, password);

    //Обработка возможных ошибок
    switch(res.code){
        case 'auth/user-not-found': 
            alert('User not found');
            break;
        case 'auth/invalid-email':
            alert('Invalid email');
            break;
        case 'auth/wrong-password':
            alert('Wrong password')
            break;
        case 'auth/too-many-requests':
            alert('Wait a minute please, server is too busy')
            break;
        default: 
            onLogin();
    }
    setPassword('');
    setLogin('');

}

//Функция регистрации пользователя
const register = async(login, password, onLogin) => {
    let res = await authMethods.signup(login, password);

    //Обработка возможных ошибок при регистрации
    switch(res.code){
        case 'auth/invalid-email':
            alert('Invalid email');
            break;
        case 'auth/too-many-requests':
            alert('Wait a minute please, server is too busy')
            break;
        case 'auth/weak-password':
            alert('Sorry, Ur password is too weak');
            break;
        case 'auth/email-already-in-use':
            alert('Sorry, this email is already in use')
            break;
        default: 
            onLogin();
    }
}

export default function Login({ isLoggedIn, onLogin }) {

    //state для логина
    const [login, setLogin] = useState('');
    //state для пароля
    const [password, setPassword] = useState('');
    //если пользователь аутентифицирован то перенаправляем на страницу с карточками
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
                    defaultValue={login}
                    onChange={(event) => {event.persist(); setLogin(login + event.target.value)}}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    defaultValue={password}
                    onChange={(event) => {event.persist(); setPassword(password + event.target.value)}}
                />
                <div className="buttons-lg">
                    <Button variant="contained" color="primary" onClick={() => {logIn(login, password, onLogin, setPassword, setLogin)} }>
                        Log In
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => {register(login, password, onLogin, setPassword, setLogin)}}>
                        Register
                    </Button>
                </div>

            </div>
        );
    

    
}