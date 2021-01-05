import React, {useEffect} from 'react';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import Avatar from '@material-ui/core/Avatar';
//import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import teachers  from '../mocks/teachers'
import { Link } from 'react-router-dom';
import useStyles from "../Shared/useStyles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
//import TeachersList from "../pages/TeachersList";
//import { BrowserRouter as Router, Route,  Switch, useParams } from "react-router-dom";
import coursesItems from "../mocks/coursesItems.json"
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database'


import { useAuthState } from 'react-firebase-hooks/auth';


const ControllableStates = (props) => {
    const classes = useStyles();
    //const [value1, setValue] = React.useState({id: 0, name: ""});
    const [inputValue, setInputValue] = React.useState('');
    const [chosenTeachers, setTeacher] = React.useState([]);
    const [course, setCourse] = React.useState('');
    const [chosenCourse, setId] = React.useState(0);
    const handleTeacher = (chosenTeacher) => {
        setTeacher(chosenTeacher);
    };

    const [loadedCourseState,setLoadedCoursestate] = React.useState([]);


    useEffect(() => {
        loadCourses()
    }, [])



    function loadCourses() {

        var db = firebase.firestore();
        var coursesRef = db.collection("courses")
        var query = coursesRef.where("courseCode", "!=", 'null');
        query.get().then(function (querySnapshot) {
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




    const sumbitForm = () => {
         //let chosenTeachers = teachers.filter((teacher) => {
           //  return teacher.courses.includes(Number(course))
         //})
        //setId(value1.id)
        //console.log({chosenCourse})
        //handleTeacher(chosenTeachers)


    }




    const menuitems = [
        {id: 1, name: 'מתמטיקה בדידה' },
        {id: 2, name: 'מבוא מורחב למדעי המחשב' },
        {id: 3, name: 'אלגברה לינארית 1ב' },
        {id: 4, name: 'מבוא לפסיכופתולוגיה' },
        {id: 5, name: 'Class 5' },
        {id: 6, name: 'Class 6' },
        {id: 7, name: 'Class 7' },
        {id: 8, name: 'Class 8' },
        {id: 9, name: 'Class 9' },
    ];




    return (

        <div>
            <FormControl className={classes.formControl}>
                {/*<div>{`value: ${value1 !== null ? `'${value1.name}'` : 'null'}`}</div>*/}
                {/*<div>{`inputValue: '${inputValue}'`}</div>*/}
            <br />
            <Autocomplete
                defaultValue={null}
                //value={value1}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        //setValue(newValue);
                        setId(newValue)
                        console.log(newValue)
                        console.log(event.target)
                    }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={loadedCourseState}
                getOptionLabel={(option => option.courseName)}
                style={{ width: 300 }}
                //getOptionSelected = {(option => option.id === 2)}
                renderInput={(params) => <TextField {...params} label="בחר קורס" variant="outlined" />}
            />
            <Button color="primary" variant="contained" onClick={sumbitForm}>{chosenCourse?
                <Link to={`/courses/${chosenCourse.courseCode}` }> Search</Link>:
                <Link>Search</Link>}
            </Button>
            </FormControl>
        </div>
    );
}

export default ControllableStates;