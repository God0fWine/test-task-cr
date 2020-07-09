import React, { useState } from 'react';
import ShowCard from './card';
import { Link, Redirect } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './card-list.css';

const createCard = (cards, del) => {
    let arr = [];
    for(let i = 0; i < cards.length; i++){
        arr.push(<ShowCard id={cards[i].id} key={cards[i].id} image={cards[i].image} name={cards[i].name} descr={cards[i].descr} price={cards[i].price} discount={cards[i].discount} discountDate={cards[i].discountDate} del={del}/>)
    }
    return arr;
}

export default function CardList({ cards, del, isLoggedIn }) {

    const [showCards, setCards] = useState([]);

    if (!isLoggedIn) {
        return (<Redirect to='/' />)
    }

    let cardsArr = createCard(cards, del);

    if(showCards.length !== cardsArr.length){
        setCards([...cardsArr])
    }

    return (
        <div className="card-list">
            {showCards}
            <Link to='/update'>
            <Fab color="primary" aria-label="add" className="add-icon">
                <AddIcon />
            </Fab>
            </Link>
        </div>
    );
}