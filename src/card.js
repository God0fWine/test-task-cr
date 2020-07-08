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
import { Link, Redirect } from 'react-router-dom';
// import DelayLink from 'react-delay-link';
import { reducer, initialState } from './reducer';


import './card.css';


const funcPress = (name, text, cost, discount, daysLeft) => {

    return {
        type: 'EDIT',
        data: {
            name: name,
            desc: text,
            price: cost,
            discount: discount,
            discountDate: daysLeft
        }
    };
};




function ShowCard({ isLoggedIn, del }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    if (isLoggedIn) {
        let name = 'name';
        let text = 'asd asd asdasdasd asdgfdpspgj wskfjoasdgfdpspgj wskfjo;sldf sdiof jsdf wasdgfdpspgj wskfjo;sldf sdiof jsdf wasdgfdpspgj wskfjo;sldf sdiof jsdf wasdgfdpspgj wskfjo;sldf sdiof jsdf wasdgfdpspgj wskfjo;s'
        let image = "/images/hi.jpg";
        let discount = 10;
        let daysLeft = 3;
        let cost = 145;
        let costWithDesc = (discount && daysLeft) ? (`$${cost - cost*discount/100} with offer ${discount}%, last ${daysLeft} day(s)`) : ('$' + cost);


        return (
            <Card className="card">
                <CardActionArea>
                    <CardMedia
                        className="media"
                        image={image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h2">
                            {name}
                        </Typography>
                        <Typography gutterBottom variant="inherit" component="h3" >
                            {costWithDesc}
                        </Typography>
                        <Typography component="p" >
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className="buttons">

                    <IconButton aria-label="Edit" color='primary'
                        onClick={() => { dispatch(funcPress(name, text, cost, discount, daysLeft)) }}
                        >
                        <Link to={
                            {
                                pathname: '/update',
                                state: state
                            }
                        }>
                            <EditIcon />
                        </Link>
                    </IconButton>

                    <IconButton aria-label="Delete" color='secondary' onClick={() => del("card2")}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
    return <Redirect to='/' />
}

export default ShowCard;