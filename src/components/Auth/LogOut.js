//Import the necessary modules
import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

// Define the LogOut component
export default function LogOut() {
  const { signout } = useAuth(); // Get the signout function from AuthContext
  const navigate = useNavigate();// Get the navigation function from react-router-dom
  // Handle the logout action
  const handleLogOut = async () => {
    await signout();// Call the signout function from AuthContext
    navigate("/"); // Navigate to the homepage after logout
  };

  // Return the LogOut component
  return (
    <div>
      <Button onClick={handleLogOut}>
        <Typography
          variant="h7"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Boogaloo", color: "black" }}
        >
          Log Out
        </Typography>
      </Button>
    </div>
  );
}
