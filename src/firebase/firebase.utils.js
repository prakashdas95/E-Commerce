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

export const createUserProfileFileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

//purpose - saving SHOP_DATA to firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        // console.log(newDocRef);
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

// WHEN WE FETCH COLLECTIONS DATA FROM FIRESTORE AND ADDING SOME SOME EXTRA PROPERTIES TO IT LIKE routeName,id,title,items
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    // console.log(transformedCollection);
    // return object with title as keys and their respective collection object
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;