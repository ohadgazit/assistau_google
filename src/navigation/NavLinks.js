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
        {user? <img src={auth.currentUser.photoURL} alt="" className={"profile_pic"}/>: null}
        {user ? <div className="name_style">
            {auth.currentUser.displayName}
        </div> :null}

        <li>
            <NavLink to="/" exact>בית</NavLink>
        </li>
        {user?<li>
            <NavLink to="/updateUserForm">עדכן פרטים</NavLink>
        </li>:null}
        {user?<li><NavLink to="/register">הרשם כמורה</NavLink></li>:null}
        <li>
            <NavLink to="/SignIn">{ user ?  'התנתק' : 'התחבר'}</NavLink>
        </li>
        {isNotHomePage?<li>
            <button onClick={() => history.goBack()}>חזור אחורה</button>
        </li>:null}


    </ul>
};

export default NavLinks;