// Import the necessary modules
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../Layout/ErrorAlert";
import { useFireBase } from "../../contexts/FireBaseFunctions";

// Get necessary data from FireBaseFunctions context
export default function ProfilePage() {
  const { messageProfile, setUser, checkUserExists } = useFireBase();// Get necessary data from FireBaseFunctions context
  const [alert, setAlert] = React.useState("Creating your profile");// Set the initial state for the alert message
  const navigate = useNavigate();// Get the navigation function from react-router-dom
  const [userExists, setUserExists] = React.useState(true);// Set the initial state for user existence

 
  React.useEffect(() => {
    async function fetchData() {
      // Fetch data when there's a change in messageProfile or user existence
      const user = await checkUserExists();// Check if the user exists
      setUserExists(user); // Update user existence state

      if (messageProfile) {
        setAlert(messageProfile);// Set the alert message
      }

      if (user) {
        navigate("/familymenu");// Navigate to the familymenu page if the user exists
      }
    }
    // Call the fetchData function
    fetchData();
  }, [messageProfile, checkUserExists, setUserExists, navigate]);

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);// Get the form data
    await setUser(data.get("UserName"));// Call the setUser function from FireBaseFunctions context to set the user
    navigate("/familymenu");// Navigate to the familymenu page after setting the user
  };

  // Return the ProfilePage component
  return (
    <div>
      {!userExists ? (
        <>
          <ErrorAlert errorText={alert} />
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5 " fontFamily="Boogaloo">
                Set a UserName!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="UserName"
                      label="UserName"
                      name="UserName"
                      autoComplete="UserName"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}></Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  fontFamily="Boogaloo"
                  sx={{ mt: 3, mb: 2, fontFamily: "Boogaloo" }}
                  size="large"
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Container>{" "}
        </>
      ) : (
        navigate("/familymenu")// Navigate to the familymenu page if the user already exists
      )}
    </div>
  );
}
