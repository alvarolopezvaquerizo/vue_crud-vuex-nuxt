import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");


const firebaseConfig = {
    apiKey: "AIzaSyA2NHWiI6xrJ3xBmmDenJ89MzJNdFrd2Pg",
    authDomain: "crud-vuex-nuxt.firebaseapp.com",
    databaseURL: "https://crud-vuex-nuxt.firebaseio.com",
    projectId: "crud-vuex-nuxt",
    storageBucket: "crud-vuex-nuxt.appspot.com",
    messagingSenderId: "75218052679",
    appId: "1:75218052679:web:fd360081b34cef68327362"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, db, auth, storage }