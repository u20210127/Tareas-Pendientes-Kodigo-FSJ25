/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi6NJkDhv6XDhQvOu8fY7oSrnHWPAn58I",
  authDomain: "auth-app-7578b.firebaseapp.com",
  projectId: "auth-app-7578b",
  storageBucket: "auth-app-7578b.appspot.com",
  messagingSenderId: "246256343665",
  appId: "1:246256343665:web:1d2792fff4075c759659d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();