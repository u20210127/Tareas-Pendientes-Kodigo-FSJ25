// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5reN_KS6LX-uuQS2f0js35u7hOAd5ZUo",
  authDomain: "hospital-forms-39043.firebaseapp.com",
  projectId: "hospital-forms-39043",
  storageBucket: "hospital-forms-39043.appspot.com",
  messagingSenderId: "86543581900",
  appId: "1:86543581900:web:cd30d004a24ae5464f7869",
  measurementId: "G-WGDTC9FRP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);