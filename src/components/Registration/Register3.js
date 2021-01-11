import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {useForm} from "react-hook-form";
//import ErrorMessage from "./errorMessage";
import "./RegStyles.css";
import {Multiselect} from "multiselect-react-dropdown"
import Card from "../../Shared/Card"
import firebase from "firebase";

function Register3() {
    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting }
    } = useForm();
    const onSubmit = data => {
        console.log(data)
        console.log(data.firstName)
    };

    //for 'gender' field
    const styles={
        select:{
            width:'100%',
            maxWidth: 600,
        }
    }

    function onChangeInput(value){
        console.log('multi:',value)
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

    // function writeUserData(){
    //     const auth = firebase.auth();
    //     const userId = auth.currentUser.uid
    //     const email = auth.currentUser.email
    //     const imageUrl = auth.currentUser.photoURL
    //     firebase.database().ref('users/').set({
    //         first_name: {values:firstName},
    //         last_name: {values:lastName},
    //         gender: {values:gender},
    //         phoneNumber: {values:phoneNumber},
    //         email: {values:email},
    //         education: {values:education},
    //         lessonCost: {values:lessonCost},
    //         moreDetails: {values:moreDetails},
    //         imageUrl: {imageUrl},
    //         timestamp : new Date().getTime()
    //     });
    //
    // }



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
        <Card>
        <form className="reg-form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="reg-header">הרשמה</h1>
            <label className="reg-label">:שם פרטי</label>
            <input className="reg-input" name="firstName" ref={register({ required: true,minLength: 2  })} />
            {errors.firstName && errors.firstName.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.firstName && errors.firstName.type === "minLength" && (<p className="p-error">על שדה זה להכיל לפחות 2 תווים</p>)}

            <label className="reg-label">:שם משפחה</label>
            <input className="reg-input" name="lastName" ref={register({ required: true, minLength: 2 })}/>
            {errors.lastName && errors.lastName.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.lastName && errors.lastName.type === "minLength" && (<p className="p-error">על שדה זה להכיל לפחות 2 תווים</p>)}

            <label className="reg-label">גיל</label>
            <input className="reg-input"
                name="age"
                type="number"
                ref={register({ required: true, min:0})}
            />
            {errors.age && errors.age.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.age && errors.age.type === "min" && (<p className="p-error">על הגיל להיות חיובי</p>)}


            <label className="reg-label">:מגדר</label>
            <select name="gender" ref={register({ required: true })} dir="rtl" style={styles.select}>
                <option value="" >בחר..</option>
                <option value="male">גבר</option>
                <option value="female">אישה</option>
            </select>
            {errors.gender && <p className="p-error">שדה חובה</p>}


            <label className="reg-label">:מספר טלפון</label>
            <input className="reg-input" name="phoneNumber" ref={register({ required: true,minLength:10, maxLength:10, pattern:/^[0-9]*$/})}/>
            {errors.phoneNumber && errors.phoneNumber.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.phoneNumber && errors.phoneNumber.type === "minLength" && (<p className="p-error">על מספר הטלפון להכיל 10 ספרות</p>)}
            {errors.phoneNumber && errors.phoneNumber.type === "maxLength" && (<p className="p-error">על מספר הטלפון להכיל 10 ספרות</p>)}
            {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (<p className="p-error">על שדה זה להכיל ספרות בלבד</p>)}

            <label className="reg-label">:Email כתובת</label>
            <input className="reg-input"
                name="email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.email && errors.email.type === "pattern" && (<p className="p-error">על שדה זה להכיל כתובת מייל חוקית</p>)}


            <label className="reg-label">:השכלה</label>
            <input className="reg-input"
                name="education"
                ref={register({ required: true})}
            />
            {errors.education && <p className="p-error">שדה חובה</p>}

            <label className="reg-label">:מספר שנות נסיון</label>
            <input className="reg-input"
                name="experience"
                ref={register({ required: true})}
            />
            {errors.experience && <p className="p-error">שדה חובה</p>}

            <label className="reg-label">:עלות שיעור</label>
            <input className="reg-input"
                name="lessonCost"
                type="number"
                ref={register({ required: true, min:0})}
            />
            {errors.lessonCost && errors.lessonCost.type === "required" && (<p className="p-error">שדה חובה</p>)}
            {errors.lessonCost && errors.lessonCost.type === "min" && (<p className="p-error">נא הזן ערך חיובי</p>)}


            <label className="reg-label">הזן תיאור קצר על עצמך ועל שיטת הלימוד שלך ופרטים נוספים כרצונך</label>
            <textarea className="reg-textarea" name="aboutyou" ref={register({maxLength: 144})} />

            <SelectCourses/>


            <input className="reg-input" disabled={isSubmitting} type="submit" value="הירשם"/>
        </form>
        </Card>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Register3 />, rootElement );

export default Register3


