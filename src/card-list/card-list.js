import React, { useState } from 'react';
import ShowCard from '../card/card';
import { Link, Redirect } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './card-list.css';

//Создание карточек для хранения в массиве и дальнейшем отображении
const createCard = (cards, del) => {
    let arr = [];
    for(let i = 0; i < cards.length; i++){
        arr.push(<ShowCard id={cards[i].id} key={cards[i].id} image={cards[i].image} name={cards[i].name} descr={cards[i].descr} price={cards[i].price} discount={cards[i].discount} discountDate={cards[i].discountDate} del={del}/>)
    }
    return arr;
}

export default function CardList({ cards, del, isLoggedIn }) {

    const [showCards, setCards] = useState([]);

    //Если пользователь не авторизировался то перенаправляем его на страничку с авторизацией
    if (!isLoggedIn) {
        return (<Redirect to='/' />)
    }

    //Массив со всеми карточками
    let cardsArr = createCard(cards, del);
    //Проверка для избежания infinite loop и добавление карточек в state компонента
    if(showCards.length !== cardsArr.length){
        setCards([...cardsArr])
    }

    return (
        <div className="card-list">
            {/* Массив с карточками */}
            {showCards}
            <Link to='/update'>
            <Fab color="primary" aria-label="add" className="add-icon">
                <AddIcon />
            </Fab>
            </Link>
        </div>
    );
}