import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link, Redirect, useLocation } from 'react-router-dom';

import './edit.css';


function Edit({ isLoggedIn, toUpdate, toAdd }) {

    //location для получения state при переходе черед <Link>, если редактируем карточку 
    let location = useLocation();
    //Состояния всех input
    const [disableBtn, becomeWork] = useState(true);
    const [name, setName] = useState(location.state !== undefined ? location.state.name : '');
    const [descr, setDescr] = useState(location.state !== undefined ? location.state.descr : '');
    const [price, setPrice] = useState(location.state !== undefined ? location.state.price : '');
    const [discount, setDiscount] = useState(location.state !== undefined ? location.state.discount : '');
    const [discountDate, setdiscountDate] = useState(location.state !== undefined ? location.state.discountDate : '');
    const [image, setImage] = useState(location.state !== undefined ? location.state.discountDate : '');


    //Если пользователь не авторизировался то перенаправляем его на страницу авторизации
    if (!isLoggedIn) {
        return (<Redirect to='/' />)
    }

    //Функция проверки валидности всех input, если все валидны то кнопка Update становится рабочей
    const handleForm = () => {
        let arr = [false, false, false, false, false, false];

        if(name.length >= 20 && name.length <= 60) arr[0] = true;
        if(descr.length <= 200) arr[1] = true;
        if(+price > 0 && +price < 99999999.99) arr[2] = true;
        if(+discount >= 10 && +discount <= 90 && discountDate > 0) {arr[3] = true; arr[4] = true}
        if(discount === '' && discountDate === '') {arr[3] = true; arr[4] = true}
        if(image !== '') arr[5] = true;

        let i = 0;
        for(let item of arr){
            if(item) i++;
        }

        if( i < 6) becomeWork(true)
        if(i === 6) becomeWork(false);
        
    }

    //При нажатии на кнопку Update идёт проверка, было ли это редактирование карточки, или добавление новой
    //Вызывается соответствующая, зависимо от этого, функция (редактирование или добавление)
    const handleClick = () => {

        let now = new Date();
        let endOfDiscount = new Date();
        endOfDiscount.setDate(now.getDate() + +discountDate)
        if (location.state !== undefined) {
            let data = {
                name: name,
                descr: descr,
                price: +price,
                discount: +discount,
                discountDate: endOfDiscount,
                id: location.state.id,
                image: image
            }
            toUpdate(data)
        }
        else {
            let data = {
                name: name,
                descr: descr,
                price: +price,
                discount: +discount,
                discountDate: endOfDiscount,
                image: image
            }
            toAdd(data)
        }
    }


    return (
        <div className="container-edit">
            <div className="back-btn">
                <Link to='/cards'>
                    <Button variant="contained" color="primary">
                        Go back
                    </Button>
                </Link>
            </div>
            <form className="container-edit" onBlur={() => handleForm() }>
                <label for="name" className="label">Название товара</label>
                <input type="text" id="name" className="dense" value={name} onChange={(event) => setName(event.target.value)} required placeholder="Заголовок" maxLength="60" />
                <label for="raised-button-file" className="label">Изображение товара</label>
                <input accept="image/*" id="raised-button-file" className="input-img" multiple required type="file" onChange={(event) => { return (event.target.files.length !== 0) ? setImage(event.target.files[0]) : null; }} />
                <label for="descr" className="label">Описание товара</label>
                <textarea type="text" id="descr" className="dense" placeholder="Описание товара" maxLength="200" cols="40" rows="5" value={descr} onChange={(event) => setDescr(event.target.value)} />
                <label for="price" className="label">Цена</label>
                <input type="number" id="price" className="dense" placeholder="Цена" maxLength="11" min="0" max="99999999.99" required value={price} onChange={(event) => setPrice(event.target.value)} />
                <label for="discount" className="label">Процент скидки</label>
                <input type="number" id="discount" className="dense" placeholder="Процент скидки" maxLength="2" min="10" max="90" pattern="{2}" value={discount} onChange={(event) => setDiscount(event.target.value)} />
                <label for="discountDate" className="label">Дней до конца скидки</label>
                <input type="number" id="discountDate" className="dense btm" placeholder="Дата окончания скидки" maxLength="2" value={discountDate} onChange={(event) => setdiscountDate(event.target.value)} />
            </form>

        {/* При добавлении или изменении карточки перенаправляем на страницу с карточками */}
            <Button variant="contained" color="primary" disabled={disableBtn} onClick={() => handleClick() }>
                <Link to="/cards">
                    Accept
                </Link>
            </Button>

        </div >
    );
}

export default Edit;