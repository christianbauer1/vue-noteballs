import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCKj-vGVcCYjkmvDBW4sWyE-s9b49x7s8Q',
    authDomain: 'noteballs-5185d.firebaseapp.com',
    projectId: 'noteballs-5185d',
    storageBucket: 'noteballs-5185d.appspot.com',
    messagingSenderId: '947119242048',
    appId: '1:947119242048:web:ceb64555f021f22259d8a5'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth
}