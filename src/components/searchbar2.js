import React, {useEffect} from 'react';
import Button from '../Shared/Button'
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import Avatar from '@material-ui/core/Avatar';
//import Select from '@material-ui/core/Select';
//import Button from '@material-ui/core/Button';
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
import './searchbar2.css';


import { useAuthState } from 'react-firebase-hooks/auth';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {createFilterOptions} from "@material-ui/lab";



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








    const menuitems = [
        {id: 1, courseName: 'מתמטיקה בדידה' },
        {id: 2, courseName: 'מבוא מורחב למדעי המחשב' },
        {id: 3, courseName: 'אלגברה לינארית 1ב' },
        {id: 4, courseName: 'מבוא לפסיכופתולוגיה' },
        {id: 5, courseName: 'Class 5' },
        {id: 6, courseName: 'Class 6' },
        {id: 7, courseName: 'Class 7' },
        {id: 8, courseName: 'Class 8' },
        {id: 9, courseName: 'Class 9' },
    ];



    const filterOptions = createFilterOptions({
        limit:30,
    });

    return (

        <div>
            <FormControl className={classes.formControl}>
                {/*<div>{`value: ${value1 !== null ? `'${value1.name}'` : 'null'}`}</div>*/}
                {/*<div>{`inputValue: '${inputValue}'`}</div>*/}
            <br />

            <Autocomplete
                filterOptions={filterOptions}
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
                /*options={loadedCourseState}*/
                options ={loadedCourseState}
                getOptionLabel={(option => option.courseName)}
                // style={{ width: 300 }}
                style={{ width: 500 }}
                renderInput={(params) =>  <TextField className="textfield__searchbar" {...params}  label="הקלד שם או מספר קורס" variant="outlined" /> }

            />
            {/*<Button  color="primary" variant="contained" onClick={sumbitForm}>{chosenCourse?
                <Link to={`/courses/${chosenCourse.courseCode}` }> Search</Link>:
                <Link>Search</Link>}
            </Button>*/}
            {chosenCourse?<Button color="primary" variant="contained" to={`/courses/${chosenCourse.courseCode}` }>
                {/*Search*/}
                חיפוש
            </Button>: <Button color="primary" variant="contained" >
                {/*Search*/}
                חיפוש
            </Button>
                }
            </FormControl>

        </div>


    );
}


export default ControllableStates;