import Button from '../Shared/Button'
import './TeacherItem.css';
import Card from "../Shared/Card";

const TeacherItem = props => {

    return (

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.name} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.name}</h2>
                        <h3>תחום לימודים: {props.education}</h3>
                        <p>מיקום שיעור: {props.locations}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button to={"/"}>חזור לחיפוש</Button>
                        <Button to={`/teachers/${props.id}`}  >מידע נוסף</Button>
                    </div>
                </Card>
            </li>

    );
};

export default TeacherItem;