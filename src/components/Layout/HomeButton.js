import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
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
