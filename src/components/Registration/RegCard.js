import React from 'react';

import './RegCard.css';

const RegCard = props => {
    return (
        <div className={`Reg-Card ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
};

export default RegCard;
