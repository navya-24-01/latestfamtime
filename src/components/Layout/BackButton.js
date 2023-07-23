// Import the necessary modules and components
import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    // The button's onClick event will call the navigate function from useNavigate to navigate back to the previous page when clicked.
    <Button
      variant="text"
      sx={{ fontFamily: "Boogaloo", color : "black" }}
      onClick={() => navigate(-1)}
      
    >
      <Typography sx={{ fontFamily: "Boogaloo" }} variant="h7">
        Back
      </Typography>
    </Button>
  );
}
