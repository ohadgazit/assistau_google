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

var ret = {"to_ret":0}

function checkTeacherExists(us) {
    const db = firebase.firestore()
    console.log(us.currentUser.email)
    //const teacherRef = db.collection('teachers').doc(user.email)
    const teacherRef = db.collection('teachers').doc(us.currentUser.email)
    //var ret = {"to_ret":0}
    teacherRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            ret["to_ret"] = 1
        } else {
            console.log("No such document!");
            ret["to_ret"] = 0
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    console.log("this is ret",ret)
    if (ret["to_ret"]){
        console.log("returning 1")
        return 1
    }
    return 0
    /*
    if (teacherRef) {
        console.log("Teacher with email:",auth.currentUser.email,"exists")
        return 1
    }
    else {
        console.log("No such teacher exists")
        return 0
    }

     */

}

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
    },[history,history.location])




    return <ul className="nav-links">
        {user? <img src={auth.currentUser.photoURL} alt="" className={"profile_pic"}/>: null}
        {user ? <div className="name_style">
            {auth.currentUser.displayName}
        </div> :null}

        <li>
            <NavLink to="/" exact>בית</NavLink>
        </li>
        {user?
            checkTeacherExists(auth)?
                <li>
                    <NavLink to="/updateUserForm">עדכן פרטים</NavLink>
                </li>:
                    <li>
                        <NavLink to="/register">הרשם כמורה</NavLink>
                    </li>:
                    null
        }




        <li>
            <NavLink to="/SignIn">{ user ?  'התנתק' : 'התחבר'}</NavLink>
        </li>
        {isNotHomePage?<li>
            <button onClick={() => history.goBack()}>חזור אחורה</button>
        </li>:null}


    </ul>
};

export default NavLinks;