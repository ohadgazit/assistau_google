import React from 'react';
import Card from "../../Shared/Card";
import TeacherItem from "./TeacherItem";
import './CourseTeachersList.css';
import Button from "../../Shared/Button";
import Typography from '@material-ui/core/Typography';





const CourseTeachersList = props => {








    if (props.items.length === 0 && props.gotData === 1) {
        return (
            < div className="places-list center" >
                <Card>
                    <h2>לא קיימים מורים לקורס זה, אולי תהיה הראשון?</h2>
                    <Button to="/">חזור לדף החיפוש</Button>
                </Card>
            </div >
        );
    }
    if (props.items.length === 0 ) {
        return (
            < div className="placees-list center" >
                <Card>
                    <h2>טוען מורים...</h2>

                </Card>
            </div >
        );
    }

    console.log(props.items[0].reviews)
    console.log(props.items[0].courses)


        return <ul className="place-list">

            <Typography>
           {props.items[0].course_list.filter(item => item['courseCode'] === props.from_course).map(chosenCourse =>(
                <h2 align='center'>מציג תוצאות עבור הקורס: {chosenCourse['courseName']}  </h2>
            ))}

            </Typography>

            {/*<div>*/}
            {/*    {people.filter(person => person.age < 60).map(filteredPerson => (*/}
            {/*        <li>*/}
            {/*            {filteredPerson.name}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {props.items.map(place => (

                <TeacherItem
                    key={place.id}
                    id={place.id}
                    image={place.imageUrl}
                    name={place.name}
                    first_name = {place.first_name}
                    last_name = {place.last_name}
                    education={place.education}
                    locations={place.locations}
                    creatorId={place.creator}
                    age={place.age}
                    desc={place.desc}
                    phone_number ={place.phoneNumber}
                    from_course ={props.from_course}
                    reviews = {[place.reviews]}
                    rating = {place.rating}
                    lessonCost = {place.lessonCost}
                    experience = {place.experience}
                    email = {place.email}
                    courses = {place.courses}
                    course_list = {place.course_list}

                />

            ))}
        </ul>;





};

export default CourseTeachersList;