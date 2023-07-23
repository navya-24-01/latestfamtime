// Import the necessary modules
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Define the PrivateRoute component
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();// Get the currentUser from AuthContext

  // Render children if there's a currentUser, otherwise navigate to the signin page
  return currentUser ? children : <Navigate to="/signin" />;
}
