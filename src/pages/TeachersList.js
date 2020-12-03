import React from 'react';
import { useParams } from 'react-router-dom';

import CourseTeachersList from '../components/CourseTeachersList';

const DUMMY_TEACHERS = [
    {
        id: 'p1',
        title: 'Dudi Oren',
        description: 'CEO at Assistau',
        imageUrl: 'https://img.haarets.co.il/img/1.8195303/1148634372.jpg?width=600',
        address: 'BALFUR',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u1'
    },
    {
        id: 'p2',
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
const UserPlaces = () => {
    const userId = 'u1';
    const loadedPlaces = DUMMY_TEACHERS; //.filter(place => place.creator === userId);
    return <CourseTeachersList items={loadedPlaces} />;
};

export default UserPlaces;
