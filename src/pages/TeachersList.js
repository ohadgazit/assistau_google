import React from 'react';
import { useParams } from 'react-router-dom';
//import teachers from '../mocks/teachers.json'
import CourseTeachersList from '../components/CourseTeachersList';

const DUMMY_TEACHERS = [
    {
        id: '1',
        title: 'Dudi Oren',
        description: 'CEO at Assistau',
        imageUrl: 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/17264250_1596514743709275_7928669354904976584_n.jpg?_nc_cat=104&cb=846ca55b-311e05c7&ccb=2&_nc_sid=9267fe&_nc_ohc=LfVLcwbE_-wAX8zgepp&_nc_ht=scontent-mxp1-1.xx&oh=0ddda56556b4c621f9d11040b9a323db&oe=5FED5953',
        address: 'BALFUR',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u1'
    },
    {
        id: '2',
        title: 'Lionel Messi',
        description: 'Barcelona',
        imageUrl: 'https://tmssl.akamaized.net/images/foto/normal/lionel-messi-ballon-dor-2019-1592819026-41968.jpg',
        address: 'Sokolov 24 Tel-Aviv',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u2'
    }
];
const TeachersList = () => {

    //const userId = 'u1';
    const courseId = useParams().courseId;
    const loadedPlaces = DUMMY_TEACHERS.filter(place => place.id === courseId);

  /// const {chosenCourse} = this.props.location.state;
   // console.log(chosenCourse);

    return  <CourseTeachersList items={loadedPlaces} />
};

export default TeachersList;
