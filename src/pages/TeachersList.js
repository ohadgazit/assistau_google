import React from 'react';
import { useParams } from 'react-router-dom';
import teachers from '../mocks/teachers.json'
import CourseTeachersList from '../components/CourseTeachersList';

/*
const DUMMY_TEACHERS = [
    {
        courses: '1',
        name: 'דודי אורן',
        education: 'מדעי המחשב ופילוסופיה',
        imageUrl: 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/17264250_1596514743709275_7928669354904976584_n.jpg?_nc_cat=104&cb=846ca55b-311e05c7&ccb=2&_nc_sid=9267fe&_nc_ohc=LfVLcwbE_-wAX8zgepp&_nc_ht=scontent-mxp1-1.xx&oh=0ddda56556b4c621f9d11040b9a323db&oe=5FED5953',
        locations: 'מרכז תל אביב',
        creator: 'u1'
    },
    {
        courses: '2',
        name: 'בני ברוכים',
        education: 'מדעי המחשב ופסיכולוגיה',
        imageUrl: 'https://tmssl.akamaized.net/images/foto/normal/lionel-messi-ballon-dor-2019-1592819026-41968.jpg',
        locations: 'בית התלמיד, אוניברסיטה',
        creator: 'u2'
    },
    {
        courses: '2',
        name: 'פיני בלילי',
        education: 'מגדר',
        imageUrl: 'https://images.one.co.il/images/d/400_221/gg827982.jpg',
        locations: 'בית התלמיד',
        creator: 'u2'
    }

];*/
const TeachersList = () => {

    //const userId = 'u1';
    const courseId = useParams().courseId;
    const loadedPlaces = teachers.filter(teacher => teacher.courses.includes(Number(courseId)));
  /// const {chosenCourse} = this.props.location.state;
   // console.log(chosenCourse);

    return  <CourseTeachersList items={loadedPlaces} />
};

export default TeachersList;
