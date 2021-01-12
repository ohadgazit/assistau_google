import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {useForm} from "react-hook-form";
import "./RegStyles.css";
import {Multiselect} from "multiselect-react-dropdown";
import firebase from "firebase";
import Card from "../../Shared/Card";
import RegCard from "./RegCard";


function UpdateDetails() {
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

    function SelectCourses() {
        const menuitems = [
            {id: 1, name: 'מתמטיקה בדידה'},
            {id: 2, name: 'מבוא מורחב למדעי המחשב'},
            {id: 3, name: 'אלגברה לינארית 1ב'},
            {id: 4, name: 'מבוא לפסיכופתולוגיה'},
            {id: 5, name: 'Class 5'},
            {id: 6, name: 'Class 6'},
            {id: 7, name: 'Class 7'},
            {id: 8, name: 'Class 8'},
            {id: 9, name: 'Class 9'},
        ]

        const [op] = useState(menuitems);

        //

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
        //

        return (
            <div className="SelectCourses" onSubmit={handleSubmit(onSubmit)}>
                <label className="reg-label">בחר את הקורסים שברצונך ללמד (ניתן לבחור יותר מקורס אחד)</label>
                {/*<Multiselect options={op}*/}
                <Multiselect options={loadedCourseState}
                             displayValue="courseName"
                             name="courses"
                             ref={register({required: true})}
                             onSelect={onChangeInput}
                             placeholder=''
                             //value={"מתמטיקה בדידה"} //replace with courses list from DB
                />
            </div>
        );
    }

    return (
        <RegCard>
        <form className="reg-form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="reg-header">עדכון פרטים</h1>
            <h3 className="reg-header-small">עדכן את השדות הרלוונטיים. את השאר השאר ללא שינוי</h3>
            <label className="reg-label">שם פרטי:</label>
            <input className="reg-input" name="firstName" ref={register({ required: true,minLength: 2  })}
                   defaultValue={"דוד"} //replace with firstName from DB
            />
            {errors.firstName && errors.firstName.type === "minLength" && (<p className="p-error">על שדה זה להכיל לפחות 2 תווים</p>)}

            <label className="reg-label">שם משפחה:</label>
            <input className="reg-input" name="lastName" ref={register({ required: true, minLength: 2 })}
                   defaultValue={"אורן"} //replace with lastName from DB
            />
            {errors.lastName && errors.lastName.type === "minLength" && (<p className="p-error">על שדה זה להכיל לפחות 2 תווים</p>)}

            <label className="reg-label">גיל:</label>
            <input className="reg-input"
                name="age"
                type="number"
                ref={register({ required: true, min:0})}
                defaultValue={45} //replace with the age from DB
            />
            {errors.age && errors.age.type === "min" && (<p className="p-error">על הגיל להיות חיובי</p>)}


            <label className="reg-label" >מגדר:</label>
            <select name="gender" ref={register({ required: true })} dir="rtl" style={styles.select}
                    defaultValue={"male"} //replace with gender from DB
            >
                <option value="" >בחר..</option>
                <option value="male">גבר</option>
                <option value="female">אישה</option>
            </select>


            <label className="reg-label">מספר טלפון:</label>
            <input className="reg-input" name="phoneNumber" ref={register({ required: true,minLength:10, maxLength:10, pattern:/^[0-9]*$/})}
                   defaultValue={"0508238536"} //replace with phoneNumber from DB
            />
            {errors.phoneNumber && errors.phoneNumber.type === "minLength" && (<p className="p-error">על מספר הטלפון להכיל 10 ספרות</p>)}
            {errors.phoneNumber && errors.phoneNumber.type === "maxLength" && (<p className="p-error">על מספר הטלפון להכיל 10 ספרות</p>)}
            {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (<p className="p-error">על שדה זה להכיל ספרות בלבד</p>)}

            <label className="reg-label">כתובת Email:</label>
            <input className="reg-input"
                name="email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                defaultValue={"davidoren@mail.tau.ac.il"} //replace with email from DB
            />
            {errors.email && errors.email.type === "pattern" && (<p className="p-error">על שדה זה להכיל כתובת מייל חוקית</p>)}


            <label className="reg-label">השכלה:</label>
            <input className="reg-input"
                name="education"
                ref={register({ required: true})}
                defaultValue={"מדעי המחשב ופילוסופיה"} //replace with education from DB
            />

            <label className="reg-label">מספר שנות נסיון:</label>
            <input className="reg-input"
                name="experience"
                ref={register({ required: true})}
                defaultValue={"3"} //replace with experience from DB
            />

            <label className="reg-label">עלות שיעור:</label>
            <input className="reg-input"
                name="lessonCost"
                type="number"
                ref={register({ required: true, min:0})}
                defaultValue={"120"} //replace with lessonCost from DB
            />
            {errors.lessonCost && errors.lessonCost.type === "min" && (<p className="p-error">נא הזן ערך חיובי</p>)}


            <label className="reg-label">הזן תיאור קצר על עצמך ועל שיטת הלימוד שלך ופרטים נוספים כרצונך</label>
            <textarea className="reg-textarea" name="desc" ref={register({maxLength: 144})} />

            <SelectCourses/>

            <input className="reg-input" disabled={isSubmitting} type="submit" value="עדכן פרטים"/>
        </form>
        </RegCard>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<UpdateDetails />, rootElement );

export default UpdateDetails


