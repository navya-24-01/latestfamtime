import React from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

// Component for displaying a basic alert with the provided error message
export default function BasicAlerts(props) {

  // Get the error message from the props
  const errorMessage = props.errorText;
  return (
    // Render an Alert component with "info" severity
    <Alert severity="info">
      <Typography
        variant=""
        align="center"
        color="text.secondary"
        paragraph
        fontFamily="Pakaud"
        sx={{ alignContent: "center" }}
      >
        {/* Display the error message */}
        {errorMessage}
      </Typography>
    </Alert>
  );
}
