import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD3hJCEMWlunamuu_1aETjtKlMQoBkEtvY",
    authDomain: "catch-of-the-day-jpz.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-jpz.firebaseio.com",
    projectId: "catch-of-the-day-jpz",
    storageBucket: "catch-of-the-day-jpz.appspot.com",
    messagingSenderId: "445964042780",
    appId: "1:445964042780:web:f4f5d39e5dea7dbd9795d9"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;