// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwfPhG16Hwn1MXdnOaKBskUO1Xsk1xsbc",
  authDomain: "famtime3-1a013.firebaseapp.com",
  projectId: "famtime3-1a013",
  storageBucket: "famtime3-1a013.appspot.com",
  messagingSenderId: "592530696870",
  appId: "1:592530696870:web:978b8eee3b04abd3926267",
  measurementId: "G-02YLRKH0JC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export const db = getFirestore(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, 
})

export default app;
