import React, {useState, useEffect} from 'react';
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
    const [isNotHomePage,isNotHomeSet] = useState(window.location.pathname !== "/");
    console.log(isNotHomePage);
    useEffect(() => {
        return history.listen((location) => {
            isNotHomeSet(window.location.pathname !== "/");
        })
    },[history])


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
            <NavLink to="/SignIn">{ user ? auth.currentUser.displayName  : 'התחבר'}</NavLink>
        </li>
        {isNotHomePage?<li>
            <button onClick={() => history.goBack()}>חזור אחורה</button>
        </li>:null}

    </ul>
};

export default NavLinks;