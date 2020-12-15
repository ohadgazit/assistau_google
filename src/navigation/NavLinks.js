import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/database'
import 'firebase/auth';
import { useHistory } from "react-router-dom";


import { useAuthState } from 'react-firebase-hooks/auth';

import './NavLinks.css';



const NavLinks = props => {
    let history = useHistory();
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    if (user) {
        console.log("connected user:", user.displayName)
    } else {
        console.log("not connected")
    }

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>בית</NavLink>
        </li>
        {user?<li>
            <NavLink to="/u1/places">איזור אישי</NavLink>
        </li>:<li>
            <NavLink to="/UserForm">הרשם</NavLink>
        </li>}
        <li>
            <NavLink to="/SignIn">התחבר</NavLink>
        </li>
        <li>
            <button onClick={() => history.goBack()}>חזור אחורה</button>
        </li>
    </ul>
};

export default NavLinks;