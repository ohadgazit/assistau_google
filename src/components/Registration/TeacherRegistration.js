import React, {useEffect, useState} from "react";
//import React, {Component, useEffect, useState} from "react";
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
/*
    const onSubmit = data => {

        console.log(data)
        console.log(data.firstName)

        const firstName =  data.firstName
        const lastName = data.lastName
        const genderInput =  data.gender
        const phoneNumber = data.phoneNumber
        const email =  data.email
        const education =  data.education
        const lessonCost =  data.lessonCost
        const moreDetails = data.moreDetails
        writeUserData()

    };
*/

    function onSubmit(data) {
        console.log(data)
        //console.log(data.firstName)
        writeUserData(data)
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
        console.log('multi:',value)
        courses1 = value

        // courses1=value.map( function( el ){
        //     return el.options.map( function( eln ){
        //         return eln.courseCode;
        //     })
        // });
    }

    const [loadedCourseState,setLoadedCoursestate] = React.useState([]);


    useEffect(() => {
        loadCourses()
    }, [])





    function loadCourses() {

        var db = firebase.firestore();
        var coursesRef = db.collection("courses")
        var query = coursesRef.where("courseCode", "!=", 'null');
        query.limit(10).get().then(function (querySnapshot) {
            let loadedCourses= [] ;
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.data());
                //debugger
                let docData = doc.data()
                loadedCourses.push({...docData
                });
            })
            console.log(loadedCourses)
            setLoadedCoursestate(loadedCourses)
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
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
            //first_name: data.firstName,
            //last_name: data.lastName,
            first_name: data.firstName,
            last_name: data.lastName,
            age: data.age,
            gender: Number(data.gender),
            phoneNumber: data.phoneNumber,
            email: data.email,
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
            }),
            //courses: data.courses
        });

    }



    function SelectCourses() {
        const menuitems = [
            {courseCode: 1, courseName: 'מתמטיקה בדידה'},
            {courseCode: 2, courseName: 'מבוא מורחב למדעי המחשב'},
            {courseCode: 3, courseName: 'אלגברה לינארית 1ב'},
            {courseCode: 4, courseName: 'מבוא לפסיכופתולוגיה'},
            {courseCode: 5, courseName: 'Class 5'},
            {courseCode: 6, courseName: 'Class 6'},
            {courseCode: 7, courseName: 'Class 7'},
            {courseCode: 8, courseName: 'Class 8'},
            {courseCode: 9, courseName: 'Class 9'},
        ]

        const [op] = useState(menuitems);

        return (
            <div className="SelectCourses" onSubmit={handleSubmit(onSubmit)}>
                <label className="reg-label">בחר את הקורסים שברצונך ללמד (ניתן לבחור יותר מקורס אחד)</label>
                <Multiselect options={loadedCourseState}
                             displayValue="courseName"
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
            {errors.age && errors.age.type === "min" && (<p className="p-error">על הגיל להיות חיובי</p>)}


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

            <label className="reg-label">כתובת Email:</label>
            <input className="reg-input"
                name="email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.email && errors.email.type === "pattern" && (<p className="p-error">על שדה זה להכיל כתובת מייל חוקית</p>)}


            <label className="reg-label">השכלה:</label>
            <input className="reg-input"
                name="education"
                ref={register({ required: true})}
            />
            {errors.education && <p className="p-error">שדה חובה</p>}

            <label className="reg-label">מספר שנות נסיון:</label>
            <input className="reg-input"
                name="experience"
                ref={register({ required: true})}
            />
            {errors.experience && <p className="p-error">שדה חובה</p>}

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


