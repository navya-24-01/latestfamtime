import React, { useContext, useState, useEffect, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [errorTextSignUp, setErrorTextSignUp] = useState("");
  const [errorTextSignIn, setErrorTextSignIn] = useState("");

  async function signup(email, password) {
    setErrorTextSignUp(
      "Sign up using a valid email address and a password of atleast 6 characters"
    );
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setErrorTextSignUp("Sign up is successful!");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorTextSignUp(errorMessage);
        // ..
      });
  }

  async function login(email, password) {
    setErrorTextSignIn("Sign In with your email address and password");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setErrorTextSignIn("You have signed in!");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorTextSignIn(errorMessage);
      });
  }

  async function signout() {
    signOut(auth)
      .then(() => {
        setErrorTextSignIn("Sign In with your email address and password");
        setErrorTextSignUp(
          "Sign up using a valid email address and a password of atleast 6 characters"
        );
      })
      .catch((error) => {
        console.log("error");
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signout,
    errorTextSignIn,
    errorTextSignUp,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
