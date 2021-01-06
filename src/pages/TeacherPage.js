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
//import Carusela from "../components/carousal";
//import Example from "../components/carousal2";

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

import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'


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
    console.log(teacherData.reviews[0].entries)



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

    return (

        <Card className="place-item__content">
            <div className="place-item__image">
                <img src={teacherData.image} alt={teacherData.name} />

            </div>
            <div className="place-item__info">
                <h2>{teacherData.name}</h2>
                <h3>תחום לימודים: {teacherData.education}</h3>
                <p>מיקום שיעור: {teacherData.locations}</p>
                <p>{teacherData.desc}</p>
                <p>גיל: {teacherData.age}</p>
                <p>ניסיון :{teacherData.experience} שנים</p>

                <li>קורסים נוספים: {additionalCourses.map(item => item) }</li>
                {/*<Carusela/>*/}





            </div>
            <div className="place-item__actions">
                <Button  to={`/courses/${teacherData.from_course}`} >חזור לחיפוש</Button>
                {user?
                    <Button href={whastappMessageUrl} target="_blank" rel="noreferrer">שליחת הודעה דרך ווטסאפ</Button>
                    :<Button to = "/SignIn">התחבר על מנת ליצור קשר עם המורה</Button>
                }
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    כתוב ביקורת
                </Button>

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
                <h3> Reviews </h3>
                <h1>{teacherData.reviews[0].text_review}</h1>
                <Carousel autoPlay={true}  navButtonsAlwaysVisible={true}>
                {teacherData.reviews[0].map((person, index) => {
                    return <p key={index}>Reviewer: {person.email}, Score: {person.score}, Text Review: {person.text_review}</p>
                })}
                </Carousel>


            </div>

        </Card>



    );

};

export default TeacherItemExpanded;



