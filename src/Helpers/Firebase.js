import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyD7QRijJUxIJIKgTtCd-ZdkHd2dwE8mxXs",
    authDomain: "ubertutor018175-309ec.firebaseapp.com",
    databaseURL: "https://ubertutor018175-309ec.firebaseio.com",
    projectId: "ubertutor018175-309ec",
    storageBucket: "ubertutor018175-309ec.appspot.com",
    messagingSenderId: "884760973119",
    appId: "1:884760973119:web:8c3d287fea8e639b0a0d8a",
    measurementId: "G-YN2NQ88746",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}