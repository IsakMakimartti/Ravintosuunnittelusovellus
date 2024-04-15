import { initializeApp } from 'firebase/app'
import { getDocs ,where,getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

initializeApp(firebaseConfig)

const firestore = getFirestore()

const userrecipes = "userrecipes"

export {
    firestore,
    collection,
    addDoc,
    userrecipes,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
    where,
    getDocs
}