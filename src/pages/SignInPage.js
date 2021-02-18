import React, {useEffect, useRef, useState} from 'react';
import './MainPage.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database'
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import RegCard from "../components/Registration/RegCard";
import "./ButtonSignOut.css";
import "./SignInCard.css";
import {FirebaseAuth} from "react-firebaseui";

const config = {
    apiKey: "AIzaSyDdCMmFaU2kFI7Rcx3PQf32_lHWlaHgt54",
    authDomain: "assistau-57bb4.firebaseapp.com",
    databaseURL: "https://assistau-57bb4.firebaseio.com",
    projectId: "assistau-57bb4",
    storageBucket: "assistau-57bb4.appspot.com",
    messagingSenderId: "690445027721",
    appId: "1:690445027721:web:30470e9edd0b33fe51b958",
    measurementId: "G-QXELTZ6ZFY"
};

firebase.initializeApp(config);
// Configure FirebaseUI.

let previous_route = document.referrer
console.log("sdddddddddddddddddddddddd",previous_route)



const auth = firebase.auth();

function SignInPage(props) {
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        //signInSuccessUrl: '/',
        signInSuccessUrl: props.location.state.previous_page,
        //signInSuccessUrl: window.location.href,
        //signInSuccessUrl:  window.location.state,
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                customParameters: {
                    hd: "mail.tau.ac.il"
                }
            },
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID, // Twitter does not support scopes.
            //firebase.auth.EmailAuthProvider.PROVIDER_ID // Other providers don't need to be given as object.
        ]
    };
    console.log("XXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxx",props)
    const [user] = useAuthState(auth);

    if (user) {
        console.log("connected user:", user.displayName)
    } else {
        console.log(user)
    }


    return (

        <div className="App">
            <RegCard className ="SingIn-Card">
            <section>
                {user ? <p className="SingInText">לחץ על הכפתור על מנת להתנתק </p> :
                    <div>
                        <p className="SingInText"> התחבר באמצעות המייל האוניברסיטאי </p>
                        <SignIn uiConfig={uiConfig}/>
                    </div>}
                <SignOut />
            </section>
            </RegCard>
        </div>

    );

}

export function SignIn(props) {

    return (
        <>
            <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={firebase.auth()}/>
        </>
    )
}

// export function SignIn2() {
//     return (
//         <>
//             <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
//         </>
//     )
// }

export function SignOut() {
    return auth.currentUser && (
        <div>
            <button className="buttonSingOut" color="primary" onClick={() => auth.signOut()}>התנתק</button>
        </div>
    )
}
export function SignOut2() {
    return <button  onClick={() => auth.signOut()}>התנתק</button>
}


export default SignInPage;


