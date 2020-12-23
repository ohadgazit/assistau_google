import Button from '../Shared/Button'
import './TeacherPage.css';
import Card from "../Shared/Card";
import {useHistory, useParams} from 'react-router-dom';
import teachers from "../mocks/teachers.json"
import React from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/database'
import 'firebase/auth';
import {useAuthState} from "react-firebase-hooks/auth";

//import Modal from '@material-ui/core/Modal';


const TeacherItemExpanded = props =>{

    const teacherId = useParams().teacherId;
    const teacherim1 =teachers.filter(teacher1 => Number(teacher1.id) === Number(teacherId));
    const chosen_teacher = teacherim1[0];
    const history = useHistory();
    var whastappMessageUrl = "https://wa.me/" +chosen_teacher.phone_number +"?text= שלום "
        +chosen_teacher.name +",  מצאתי אותך בעזרת אסיסטאו! אשמח לקבוע שיעור " ;
    const additionalCourses = ["מתמטיקה בדידה"," אלגברה לינארית"];
    const auth = firebase.auth();
    const [user] = useAuthState(auth);

    return (

        <Card className="place-item__content">
            <div className="place-item__image">
                <img src={chosen_teacher.imageUrl} alt={chosen_teacher.name} />

            </div>
            <div className="place-item__info">
                <h2>{chosen_teacher.name}</h2>
                <h3>תחום לימודים: {chosen_teacher.education}</h3>
                <p>מיקום שיעור: {chosen_teacher.locations}</p>
                <p>{chosen_teacher.desc}</p>
                <p>גיל: {chosen_teacher.age}</p>
                <p>ניסיון :{chosen_teacher.experience} שנים</p>
                <li>קורסים נוספים: {additionalCourses.map(item => item) }</li>
            </div>
            <div className="place-item__actions">
                <Button onClick = {() => history.goBack()} >חזור לחיפוש</Button>
                {user?
                    <Button href={whastappMessageUrl} target="_blank" rel="noreferrer">שליחת הודעה דרך ווטסאפ</Button>
                    :<Button to = "/SignIn">התחבר על מנת ליצור קשר עם המורה</Button>
                }
            </div>
        </Card>

    );

};

export default TeacherItemExpanded;



