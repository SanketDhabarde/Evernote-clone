import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC1sCbR3BJz_Gdd5id4twbmEhUL5L0fRO8",
    authDomain: "evernote-clone-bbda8.firebaseapp.com",
    projectId: "evernote-clone-bbda8",
    storageBucket: "evernote-clone-bbda8.appspot.com",
    messagingSenderId: "478007018870",
    appId: "1:478007018870:web:d9f2ea12b9ccecbc32a657"
});

const db= firebaseApp.firestore();

export default db;