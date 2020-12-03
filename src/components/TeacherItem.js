import React, { useState } from 'react';
import Button from '../Shared/Button'
import './TeacherItem.css';
import Card from "../Shared/Card";

const TeacherItem = props => {

    return (

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button to={`/places/${props.id}`}>EDIT</Button>
                        <Button danger  >DELETE</Button>
                    </div>
                </Card>
            </li>
    );
};

export default TeacherItem;