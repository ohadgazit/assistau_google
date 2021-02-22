import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {useForm} from "react-hook-form";
import "./RegStyles.css";
import {Multiselect} from "multiselect-react-dropdown";
import firebase from "firebase";
import RegCard from "./RegCard";
import {useAuthState} from "react-firebase-hooks/auth";

function UpdateDetails() {

    useEffect(() => {
        loadTeacherData()
        loadCourses()
    }, [])

    const auth = firebase.auth();
    const [user] = useAuthState(auth);

    // if (user) {
    //     //console.log("connected user:", user.displayName)
    // } else {
    //     //console.log("not connected")
    // }

    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting }
    } = useForm();

    function onSubmit(data) {
        updateTeacherInfo(data)
        loadTeacherData()
        window.history.go(-1)
    }

    //for 'gender' field
    const styles={
        select:{
            width:'100%',
            maxWidth: 600,
        }
    }

    var courses1 = []

    function onChangeInput(value){
        courses1 = value
    }

    const [loadedTeacherState,setLoadedTeacherstate] = React.useState(null);

    const [loadedCourseState,setLoadedCoursestate] = React.useState([]);

    function loadTeacherData() {

        var db = firebase.firestore();
        var teachersCollection = db.collection("teachers")
        if (user) {var current_email = auth.currentUser.email}
            var docRef = teachersCollection.doc(current_email)
            docRef.limit(100).get().then(function (doc) {
                if (doc.exists) {
                    let teacherEdu = doc.get("education")
                    const docData = doc.data()
                    setLoadedTeacherstate(docData)
                    return doc.data();
                }
            }).catch(function (error) {
            });
        }


    function loadCourses() {

        var db = firebase.firestore();
        var coursesRef = db.collection("courses")
        var query = coursesRef.where("courseCode", "!=", 'null');
        query.get().then(function (querySnapshot) {
            let loadedCourses= [] ;
            querySnapshot.forEach(function (doc) {
                let docData = doc.data()
                loadedCourses.push({...docData
                });
            })
            setLoadedCoursestate(loadedCourses)
        })
            .catch(function (error) {
            });
    }


    function updateTeacherInfo(data){

        const email = auth.currentUser.email
        const imageUrl = auth.currentUser.photoURL
        const db = firebase.firestore();
        const teacherRef = db.collection('teachers/')
        teacherRef.doc(email).update({
            first_name: data.firstName,
            last_name: data.lastName,
            age: data.age,
            gender: Number(data.gender),
            phoneNumber: data.phoneNumber,
            email: email,
            education: data.education,
            lessonCost: Number(data.lessonCost),
            desc: data.desc,
            experience: data.experience,
            imageUrl: imageUrl,
            timestamp : new Date().getTime(),
            courses: courses1.map( function( el ){
                return el.courseCode
            }),
            course_list: courses1.map( function( el ){
                return el
            })

        });
    }


    function SelectCourses() {

        return (
            <div className="SelectCourses" onSubmit={handleSubmit(onSubmit)}>
                <label className="reg-label">ערוך את הקורסים שברצונך ללמוד. ביכולתך להוסיף או למחוק קורסים</label>
                <Multiselect options={loadedCourseState}
                             selectedValues={loadedTeacherState.course_list}
                             isMulti
                             displayValue="courseName"
                             displayName="courseName"
                             name="courses"
                             ref={register({required: true})}
                             onSelect={onChangeInput}
                             placeholder=''
                />
            </div>
        );
    }


    return (
        <RegCard>
            {
                loadedTeacherState !== null ?
                <form className="reg-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="reg-header">עדכון פרטים</h1>
                    <h3 className="reg-header-small">עדכן את השדות הרלוונטיים. את השאר השאר ללא שינוי</h3>
                    <h3 className="reg-header-small">{user ? "מחובר בתור: " + user.email : "No user detected"}</h3>

                    <label className="reg-label">שם פרטי:</label>
                    <input className="reg-input" name="firstName" ref={register({required: true, minLength: 2})}
                           defaultValue={loadedTeacherState.first_name} //replace with firstName from DB
                    />
                    {errors.firstName && errors.firstName.type === "minLength" && (
                        <p className="p-error">על שדה זה להכיל לפחות 2 תווים</p>)}

                    <label className="reg-label">שם משפחה:</label>
                    <input className="reg-input" name="lastName" ref={register({required: true, minLength: 2})}
                           defaultValue={loadedTeacherState.last_name} //replace with lastName from DB
                    />
                    {errors.lastName && errors.lastName.type === "minLength" && (
                        <p className="p-error">על שדה זה להכיל לפחות 2 תווים</p>)}

                    <label className="reg-label">גיל:</label>
                    <input className="reg-input"
                           name="age"
                           type="number"
                           ref={register({required: true, min: 0})}
                           defaultValue={loadedTeacherState.age} //replace with the age from DB
                    />
                    {errors.age && errors.age.type === "min" && (<p className="p-error">נא הזן ערך חיובי</p>)}

                    <label className="reg-label">מגדר:</label>
                    <select name="gender" ref={register({required: true})} dir="rtl" style={styles.select}
                            defaultValue={loadedTeacherState.gender} //replace with gender from DB
                    >
                        <option value="">בחר..</option>
                        <option value={2}>גבר</option>
                        <option value={1}>אישה</option>
                    </select>

                    <label className="reg-label">מספר טלפון:</label>
                    <input className="reg-input" name="phoneNumber"
                           ref={register({required: true, minLength: 10, maxLength: 10, pattern: /^[0-9]*$/})}
                           defaultValue={loadedTeacherState.phoneNumber} //replace with phoneNumber from DB
                    />
                    {errors.phoneNumber && errors.phoneNumber.type === "minLength" && (
                        <p className="p-error">על מספר הטלפון להכיל 10 ספרות</p>)}
                    {errors.phoneNumber && errors.phoneNumber.type === "maxLength" && (
                        <p className="p-error">על מספר הטלפון להכיל 10 ספרות</p>)}
                    {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
                        <p className="p-error">על שדה זה להכיל ספרות בלבד</p>)}

                    <label className="reg-label">השכלה:</label>
                    <input className="reg-input"
                           name="education"
                           ref={register({required: true})}
                           defaultValue={loadedTeacherState.education} //replace with education from DB
                    />

                    <label className="reg-label">מספר שנות נסיון:</label>
                    <input className="reg-input"
                           name="experience"
                           type="number"
                           ref={register({required: true, min:0})}
                           defaultValue={loadedTeacherState.experience} //replace with experience from DB
                    />
                    {errors.experience && errors.experience.type === "min" && (<p className="p-error">נא הזן ערך חיובי</p>)}

                    <label className="reg-label">עלות שיעור:</label>
                    <input className="reg-input"
                           name="lessonCost"
                           type="number"
                           ref={register({required: true, min: 0})}
                           defaultValue={loadedTeacherState.lessonCost} //replace with lessonCost from DB
                    />
                    {errors.lessonCost && errors.lessonCost.type === "min" && (
                        <p className="p-error">נא הזן ערך חיובי</p>)}


                    <label className="reg-label">הזן תיאור קצר על עצמך ועל שיטת הלימוד שלך ופרטים נוספים כרצונך</label>
                    <textarea className="reg-textarea" name="desc" defaultValue={loadedTeacherState.desc} ref={register({maxLength: 144})}/>

                    <SelectCourses/>

                    <input className="reg-input" disabled={isSubmitting} type="submit" value="עדכן פרטים"/>
                </form> : <h3>טוען מידע</h3>
            }
        </RegCard>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<UpdateDetails />, rootElement );

export default UpdateDetails


