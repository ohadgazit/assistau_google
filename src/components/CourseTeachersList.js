import React from 'react';
import Card from "../Shared/Card";

import TeacherItem from "./TeacherItem";
import './CourseTeachersList.css';

const CourseTeachersList = props => {
    if (props.items.length === 0) {
        return (
            < div className="placees-list center" >
                <Card>
                    <h2>לא קיימים מורים לקורס זה, אולי תהיה הראשון?</h2>
                    <button>Share Place</button>
                </Card>
            </div >
        );
    }

    return <ul className="place-list">
        {props.items.map(place => (
            <TeacherItem
                key={place.id}
                id={place.id}
                image={place.imageUrl}
                name={place.name}
                education={place.education}
                locations={place.locations}
                creatorId={place.creator}

            />
        ))}
    </ul>;

};

export default CourseTeachersList;