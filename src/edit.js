import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import { Link, Redirect, useLocation } from 'react-router-dom';

import './edit.css';

function NumberFormatCustomDollar(props) {

    const { inputRef, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            format="$############"
            thousandSeparator
            decimalSeparator
            suffix="$"
        />
    );
}

function NumberFormatCustomPercent(props) {
    const { inputRef, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            format="%##"
            thousandSeparator
            prefix="%"
        />
    );
}


function Edit({ isLoggedIn }) {

    let location = useLocation();
    
    console.log(location)
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
                defaultValue={location.state !== undefined ? location.state.name : ''}
            />
            <TextField
                id="outlined-textarea"
                label="Описание товара"
                className="textField dense"
                multiline
                margin="dense"
                helperText="Optional"
                defaultValue={location.state !== undefined ? location.state.description : ''}
            />
            <TextField
                className="textField dense"
                label="Цена"
                id="formatted-numberformat-input"
                InputProps={{
                    inputComponent: NumberFormatCustomDollar,
                }}
                helperText="Required"
                defaultValue={location.state !== undefined ? location.state.price : 0}
            />
            <TextField
                className="textField dense"
                label="Процент скидки"
                id="formatted-numberformat-input"
                InputProps={{
                    inputComponent: NumberFormatCustomPercent,
                }}
                helperText="Optional"
                defaultValue={location.state !== undefined ? location.state.discount : 0}
            />
            <TextField
                id="standard-dense"
                label="Дата окончания скидки"
                className="textField dense"
                margin="dense"
                helperText="Required"
                defaultValue={location.state !== undefined ? location.state.discountDate : 0}
            />
            <Link to="/cards">
                <Button variant="contained" color="primary" >
                    Primary
                </Button>
            </Link>

        </div>
    );
}

export default Edit;