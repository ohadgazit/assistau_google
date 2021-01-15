import React, {useEffect, useRef, useState} from 'react';
import './MainPage.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database'
import { useHistory } from "react-router-dom";
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
console.log(window.history.back());
// Configure FirebaseUI.
const uiConfig = {

    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/signedIn',
   // signInSuccessUrl: window.history.back,
    signInSuccessUrl: window.location.href,
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
        console.log("connected user:", user.displayName)
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
                {user ?  null : <SignIn />}
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
            {/*<button className="user-name" onClick={() => writeUserData()}> {auth.currentUser.displayName} </button>
            <button className="test-button" onClick={() => readUserData()}> Read Data </button>
            <button className="test-button" onClick={() => writeUserData2()}> Write to collection </button>*/}
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

function writeUserData2() {
    const userId = auth.currentUser.uid
    const name = auth.currentUser.displayName
    const email = auth.currentUser.email
    const imageUrl = auth.currentUser.photoURL
    var db = firebase.firestore();
    db.collection("teachers").doc(auth.currentUser.uid).set({
        uid : userId,
        username: name,
        email: email,
        profile_picture : imageUrl,
        timestamp : new Date().getTime()
    })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

    var teachersRef = db.collection("teachers");

    teachersRef.doc('4').set({
    "name": "דוד אורן","id" : 1, "gender": 2, "phone_number": "+972508238536","experience": 2, "age": 28,"email": "david@oren.com" ,"locations": "מרכז תל אביב",
        "education": "מדעי המחשב ופילוסופיה", "desc": "מתרגל בקורס מבוא למדעי המחשב", "courses": [1,3,5], "imageUrl":"https://react.semantic-ui.com/images/avatar/large/matthew.png"
    });
    teachersRef.doc('5').set({
    "name": "שירי מיימון","id" : 2, "gender": 1, "phone_number": "0508238536","experience": 1,  "age": 28,"email": "israel@israeli.com","locations": "אוניברסיטה",
        "education": "מדעי המחשב ופילוסופיה",  "desc": "Wow teacher", "courses": [2,4,8], "imageUrl": "http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png"

    });
    teachersRef.doc('6').set({

    "name": "אוהד גזית","id" : 3, "gender": 2, "phone_number": "0508238536", "experience": 3, "age": 28,"email": "ohad@gazit.com","locations": "מרכז תל אביב",
        "education": "מגדר","desc": "Wow teacher", "courses": [1,4,6], "imageUrl": "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"

    });
    teachersRef.doc('7').set({
    "name": "עדי פישר","id" : 4, "gender": 1, "phone_number": "0508238536","experience": 2,  "age": 28,"email": "ploni@almoni.com","locations": "מרכז תל אביב",
        "education": "מדעי המחשב ופסיכולוגיה","desc": "Wow teacher", "courses": [1,4,6], "imageUrl": "http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png"
    });
    teachersRef.doc('8').set({
    "name": "לאו מסי","id" : 5, "gender": 2, "phone_number": "0508238536","experience": 2,  "age": 28,"email": "hillel@shachar.com","locations": "מרכז תל אביב",
        "education": "מדעי המחשב ופילוסופיה","desc": "Wow teacher", "courses": [1,9,6], "imageUrl": "http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png"
    });

}

function readUserData() {
    var db = firebase.firestore();
    var teachersRef = db.collection("teachers");
    var query = teachersRef.where("courses","array-contains", 1);
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
        });
    })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}


export default SignInPage;


