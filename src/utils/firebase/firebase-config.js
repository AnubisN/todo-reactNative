// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOdIou_qo7N7qpsEenfcXwoUQZZpu-8qo",
  authDomain: "test2-54014.firebaseapp.com",
  databaseURL: "https://test2-54014.firebaseio.com",
  projectId: "test2-54014",
  storageBucket: "test2-54014.appspot.com",
  messagingSenderId: "317398998513",
  appId: "1:317398998513:web:62cd861f3d97aa54cd7850",
  measurementId: "G-79N5PK7P2L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
