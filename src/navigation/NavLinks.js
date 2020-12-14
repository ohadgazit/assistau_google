import React from 'react';
import { NavLink } from 'react-router-dom';
import SignInPage from  "../pages/SignInPage";
//import firebase from "firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/database'
import 'firebase/auth';


import { useAuthState } from 'react-firebase-hooks/auth';

import './NavLinks.css';



const NavLinks = props => {
    const auth = firebase.auth();
    const connected = React.useState(0);
    const [user] = useAuthState(auth);
    if (user) {
        console.log("connected user:", user.displayName)
    } else {
        console.log(user)
    }

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>בית</NavLink>
        </li>
        {connected?<li>
            <NavLink to="/u1/places">איזור אישי</NavLink>
        </li>:<li>
            <NavLink to="/UserForm">הרשם</NavLink>
        </li>}
        <li>
            <NavLink to="/SignIn">התחבר</NavLink>
        </li>
        {/*<li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>*/}
    </ul>
};

export default NavLinks;