import React, { useRef, useState } from 'react';
import './MainPage.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
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


class SignInScreen extends React.Component {
    render() {
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        );
    }
}


const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();





function SignInPage() {
    const [user] = useAuthState(auth);


    if (user) {
        console.log("dudi", user.displayName)
    } else {
        console.log(user)
    }


    return (

        <div className="App">
            <header>
                <h3>AssisTAU Playground - Firebase Google Auth + DB </h3>
                <SignOut />
            </header>
            <section>
                {user ?  <SignIn /> : <SignIn />}
            </section>
        </div>
    );

}



function SignIn() {
    // const signInWithGoogle = () => {
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     provider.setCustomParameters({
    //         hd: "mail.tau.ac.il"
    //     });
    //     auth.signInWithPopup(provider);
    // }


    return (
        <>

            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

            {/*<button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>*/}
            {/*<p>Do not violate the community guidelines or you will be banned for life!</p> */}
        </>
    )

}

function SignOut() {
    return auth.currentUser && (
        <div>
            <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
            <button className="user-name" onClick={() => writeUserData()}> {auth.currentUser.displayName} </button>
        </div>

    )
}

function writeUserData() {

    const userId = auth.currentUser.uid
    const name = auth.currentUser.displayName
    const email = auth.currentUser.email
    const imageUrl = auth.currentUser.photoURL
    firebase.database().ref('users/' + userId).set({
        uid : userId,
        username: name,
        email: email,
        profile_picture : imageUrl,
        timestamp : new Date().getTime()
    });
}


export default SignInPage;


