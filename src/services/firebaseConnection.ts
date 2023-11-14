import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC9SluI4QBSuze6azUbDp9E4vJ8CIpcBqY",
    authDomain: "reactlinks-d0bdb.firebaseapp.com",
    projectId: "reactlinks-d0bdb",
    storageBucket: "reactlinks-d0bdb.appspot.com",
    messagingSenderId: "268727094299",
    appId: "1:268727094299:web:6580369c3cc607e9943cbe"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };