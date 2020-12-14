import Button from '../Shared/Button'
import './TeacherPage.css';
import Card from "../Shared/Card";
import { useParams } from 'react-router-dom';
import teachers from "../mocks/teachers.json"


const TeacherItemExpanded = props =>{
    const teacherId = useParams().teacherId;
    const teacherim1 =teachers.filter(teacher1 => Number(teacher1.id) === Number(teacherId));
    const chosen_teacher = teacherim1[0];

    return (
        <Card className="place-item__content">
            <div className="place-item__image">
                <img src={chosen_teacher.imageUrl} alt={chosen_teacher.name} />
            </div>
            <div className="place-item__info">
                <h2>{chosen_teacher.name}</h2>
                <h3>תחום לימודים: {chosen_teacher.education}</h3>
                <p>מיקום שיעור: {chosen_teacher.locations}</p>
                <p>מיקום שיעור: {chosen_teacher.desc}</p>
                <p>מיקום שיעור: {chosen_teacher.age}</p>
            </div>
            <div className="place-item__actions">
                <Button to={"/"}>חזור לחיפוש</Button>

            </div>
        </Card>
    );

};

export default TeacherItemExpanded;