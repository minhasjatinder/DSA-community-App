// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import{getAuth,GoogleAuthProvider , onAuthStateChanged}from "firebase/auth"; 
import {getFirestore}from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc2J8k4yWPJshV-dVArSWNjZYqc44C8FI",
  authDomain: "good-thought-ba515.firebaseapp.com",
  projectId: "good-thought-ba515",
  storageBucket: "good-thought-ba515.appspot.com",
  messagingSenderId: "741733261421",
  appId: "1:741733261421:web:128175a16eee7aaa659f64",
  measurementId: "G-HMDQP5RTFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}