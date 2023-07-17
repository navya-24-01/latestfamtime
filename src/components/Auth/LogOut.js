import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function LogOut() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  // Handle logout action
  const handleLogOut = () => {
    signout();
    navigate("/");
  };

  return (
    <div>
      {/* Logout button */}
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
