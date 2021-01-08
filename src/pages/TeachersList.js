import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import CourseTeachersList from '../components/CourseTeachersList';
import ButtonAppBar from "../components/TeachersListAppBar";
import firebase from "firebase";

const TeachersList = () => {



    const [genderFilter,changeGender] = React.useState(0);
    const [ageSorting,changeAgeSorting] = React.useState(0);
    const [showFilterBar,setShowFilterBar] = React.useState(1);
    const [dataPulled,setDataPulled] = React.useState(0);


    const [loadedPlacesState,setLoadedPlacesState] = React.useState([]);
    const courseId = useParams().courseId;





    useEffect(() => {
        filterTeacherByCourseNum(courseId)
    }, [])

    const loadedPlaces2 = loadedPlacesState.filter(teacher => genderFilter > 0 ? teacher.gender === (Number(genderFilter)): 1)

    if (ageSorting === 0){
        loadedPlaces2.sort((a,b) => Number(a.rating)>Number(b.rating) ? -1 : 1);
    }

    else if (ageSorting === 1){
        loadedPlaces2.sort((a,b) => Number(a.age)>Number(b.age) ? 1 : -1);
    }
    else if (ageSorting === 2){
        loadedPlaces2.sort((a,b) => Number(a.age)>Number(b.age) ? -1 : 1);
    }


    function filterTeacherByCourseNum(course_num) {

        var db = firebase.firestore();
        var teachersRef = db.collection("teachers");
        var query = teachersRef.where("courses", "array-contains", course_num);
        query.get().then(function (querySnapshot) {
            let loadedPlaces3 = [] ;
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.data());
                //debugger
                let docData = doc.data()
                loadedPlaces3.push({...docData
                });
            })
            setLoadedPlacesState(loadedPlaces3)
            setDataPulled(1);
        })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
    }




        return (
            <div>
                <ButtonAppBar dataGender={
                    {genderFilter: genderFilter, changeGender: changeGender.bind(this)}
                } dataAge={
                    {ageSorting: ageSorting, changeAgeSorting: changeAgeSorting.bind(this)}
                }/>
                <CourseTeachersList items={loadedPlaces2}
                                    from_course={courseId}
                                    gotData={dataPulled}
                                    showBar={{
                                        showFilterBar: showFilterBar,
                                        setShowFilterBar: setShowFilterBar.bind(this)
                                    }}
                />
            </div>
        );

};

export default TeachersList;
