import Button from '../Shared/Button'
import './TeacherPage.css';
import Card from "../Shared/Card";
import {useLocation} from 'react-router-dom';
import React from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/database'
import 'firebase/auth';
import {useAuthState} from "react-firebase-hooks/auth";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

//import Modal from '@material-ui/core/Modal';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import { borders } from '@material-ui/system';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';



const TeacherItemExpanded = props =>{
    const teacherData = useLocation().state;
    var whastappMessageUrl = "https://wa.me/" +teacherData.phone_number +"?text= שלום "
        + teacherData.name +",  מצאתי אותך בעזרת אסיסטאו! אשמח לקבוע שיעור " ;
    const additionalCourses = ["מתמטיקה בדידה"," אלגברה לינארית"];
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const [open, setOpen] = React.useState(false); //review test
    const [value1, setValue] = React.useState({id: 0, name: ""});
    const [text,setText] = React.useState('');
    const [score, setScore] = React.useState(2);

    //Reviews test
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        writeUserData();
        setOpen(false);

    };

    //end of reviews test
    console.log(teacherData)


    //box design param
    const defaultProps = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        style: { width: '5rem', height: '5rem' },
    };

    const StyledRating = withStyles({
        iconFilled: {
            color: '#ff6d75',
        },
        iconHover: {
            color: '#ff3d47',
        },
    })(Rating);

    // const useStyles = makeStyles({
    //     root: {
    //         minWidth: 275,
    //     },
    //     bullet: {
    //         display: 'inline-block',
    //         margin: '0 2px',
    //         transform: 'scale(0.8)',
    //     },
    //     title: {
    //         fontSize: 14,
    //     },
    //     pos: {
    //         marginBottom: 12,
    //     },
    // });

    const useStyles = makeStyles(() => ({
        root: {
            overflow: 'initial',
            maxWidth: 304,
            backgroundColor: 'transparent',
        },
        title: {
            marginBottom: 0,
        },
        rateValue: {
            fontWeight: 'bold',
            marginTop: 2,
        },
        content: {
            position: 'relative',
            padding: 24,
            margin: '-24% 16px 0',
            backgroundColor: '#fff',
            borderRadius: 4,
        },
        favorite: {
            position: 'absolute',
            top: 12,
            right: 12,
        },
        locationIcon: {
            marginRight: 4,
            fontSize: 18,
        },
    }));



    function writeUserData() {
        const email = auth.currentUser.email
        const db = firebase.firestore()
        const teacherRef = db.collection('teachers').doc('4')
        console.log(teacherData.Name)
        console.log(teacherRef)
        console.log(text)
        const pushit = {
        //email,
        //text_review : text,
        //score: score
        }
        teacherRef.update({
            reviews: firebase.firestore.FieldValue.arrayUnion(pushit)
        });
    }
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (


        <Card className="place-item__content">
            <div className="place-item__image">
                <img src={teacherData.image} alt={teacherData.name} />

            </div>
            <div className="place-item__info">
                <h2>{teacherData.name}</h2>
                <Typography color={'textSecondary'} variant={'title'}> "{teacherData.desc}" </Typography>
                <p></p>
                <p>השכלה: {teacherData.education}</p>
                <p>גיל: {teacherData.age}</p>
                <p>מגדר: {teacherData.gender}</p>
                <p>ניסיון :{teacherData.experience} שנים</p>
                <p>עלות שיעור :{teacherData.lessonCost}&#8362; </p>
                {user ?
                    <p>מספר טלפון : {teacherData.phone_number} </p>:null
                }
                {user ?
                    <p>דואר אלקטרוני: {teacherData.email} </p>:null
                }
                <li>קורסים נוספים: {additionalCourses.map(item => item) }</li>
                {/*<Carusela/>*/}


            </div>
            <div className="place-item__actions">
                <Button  to={`/courses/${teacherData.from_course}`} >חזור לחיפוש</Button>
                {user?
                    <Button href={whastappMessageUrl} target="_blank" rel="noreferrer"><WhatsAppIcon fontSize={'default'} /></Button>
                    :<Button to = "/SignIn">התחבר על מנת ליצור קשר עם המורה</Button>
                }
                {user?
                    <Button onClick={handleClickOpen} type = "button">
                        כתוב ביקורת
                    </Button>
                    :<Button to = "/SignIn">התחבר על מנת לכתוב ביקורת</Button>
                }



                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"> דרג את המורה {teacherData.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            הזן ביקורת עבור המורה - במה הוא עזר לך,מה הוא לימד וכו׳. הגבלה של 144 תוים
                        </DialogContentText>
                        <TextField
                            rtl
                            required={true}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="כתוב את הביקורת כאן"
                            rowsMax={4}
                            type="text"
                            fullWidth
                            onChange={(event) => {
                                setText(event.target.value);
                            }}
                        />
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">דרג</Typography>
                            <Rating
                                name="simple-controlled"
                                value={score}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            שלח ביקורת
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            בטל
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className="place-item__actions">
                {teacherData.reviews[0]?
                    <Typography> ביקורות הסטודנטים </Typography>:
                    <Typography>אין ביקורות על מורה זה</Typography>
                }
                {teacherData.reviews[0]?
                <h1>{teacherData.reviews[0].text_review}</h1> &&
                <Carousel autoPlay={true}  navButtonsAlwaysVisible={true}> &&
                {teacherData.reviews[0].map((person, index) => {
                    return <Card>
                        <p key={index}> <h3>{person.email}</h3>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend"></Typography>
                                <Rating name="read-only"  variant={'body2'} value={person.score} readOnly={true} />
                            </Box>
                            <Typography color={'textSecondary'} variant={'body2'}> "{person.text_review}" </Typography>
                    </p>
                    </Card>
                })}
                </Carousel>:null}

            </div>

        </Card>







    );

};

export default TeacherItemExpanded;



