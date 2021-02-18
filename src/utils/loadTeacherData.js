import firebase from "firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import React from "react";
const auth = firebase.auth();


export function loadTeacherData(user) {
    let docData = null
    const db = firebase.firestore();
    let teachersCollection = db.collection("teachers")
    //if (user) {var current_email = auth.currentUser.email}
    //console.log("qqqqqqqqqqqqqqqqqqq",user)
    //console.log(current_email)
    let docRef = teachersCollection.doc('ohadgazit@mail.tau.ac.il')
    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("ABCDABCDE",doc)
            console.log(doc.get("education"))
            //let teacherEdu = doc.get("education")
            docData = doc.data()
            //console.log("Document data:", doc.data());
            //console.log(docData.phoneNumber)
            //setLoadedTeacherstate(docData)
            console.log("DOC DATA DOC DATA DOC DTARA",doc.data())
            return doc.data();

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    return docData
}