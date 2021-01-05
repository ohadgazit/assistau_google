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
import Carusela from "../components/carousal";
import Example from "../components/carousal2";

//import Modal from '@material-ui/core/Modal';


const TeacherItemExpanded = props =>{
    const teacherData = useLocation().state;
    var whastappMessageUrl = "https://wa.me/" +teacherData.phone_number +"?text= שלום "
        + teacherData.name +",  מצאתי אותך בעזרת אסיסטאו! אשמח לקבוע שיעור " ;
    const additionalCourses = ["מתמטיקה בדידה"," אלגברה לינארית"];
    const auth = firebase.auth();
    const [user] = useAuthState(auth);




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
            </div>

        </Card>



    );

};

export default TeacherItemExpanded;



