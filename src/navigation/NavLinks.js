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


const NavLinks = props => {
    let history = useHistory();
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    let ret1
    if (user) {
        ret1 = checkTeacherExists(auth)
    }

    const [isNotHomePage,isNotHomeSet] = useState(window.location.pathname !== "/");
    const [isTeacher,setIsTeacher] = useState(0)

    useEffect(() => {
        return history.listen((location) => {
            if(user) {
            }
            isNotHomeSet(window.location.pathname !== "/");
        })
    },[])


    function checkTeacherExists(us) {
        const db = firebase.firestore()

        const teacherRef = db.collection('teachers').doc(us.currentUser.email)
        teacherRef.get().then((doc) => {
            if (doc.exists) {

                ret["to_ret"] = 1
                setIsTeacher(1)
            } else {

                ret["to_ret"] = 0
                setIsTeacher(0)
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });


        if (ret["to_ret"]){

            return 1
        }
        return 0
    }

    return <ul className="nav-links">
        {user? <img src={auth.currentUser.photoURL} alt="" className={"profile_pic"}/>: null}
        {user ? <div className="name_style">
            {auth.currentUser.displayName}
        </div> :null}

        <li>
            <NavLink to="/" exact>בית</NavLink>
        </li>
        {user?
            isTeacher?
                <li>
                    <NavLink to="/updateUserForm">עדכן פרטים</NavLink>
                </li>:
                    <li>
                        <NavLink to="/register">הרשם כמורה</NavLink>
                    </li>:
                    null
        }




            <NavLink to="/SignIn">{ user ?  'התנתק' : 'התחבר'}</NavLink>


        {isNotHomePage?<li>
            <button onClick={() => history.goBack()}>חזור אחורה</button>



        </li>:null}


    </ul>
};

export default NavLinks;