// Import the necessary modules and components
import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    // This component renders an MUI Button component with a custom design.
  // When the button is clicked, it uses the useNavigate hook to navigate to the "/familymenu" route.
    <Button
      variant="text"
      sx={{ fontFamily: "Boogaloo", color: "black" }}
      onClick={() => navigate("/familymenu")}
    >
      <Typography sx={{ fontFamily: "Boogaloo" }} variant="h7">
        FamTime
      </Typography>
    </Button>
  );
}
