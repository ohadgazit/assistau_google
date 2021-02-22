import Button from '../Shared/Button'
import './TeacherPage.css';
import Card from "../Shared/Card";
import {useLocation} from 'react-router-dom';
import React, {useEffect} from "react";
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
import Snackbar from '@material-ui/core/Snackbar';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core/styles';





const TeacherItemExpanded = props => {
    let teacherDatafromLocation = useLocation().state;
    useEffect(() => {
        //setTeacherEmail(teacherDatafromLocation)
        if (teacherDatafromLocation) {
            loadTeacherData(teacherDatafromLocation.email)
        }
        else {
            loadTeacherData(path_to_email(window.location.pathname))
        }
    },[] )
    const auth = firebase.auth();
    const [user] = useAuthState(auth);













    const [open, setOpen] = React.useState(false);
    const [show, setShow] = React.useState(false)
    const [text, setText] = React.useState('');
    const [score, setScore] = React.useState(0);
    const [teacherData,setTeacher] = React.useState(null);







    //Reviews test
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setShow(false);
        setOpen(false);
        setScore(0)
    };

    const handleSubmit = () => {
        AddReviewToDict();
        //checkTeacherExists();
        setShow(true);
        setOpen(false);
        setScore(0)
    };


    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShow(false);
    };








    const StyledRating = withStyles({
        iconFilled: {
            color: '#ff6d75',
        },
        iconHover: {
            color: '#ff3d47',
        },
    })(Rating);





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
        rating: {
            direction: 'ltr'
        },
    }));

    function email_to_dict(str) {
        let pos = str.indexOf("@")
        return ("reviews_dict." + str.slice(0, pos))
    }



    function path_to_email(str) {
        let new_str = str.replace('/teachers/','').concat('@mail.tau.ac.il')
        return new_str

    }



    function AddReviewToDict() {
        var new_review = 1
        const email = auth.currentUser.email
        const push_email = email_to_dict(email)
        const db = firebase.firestore()
        const teacherRef = db.collection('teachers').doc(teacherData.email)
        const pushit = {
            text_review: text,
            score: score
        }

        teacherRef.get().then((doc) => {
            var old_score = 0
            if (doc.exists) {
                var reviewes_new = doc.data().reviews_dict;
                var reviews_number = doc.data().reviews_number;
                var current_avg = doc.data().rating;

                if (reviewes_new[push_email.slice(13, push_email.length)]) {
                    new_review = 0
                    old_score = reviewes_new[push_email.slice(13, push_email.length)]['score']
                } else {
                    new_review = 1
                }
            } else {
                // doc.data() will be undefined in this case
            }
            let new_rating = (current_avg * reviews_number + score - old_score) / (reviews_number + new_review);
            teacherRef.update({
                [push_email]: pushit,
                rating: new_rating,
                reviews_number: firebase.firestore.FieldValue.increment(new_review)

            });

        })
    }

    // function checkTeacherExists() {
    //     const db = firebase.firestore()
    //     const teacherRef = db.collection('teachers').doc(auth.currentUser.email)
    //
    // }

    function loadTeacherData(email) {
        const db = firebase.firestore();
        let teachersCollection = db.collection("teachers")
        let docRef = teachersCollection.doc(email)
        docRef.get().then(function (doc) {
            if (doc.exists) {
                const docData = doc.data()
                setTeacher(docData)
                return doc.data();

            } else {
                // doc.data() will be undefined in this case
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });



    }


    const classes = useStyles();
    //const bull = <span className={classes.bullet}>•</span>;
    return (
        teacherData !== null ?

        <Card className="place-item__content">
            <div className="place-item__image">
                <img src={teacherData.imageUrl} alt={teacherData.first_name}/>

            </div>
            <div className="place-item__info">
                <h2>{teacherData.first_name} {teacherData.last_name}</h2>
                <Typography color={'textSecondary'} variant={'title'}> "{teacherData.desc}" </Typography>
                <p></p>
                <p>השכלה: {teacherData.education}</p>
                <p>גיל: {teacherData.age}</p>
                {teacherData.gender === "2" ? <p>מגדר: גבר </p> : <p>מגדר: אישה </p>}
                <p>מספר שנות נסיון : {teacherData.experience}</p>
                <p>עלות שיעור : {teacherData.lessonCost}&#8362; </p>
                {user ?
                    <p>מספר טלפון : {teacherData.phoneNumber} </p> :
                    <Typography color={'textSecondary'}> * התחבר על מנת לצפות בפרטי התקשרות (טלפון וכתובת
                        email)</Typography>
                }
                {user ?
                    <p>דואר אלקטרוני: <a href={"mailto:" + teacherData.email}>{teacherData.email}</a> </p> : null
                }
                <p>מלמד את הקורסים הבאים: </p>
                {teacherData.course_list.map(item => (<li>{item.courseName}</li>))}


            </div>
            <div className="place-item__actions">
                {teacherDatafromLocation ?
                    <Button to={`/courses/${teacherDatafromLocation.from_course}`}>חזור לחיפוש </Button> :
                    <Button to={`/}`}>חזור לחיפוש </Button>
                }
                {user ?
                    <Button href={"https://wa.me/" +teacherData.phoneNumber.replace("0","+972") + "?text= שלום " +
                        teacherData.first_name+" " + teacherData.last_name +",  מצאתי אותך בעזרת אסיסטאו! אשמח לקבוע שיעור " } target="_blank" rel="noreferrer"><WhatsAppIcon
                        fontSize={'default'}/></Button>
                    : <Button to={{
                        pathname: "/SignIn/",
                        state: {previous_page: window.location.pathname}
                    }}>התחבר על מנת ליצור קשר או לכתוב ביקורת</Button>
                }



                {user?
                    <Button onClick={handleClickOpen} type = "button">
                        כתוב ביקורת
                    </Button> :
                    null
                }


                <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"> דרג את המורה {teacherData.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            הזן ביקורת עבור המורה - במה הוא עזר לך,מה הוא לימד וכו׳. הגבלה של 144 תוים.
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
                            onBlur={(event) => {
                                setText(event.target.value);
                            }}
                        />
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">דרג (שדה חובה)</Typography>
                            <Rating
                                className={classes.rating}
                                name="simple-controlled"
                                defaultValue={0}
                                value={score}
                                onChange={(event, newValue) => {
                                    setScore(newValue);
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        {score !== 0 ? <Button onClick={handleSubmit} color="primary">
                            שלח ביקורת
                        </Button> : null}
                        <Button onClick={handleCancel} color="primary">
                            בטל
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className="place-item__actions">

                {teacherData.reviews_dict ?
                    <Typography> ביקורות הסטודנטים </Typography> :
                    <Typography>אין ביקורות על מורה זה</Typography>
                }

                {Object.keys(teacherData.reviews_dict).length ?
                    //<h1>{teacherData.reviews[0].text_review}</h1> &&
                    <Carousel autoPlay={true} navButtonsAlwaysVisible={true}>
                        {Object.entries(teacherData.reviews_dict).map(([person, review_data]) => {  //teacherData.reviews_dict.map((person, index) => {
                            return <Card>
                                <p key={person}><h3>{person}</h3>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend"></Typography>
                                        <Rating name="read-only" variant={'body2'} value={review_data.score}
                                                readOnly={true}/>
                                    </Box>
                                    <Typography color={'textSecondary'}
                                                variant={'body2'}> "{review_data.text_review}" </Typography>
                                </p>
                            </Card>
                        })}
                    </Carousel> : null}
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={show}
                        autoHideDuration={2500}
                        message="הביקורת התקבלה בהצלחה ותתפרסם בקרוב"
                        onClose={handleClose2}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                            </React.Fragment>}

                    />
                </div>
            </div>
        </Card> : <h3>טוען מידע</h3>
    );

};

export default TeacherItemExpanded;



