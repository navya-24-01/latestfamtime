import React from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export default function BasicAlerts(props) {
  const errorMessage = props.errorText;
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
