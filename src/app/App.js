import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Edit from '../edit/edit';
import Login from '../login/login';
import CardList from '../card-list/card-list'
import firebaseconfig from '../firebase/firebaseIndex';
import firebase from 'firebase';

import './App.css';

// Функция получения всех документов ( карточек ) из  cloud firestore
const getData = async () => {
    let res = await firebase.firestore().collection("items").get().then(function (querySnapshot) {
        let arr = []
        querySnapshot.forEach(function (doc) {
            // Создание объекта с информацией, которую отображаем в карточке и её id для дальнейшего изменения
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

//Функция сохранения всех полученных объектов в state
const setData = async (cards, setCard) => {
    let res = await getData();
    if (cards.length !== res.length) {
        setCard([...res]);
    }

}

export default function App() {

    // state для bool переменной что бы знать, авторизирован ли пользователь
    const [isLoggedIn, onLogin] = useState(false);
    //state с объектами для информации на карточках
    const [cards, setCard] = useState([]);

    setData(cards, setCard);

    //Функция обновления информации на карточке
    const updateDoc = async (data) => {
        let imageUrl = null;
        // Загружаем новую картинку в firebase storage
        if(isNaN(data.image)) {
            //переменная для того, что бы не было одинаковых названий картинок в storage
            let imgName = Date.now() + data.image.name;
            let storageRef = await firebase.storage().ref(`/images/${imgName}`).put(data.image);
            imageUrl = await storageRef.ref.getDownloadURL();
        } else {
            // Если вдруг изображение не изменили, то берём старое
            imageUrl = cards.find(elem => elem.id === data.id).image;

        }
        //Обновление карточки в database
        firebase.firestore().collection("items").doc(`${data.id}`).set({
            name: data.name,
            descr: data.descr,
            price: +data.price,
            discount: +data.discount,
            discountDate: data.discountDate,
            image: imageUrl
        })
            .then(function () {
                //Изменение объекта с информацией для карточки в state 
                let newCard = {
                    id: data.id,
                    name: data.name,
                    descr: data.descr,
                    price: +data.price,
                    discount: +data.discount,
                    discountDate: data.discountDate,
                    image: imageUrl
                }
                setCard([...cards, newCard])
            })
            .catch(function (error) {
                alert(error)
            });
    }

    //Функция добавления новой карточки 
    const addNew = async (data) => {
        //Уникальное имя изображения
        let imgName = Date.now() + data.image.name;
        var storageRef = await firebase.storage().ref(`/images/${imgName}`).put(data.image);
        let imageUrl = await storageRef.ref.getDownloadURL();
        //Добавление новой карточки в database
        firebase.firestore().collection("items").add({
            name: data.name,
            descr: data.descr,
            price: +data.price,
            discount: +data.discount,
            discountDate: data.discountDate,
            image: imageUrl
        })
            .then(function (docRef) {
                //Добавление новой карточки в state
                let newCard = {
                    name: data.name,
                    descr: data.descr,
                    price: +data.price,
                    discount: +data.discount,
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

    //Функция удаление карточки из database и state
    const del = (id) => {
        firebase.firestore().collection('items').doc(id).delete().then(() => {
            let newCards = cards.filter(item => item.id !== id)
            setCard([...newCards]);
        })
    }

    return (
        <div className="App">
            <Router>
                {/* Страничка с карточками */}
                <Route path="/cards" render={() => (<CardList isLoggedIn={isLoggedIn} cards={cards} del={del} />)} />
                {/* Страничка с формами для добавления/редактирования карточки */}
                <Route path="/update" render={() => (<Edit isLoggedIn={isLoggedIn} toUpdate={updateDoc} toAdd={addNew} />)} />
                {/* Начальный роут с формой авторизации */}
                <Route path="/" render={() => (<Login isLoggedIn={isLoggedIn} onLogin={() => onLogin(true)} />)} />
            </Router>
        </div>
    );
}

