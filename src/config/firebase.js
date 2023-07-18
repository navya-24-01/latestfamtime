// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// For Firebase JS SDK v7.20.0 and later, measurementId is optional 
const firebaseConfig = { 
  apiKey: "AIzaSyDVqv-0UVy8kWx-SfGONcXKjTfDaUQZkXM", 
  authDomain: "famtime2-1822a.firebaseapp.com", 
  projectId: "famtime2-1822a", 
  storageBucket: "famtime2-1822a.appspot.com", 
  messagingSenderId: "180721861623", 
  appId: "1:180721861623:web:286753075cbf805d0624f2", 
  measurementId: "G-CX3C5EHD51" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
