import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCyoTDyLrerS9XHrASczT36G08E_OoQ7YI",
    authDomain: "crwn-db-202f1.firebaseapp.com",
    projectId: "crwn-db-202f1",
    storageBucket: "crwn-db-202f1.appspot.com",
    messagingSenderId: "747623224382",
    appId: "1:747623224382:web:9d3de339f09e2ed4aced6f",
    measurementId: "G-BD70CSZLJN"
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;