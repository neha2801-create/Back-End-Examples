// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwGl9CUBWNY1ll8HeOU2wHfYLwsmMh4tI",
  authDomain: "cs590-webapp.firebaseapp.com",
  projectId: "cs590-webapp",
  storageBucket: "cs590-webapp.appspot.com",
  messagingSenderId: "505027092626",
  appId: "1:505027092626:web:7ca7a1318e9b10ef09464b",
  measurementId: "G-7BT3XV8RCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);