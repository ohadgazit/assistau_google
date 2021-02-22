import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {useForm} from "react-hook-form";
import "./RegStyles.css";
import {Multiselect} from "multiselect-react-dropdown"
import firebase from "firebase";
import RegCard from "./RegCard";

function TeacherRegistration() {
    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting }
    } = useForm();

    function onSubmit(data) {
        writeUserData(data)
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

    const [loadedCourseState,setLoadedCoursestate] = React.useState([]);

    useEffect(() => {
        loadCourses()
    }, [])

    function loadCourses() {
        var db = firebase.firestore();
        var coursesRef = db.collection("courses")
        var query = coursesRef.where("courseCode", "!=", 'null');
        query.limit(100).get().then(function (querySnapshot) {
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

    function writeUserData(data){
        const auth = firebase.auth();
        const userId = auth.currentUser.uid
        const email = auth.currentUser.email
        const imageUrl = auth.currentUser.photoURL
        const db = firebase.firestore();
        const teacherRef = db.collection('teachers/')
        teacherRef.doc(email).set({
            first_name: data.firstName,
            last_name: data.lastName,
            age: data.age,
            gender: Number(data.gender),
            phoneNumber: data.phoneNumber,
            email: auth.currentUser.email,
            education: data.education,
            lessonCost: Number(data.lessonCost),
            desc: data.desc,
            experience: data.experience,
            imageUrl: imageUrl,
            timestamp : new Date().getTime(),
            rating: 0,
            reviews: [],
            courses: courses1.map( function( el ){
                return el.courseCode
            }),
            course_list: courses1.map( function( el ){
                return el
            }),
            reviews_number: 0,
            reviews_dict: {}
        });
    }

    function SelectCourses() {
        return (
            <div className="SelectCourses" onSubmit={handleSubmit(onSubmit)}>
                <label className="reg-label">בחר את הקורסים שברצונך ללמד (ניתן לבחור יותר מקורס אחד)</label>
                <Multiselect options={loadedCourseState}
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
    };

    return (
        <RegCard>
        <form className="reg-form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="reg-header">הרשמה</h1>
            <label className="reg-label">שם פרטי:</label>
            <input className="reg-input" name="firstName" ref={register({ required: true,minLength: 2  })} />
            {errors.firstName && errors.firstName.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.firstName && errors.firstName.type === "minLength" && (<p className="p-error">על שדה זה להכיל לפחות 2 תווים</p>)}

            <label className="reg-label">שם משפחה:</label>
            <input className="reg-input" name="lastName" ref={register({ required: true, minLength: 2 })}/>
            {errors.lastName && errors.lastName.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.lastName && errors.lastName.type === "minLength" && (<p className="p-error">על שדה זה להכיל לפחות 2 תווים</p>)}

            <label className="reg-label">גיל:</label>
            <input className="reg-input"
                name="age"
                type="number"
                ref={register({ required: true, min:0})}
            />
            {errors.age && errors.age.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.age && errors.age.type === "min" && (<p className="p-error">נא הזן ערך חיובי</p>)}

            <label className="reg-label">מגדר:</label>
            <select name="gender" ref={register({ required: true })} dir="rtl" style={styles.select}>
                <option value="" >בחר..</option>
                <option value={2}>גבר</option>
                <option value={1}>אישה</option>
            </select>
            {errors.gender && <p className="p-error">שדה חובה</p>}

            <label className="reg-label">מספר טלפון:</label>
            <input className="reg-input" name="phoneNumber" ref={register({ required: true,minLength:10, maxLength:10, pattern:/^[0-9]*$/})}/>
            {errors.phoneNumber && errors.phoneNumber.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.phoneNumber && errors.phoneNumber.type === "minLength" && (<p className="p-error">על מספר הטלפון להכיל 10 ספרות</p>)}
            {errors.phoneNumber && errors.phoneNumber.type === "maxLength" && (<p className="p-error">על מספר הטלפון להכיל 10 ספרות</p>)}
            {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (<p className="p-error">על שדה זה להכיל ספרות בלבד</p>)}

            <label className="reg-label">השכלה:</label>
            <input className="reg-input"
                name="education"
                ref={register({ required: true})}
            />
            {errors.education && <p className="p-error">שדה חובה</p>}

            <label className="reg-label">מספר שנות נסיון:</label>
            <input className="reg-input"
                   name="experience"
                   type="number"
                   ref={register({ required: true, min:0})}
            />
            {errors.experience && errors.experience.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.experience && errors.experience.type === "min" && (<p className="p-error">נא הזן ערך חיובי</p>)}

            <label className="reg-label">עלות שיעור:</label>
            <input className="reg-input"
                name="lessonCost"
                type="number"
                ref={register({ required: true, min:0})}
            />
            {errors.lessonCost && errors.lessonCost.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.lessonCost && errors.lessonCost.type === "min" && (<p className="p-error">נא הזן ערך חיובי</p>)}

            <label className="reg-label">הזן תיאור קצר על עצמך ועל שיטת הלימוד שלך ופרטים נוספים כרצונך</label>
            <textarea className="reg-textarea" name="desc" ref={register({maxLength: 144})} />

            <SelectCourses/>

            <input className="reg-input" disabled={isSubmitting} type="submit" value="הירשם"/>
        </form>
        </RegCard>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TeacherRegistration />, rootElement );

export default TeacherRegistration


