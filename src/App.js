import React, { useState } from 'react';
import ShowCard from './card';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Edit from './edit';
import Login from './login';
import Button from '@material-ui/core/Button';
import { Link, Switch } from 'react-router-dom';
import firebaseconfig from './firebase/firebaseIndex';
import firebase from 'firebase';

import './App.css';


const del = (id) => {
    firebase.firestore().collection('items').doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    })
}

function App() {

    const [isLoggedIn, onLogin] = useState(false);
    let db = firebase.firestore();
    db.collection('items').doc("card")
        .onSnapshot(function (doc) {
            console.log("Current data: ",  doc.data());
        });
    let arr = [];
    let card = (<ShowCard isLoggedIn={isLoggedIn} del={del}/>);
    let card1 = (<ShowCard isLoggedIn={isLoggedIn} />);
    let card2 = (<ShowCard isLoggedIn={isLoggedIn} />);
    let card3 = (<ShowCard isLoggedIn={isLoggedIn} />);
    arr.push(card)
    arr.push(card1)
    arr.push(card2)
    arr.push(card3)

    return (
        <div className="App">
            <Router>
                {isLoggedIn ? (<Link to='/update'>
                    <Button variant="contained" color="primary" className="add-btn">Add New</Button></Link>) : null}
                <Switch>
                    <Route path="/cards" render={() => (<div>{arr}</div>)} />
                    <Route path="/update" render={() => (<Edit isLoggedIn={isLoggedIn} />)} />
                    <Route path="/" render={() => (<Login isLoggedIn={isLoggedIn} onLogin={() => onLogin(true)} />)} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
