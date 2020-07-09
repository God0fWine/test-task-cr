import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import { Link, Redirect, useLocation } from 'react-router-dom';

import './edit.css';


function Edit({ isLoggedIn, toUpdate, toAdd }) {

    let location = useLocation();
    const [name, setName] = useState(location.state !== undefined ? location.state.name : '');
    const [descr, setDescr] = useState(location.state !== undefined ? location.state.descr : '');
    const [price, setPrice] = useState(location.state !== undefined ? location.state.price : '');
    const [discount, setDiscount] = useState(location.state !== undefined ? location.state.discount : '');
    const [discountDate, setdiscountDate] = useState(location.state !== undefined ? location.state.discountDate : '');
    const [image, setImage] = useState(location.state !== undefined ? location.state.discountDate : '');


    if (!isLoggedIn) {
        return (<Redirect to='/' />)
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
            <TextField
                id="standard-dense"
                label="Заголовок"
                className="textField dense"
                margin="dense"
                helperText="Required"
                required
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
            />
            <input
                accept="image/*"
                id="raised-button-file"
                className="input-img"
                multiple
                required
                type="file"
                onChange={(event) => {
                   return (event.target.files.length !== 0) ? setImage(event.target.files[0]) : null;
                    
                }}
            />
            <TextField
                id="outlined-textarea"
                label="Описание товара"
                className="textField dense"
                multiline
                margin="dense"
                helperText="Optional"
                defaultValue={descr}
                onChange={(event) => setDescr(event.target.value)}
            />
            <TextField
                className="textField dense"
                label="Цена"
                id="formatted-numberformat-input"
                helperText="Required"
                required
                defaultValue={price}
                onChange={(event) => setPrice(event.target.value)}
            />
            <TextField
                className="textField dense"
                label="Процент скидки"
                id="formatted-numberformat-input"
                helperText="Optional"
                defaultValue={discount}
                onChange={(event) => setDiscount(event.target.value)}
            />
            <TextField
                id="standard-dense"
                label="Дата окончания скидки"
                className="textField dense"
                margin="dense"
                helperText="Required"
                defaultValue={discountDate}
                onChange={(event) => setdiscountDate(event.target.value)}
            />
            <Link to="/cards">
                <Button variant="contained" color="primary" onClick={() => {
                    let now = new Date();
                    let endOfDiscount = new Date();
                    endOfDiscount.setDate(now.getDate() + +discountDate)
                    if (location.state !== undefined) {
                        let data = {
                            name: name,
                            descr: descr,
                            price: price,
                            discount: discount,
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
                            price: price,
                            discount: discount,
                            discountDate: endOfDiscount,
                            image: image
                        }
                        toAdd(data)
                    }
                }}>
                    Accept
                </Button>
            </Link>

        </div >
    );
}

export default Edit;