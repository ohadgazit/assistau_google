import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const config = {
    apiKey: "AIzaSyDdCMmFaU2kFI7Rcx3PQf32_lHWlaHgt54",
    authDomain: "assistau-57bb4.firebaseapp.com",
    databaseURL: "https://assistau-57bb4.firebaseio.com",
    projectId: "assistau-57bb4",
    storageBucket: "assistau-57bb4.appspot.com",
    messagingSenderId: "690445027721",

};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
