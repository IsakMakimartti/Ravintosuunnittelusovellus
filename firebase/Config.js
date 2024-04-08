import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore'

const firebaseConfig = {
    // Tähän tunnarit
};

initializeApp(firebaseConfig)

const firestore = getFirestore()

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy
}