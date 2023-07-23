// Import the necessary modules
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../contexts/AuthContext";
import ErrorAlert from "../Layout/ErrorAlert";

// Define the SignUp component
export default function SignUp() {
  const { signup, currentUser, errorTextSignUp} = useAuth();// Get necessary data from AuthContext
  const [error, setError] = React.useState(
    "Sign up using a valid email address and a password of atleast 6 characters"
  );// Set the initial state for the error message

  React.useEffect(() => {
    async function fetchData() {
      // Fetch data when there's a change in errorTextSignUp
      if (errorTextSignUp) {
        setError(errorTextSignUp);// Set the error message
        
      }
    }
    // Call the fetchData function
    fetchData();
  }, [errorTextSignUp]);

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);// Get the form data
    if (data.get("password") !== data.get("confirmpassword")) {
      return setError("Passwords do not match");// Set the error message if passwords do not match
    }

    await signup(data.get("email"), data.get("password"));// Call the signup function from AuthContext to sign up
  };

  // Return the SignUp component
  return (
    <div>
      <ErrorAlert errorText={error} />
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
          <Typography component="h1" variant="h4" fontFamily="Boogaloo">
            Sign up
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, fontFamily: "Boogaloo" }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signin">"Already have an account? Sign in"</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
