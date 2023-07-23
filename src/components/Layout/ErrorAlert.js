// Import the necessary modules and components
import React from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export default function BasicAlerts(props) {
  const errorMessage = props.errorText;
  // This component renders an MUI Alert component with the severity set to "info".
  // It takes the error message provided through the 'errorText' prop and displays it inside the Alert.
  return (
    <Alert severity="info">
      <Typography
        variant=""
        align="center"
        color="text.secondary"
        paragraph
        fontFamily="Pakaud"
        sx={{ alignContent: "center" }}
      >
        {errorMessage}
      </Typography>
    </Alert>
  );
}
