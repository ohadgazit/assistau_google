import React, {useEffect} from 'react';
import Button from '../../Shared/Button'

import FormControl from '@material-ui/core/FormControl';

import useStyles from "../../Shared/useStyles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database'


import {createFilterOptions} from "@material-ui/lab";



const ControllableStates = (props) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState('');
    const [chosenCourse, setId] = React.useState(0);



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

            setLoadedCoursestate(loadedCourses)
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }












    const filterOptions = createFilterOptions({
        limit:10,
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

                    }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options ={loadedCourseState}
                getOptionLabel={(option => option.courseName)}
                style={{ width: 500 }}

                renderInput={(params) =>  <TextField  {...params}  label="הקלד שם או מספר קורס" variant="outlined" /> }

            />
            {chosenCourse?<Button color="primary" variant="contained" to={`/courses/${chosenCourse.courseCode}` }>
                חיפוש
            </Button>: <Button color="primary" variant="contained" >
                חיפוש
            </Button>
                }
            </FormControl>

        </div>


    );
}


export default ControllableStates;