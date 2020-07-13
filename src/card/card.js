import React, { useReducer } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { reducer, initialState } from '../reducer/reducer';

import './card.css';

//Функция при нажатии на кнопку редактирования карточки
//Добавляет данные о карточке в store, как в redux, только при использовании react hook useReducer
const funcPress = (name, text, cost, discount, daysLeft, id, image) => {

    return {
        type: 'EDIT',
        data: {
            name: name,
            descr: text,
            price: cost,
            discount: discount,
            discountDate: daysLeft,
            id: id,
            image: image
        }
    };
};


function ShowCard({ id, name, descr, price, discount, discountDate, del, image }) {
    //Reducer для хранения редактируемой карточки
    const [state, dispatch] = useReducer(reducer, initialState);
    // Расчёт дней, оставшихся до конца скидки
    let now = Date.now()/1000;
    let daysLeft = null;
    if(discountDate !== undefined && discountDate !== null && !discountDate.__proto__.getDay){
        daysLeft = discountDate.seconds > now ? Math.floor((discountDate.seconds - now)/86400) : null ;
    } else {
        let ourDate = Date.parse(discountDate)/1000;
        daysLeft = ourDate > now ? Math.floor((ourDate - now)/86400) : null ;
    }
    //Расчёт цены, со скидкой она или нет
    let costWithDesc = (discount && daysLeft) ? (`$${(+price - +price * +discount / 100).toFixed(2)} with offer ${discount}%, last ${daysLeft} day(s)`) : ('$' + price);


    return (
        <Card className="card">
            <CardActionArea>
                <CardMedia
                    className="media"
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2" className="name">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="inherit" component="h3" >
                        {costWithDesc}
                    </Typography>
                    <Typography component="p" className="description">
                        {descr}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="buttons">

                <IconButton aria-label="Edit" color='primary'

                    onFocus={() => {
                        //при наводе на кнопку редактирования посылаем данные в store
                        dispatch(funcPress(name, descr, price, discount, daysLeft, id, image))
                    }}
                >
                    {/* Переход на страничку с редактированием карточки, в state хранятся её текущие данные */}
                    <Link to={
                        {
                            pathname: '/update',
                            state: state
                        }
                    }>
                        <EditIcon />
                    </Link>
                </IconButton>
                    {/* Кнопка удаления карточки */}
                <IconButton aria-label="Delete" color='secondary' onClick={() => del(id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ShowCard;