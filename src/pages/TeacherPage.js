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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'


import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';



const TeacherItemExpanded = props =>{
    const reload=()=>window.location.reload();
    const teacherData = useLocation().state;
    var whastappMessageUrl = "https://wa.me/" +teacherData.phone_number +"?text= שלום "
        + teacherData.name +",  מצאתי אותך בעזרת אסיסטאו! אשמח לקבוע שיעור " ;
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

    function showSuccess()
    {

            return ( <div className={classes.root}>    <Snackbar open={open} autoHideDuration={6000} >
                <Alert severity="success">
                    This is a success message!
                </Alert>
            </Snackbar> </div>)
    }

    const handleClose = () => {
        writeUserData();
        showSuccess();
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

    const useStylesForRating = makeStyles((theme)=> ({
        rating:{
            direction:'ltr'
        }
    }));

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
        rating:{
            direction:'ltr'
        },
    }));



    function writeUserData() {
        const email = auth.currentUser.email
        const db = firebase.firestore()
        const teacherRef = db.collection('teachers').doc(teacherData.email)
        const average = Number(teacherData.rating);
        const size = Number(teacherData.reviews[0].length);
        let new_rating = (average*size+score)/(size+1);
        const pushit = {
        email,
        text_review : text,
        score: score,

        }
        teacherRef.update({
            reviews: firebase.firestore.FieldValue.arrayUnion(pushit),
            rating: new_rating,

        });
    }


    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className="place-item__content">
            <div className="place-item__image">
                <img src={teacherData.image} alt={teacherData.first_name} />

            </div>
            <div className="place-item__info">
                <h2>{teacherData.first_name}  {teacherData.last_name}</h2>
                <Typography color={'textSecondary'} variant={'title'}> "{teacherData.desc}" </Typography>
                <p></p>
                <p>השכלה: {teacherData.education}</p>
                <p>גיל: {teacherData.age}</p>
                {teacherData.gender === "2" ? <p>מגדר: זכר </p> :  <p>מגדר: נקבה </p>}
                <p>ניסיון :{teacherData.experience} שנים</p>
                <p>עלות שיעור :{teacherData.lessonCost}&#8362; </p>
                {user ?
                    <p>מספר טלפון : {teacherData.phone_number} </p>:null
                }
                {user ?
                    <p>דואר אלקטרוני: {teacherData.email} </p>:null
                }
                <p>מלמד גם את הקורסים הבאים:   </p>
                {teacherData.course_list.map(item => (<li>{item.courseName}</li>))}
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
                                className={classes.rating}
                                name="simple-controlled"
                                value={score}
                                onChange={(event, newValue) => {
                                    setScore(newValue);
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
                {console.log(teacherData.reviews[0])}
                {teacherData.reviews[0]?
                    <Typography> ביקורות הסטודנטים </Typography>:
                    <Typography>אין ביקורות על מורה זה</Typography>
                }
                {teacherData.reviews[0].length>0?
                <h1>{teacherData.reviews[0].text_review}</h1> &&
                <Carousel autoPlay={true}  navButtonsAlwaysVisible={true}>
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



