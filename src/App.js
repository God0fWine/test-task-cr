import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Edit from './edit';
import Login from './login';
import CardList from './card-list'
import firebaseconfig from './firebase/firebaseIndex';
import firebase from 'firebase';

import './App.css';

const getData = async () => {
    let res = await firebase.firestore().collection("items").get().then(function (querySnapshot) {
        let arr = []
        querySnapshot.forEach(function (doc) {
            const card = {
                id: doc.id,
                name: doc.data().name,
                descr: doc.data().descr,
                price: doc.data().price,
                discount: doc.data().discount,
                discountDate: doc.data().discountDate,
                image: doc.data().image
            }
            arr.push(card)
        });
        return arr;
    });

    return res;
}

const setData = async (cards, setCard) => {
    let res = await getData();
    if (cards.length !== res.length) {
        setCard([...res]);
    }

}

export default function App() {

    const [isLoggedIn, onLogin] = useState(false);
    const [cards, setCard] = useState([]);

    setData(cards, setCard);

    const updateDoc = async (data) => {
        let imageUrl = null;
        if(data.image) {
            let imgName = Date.now() + data.image.name;
            let storageRef = await firebase.storage().ref(`/images/${imgName}`).put(data.image);
            imageUrl = await storageRef.ref.getDownloadURL();
        } else {
            imageUrl = cards.find(elem => elem.id === data.id).image;
        }
        firebase.firestore().collection("items").doc(`${data.id}`).set({
            name: data.name,
            descr: data.descr,
            price: data.price,
            discount: data.discount,
            discountDate: data.discountDate,
            image: imageUrl
        })
            .then(function () {
                let newCard = {
                    id: data.id,
                    name: data.name,
                    descr: data.descr,
                    price: data.price,
                    discount: data.discount,
                    discountDate: data.discountDate,
                    image: imageUrl
                }
                setCard([...cards, newCard])
            })
            .catch(function (error) {
                alert(error)
            });
    }

    const addNew = async (data) => {
        let imgName = Date.now() + data.image.name;
        var storageRef = await firebase.storage().ref(`/images/${imgName}`).put(data.image);
        let imageUrl = await storageRef.ref.getDownloadURL();
        firebase.firestore().collection("items").add({
            name: data.name,
            descr: data.descr,
            price: data.price,
            discount: data.discount,
            discountDate: data.discountDate,
            image: imageUrl
        })
            .then(function (docRef) {
                let newCard = {
                    name: data.name,
                    descr: data.descr,
                    price: data.price,
                    discount: data.discount,
                    discountDate: data.discountDate,
                    id: docRef.id,
                    image: imageUrl
                }
                setCard([...cards, newCard])
            })
            .catch(function (error) {
                alert(error);
            });
    }

    const del = (id) => {
        firebase.firestore().collection('items').doc(id).delete().then(() => {
            let newCards = cards.filter(item => item.id !== id)
            setCard([...newCards]);
        })
    }

    return (
        <div className="App">
            <Router>
                <Route path="/cards" render={() => (<CardList isLoggedIn={isLoggedIn} cards={cards} del={del} />)} />
                <Route path="/update" render={() => (<Edit isLoggedIn={isLoggedIn} toUpdate={updateDoc} toAdd={addNew} />)} />
                <Route path="/" render={() => (<Login isLoggedIn={isLoggedIn} onLogin={() => onLogin(true)} />)} />
            </Router>
        </div>
    );
}

