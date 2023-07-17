import React, { useContext, useState, useEffect, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

// Create an AuthContext using createContext
const AuthContext = createContext();

// Custom hook to access the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component that wraps the app and provides authentication-related functionality
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();// State to store the current user
  const [loading, setLoading] = useState(true);//State to track the loading status
  const [errorText, setErrorText] = useState(null);//State to store error messages

  // Function to handle user signup
  async function signup(email, password) {
    setErrorText(
      "Sign up using a valid email address and a password of atleast 6 characters"
    );
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully signed up
        const user = userCredential.user;
        setErrorText("Sign up is successful!");
        // ...
      })
      .catch((error) => {
        // An error occurred during signup
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorText(errorMessage);
        // ..
      });
  }

  // Function to handle user login
  function login(email, password) {
    setErrorText("Sign In with your email address and password");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully signed in
        const user = userCredential.user;
        setErrorText("You have signed in!");
        // ...
      })
      .catch((error) => {
        // An error occurred during login 
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorText(errorMessage);
      });
  }

  // Function to handle user signout
  function signout() {
    return signOut(auth);
  }

  // useEffect hook to handle authentication state changes
  useEffect(() => {
    // Set up an auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  // Create the value object that will be provided by the AuthContext
  const value = {
    currentUser,
    signup,
    login,
    signout,
    errorText,
  };

  // Render the AuthContext.Provider and children when not loading
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
