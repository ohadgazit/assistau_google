import Button from '../Shared/Button'
import './TeacherItem.css';
import Card from "../Shared/Card";
import React from "react";
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';



const TeacherItem = props => {



    const useStyles = makeStyles((theme) => ({
        root: {
            direction:'ltr',

            display: 'flex',
            flexDirection: 'column',
            '& > * + *': {
                marginTop: theme.spacing(1),
            },
        },
    }));

    const classes = useStyles();


    return (

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.name} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.name}</h2>
                        <h3 className={classes.root}>{ <Rating name="half-rating-read" readOnly={true} value={props.rating} precision={0.5} />}</h3>
                        <h3>תחום לימודים: {props.education}</h3>
                        <p>מיקום שיעור: {props.locations}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button to = '/'>חזור לחיפוש</Button>
                         <Button
                            to={{
                                pathname: `/teachers/${props.id}`,
                                state: {
                                    key : props.id,
                                    id  : props.id,
                                    image: props.image,
                                    name: props.name,
                                    education: props.education,
                                    locations: props.locations,
                                    age: props.age,
                                    desc: props.desc,
                                    phone_number: props.phone_number,
                                    from_course: props.from_course,
                                    reviews: props.reviews,
                                    rating: props.rating

                            }
                            }}
                            >
                            מידע נוסף
                        </Button>



                    </div>
                </Card>
            </li>

    );

};

export default TeacherItem;