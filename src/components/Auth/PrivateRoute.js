import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

    // Check if user is authenticated
    // If authenticated, render the children component
    // If not authenticated, navigate to the sign-in page

  return currentUser ? children : <Navigate to="/signin" />;
}
