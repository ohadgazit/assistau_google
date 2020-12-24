import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import teachers from '../mocks/teachers.json'
import CourseTeachersList from '../components/CourseTeachersList';
import ButtonAppBar from "../components/TeachersListAppBar";
import firebase from "firebase";

const TeachersList = () => {



    const [genderFilter,changeGender] = React.useState(0);
    const [loadedPlacesState,setLoadedPlacesState] = React.useState([]);
    //const userId = 'u1';
    const courseId = useParams().courseId;
    //const loadedPlaces = teachers.filter(teacher => teacher.courses.includes(Number(courseId)) &&
      //  teacher.gender.includes(Number(genderFilter)));

    const loadedPlaces = teachers.filter(teacher => teacher.courses.includes(Number(courseId)) &&
        (genderFilter > 0? teacher.gender === (Number(genderFilter)): 1));


    useEffect(() => {
        filterTeacherByCourseNum(Number(courseId))
    }, [])


    function filterTeacherByCourseNum(course_num) {

        var db = firebase.firestore();
        var teachersRef = db.collection("teachers");
        var query = teachersRef.where("courses", "array-contains", course_num);
        query.get().then(function (querySnapshot) {
            let loadedPlaces3 = [] ;
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
                //debugger
                let docData = doc.data()
                loadedPlaces3.push({...docData
                });
            })
            setLoadedPlacesState(loadedPlaces3)
        })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
    }




  /// const {chosenCourse} = this.props.location.state;
   // console.log(chosenCourse);
    return  (

        <div>
            <ButtonAppBar data={
                {genderFilter:genderFilter,changeGender:changeGender.bind(this)}
            }/>
        <CourseTeachersList items={loadedPlacesState} />
        </div>
        );
};

export default TeachersList;
