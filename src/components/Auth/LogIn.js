// Import necessary modules and components
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

// Define the LogIn component
export default function LogIn() {
  const { login, errorTextSignIn } = useAuth();
  // State to manage error message
  const [error, setError] = React.useState("Sign in with your email and password");
  const navigate = useNavigate();// Get the navigation function from react-router-dom

  React.useEffect(() => {
    async function fetchData() {
      // Fetch data when there's a change in errorTextSignIn
      if(errorTextSignIn){
         setError(errorTextSignIn);// Set the error message
         // If sign-in is successful, navigate to the profile page
          if (errorTextSignIn == "You have signed in!") {
            navigate("/profilepage");
          }
      }
      
    }
    // Call the fetchData function
    fetchData();
  }, [ errorTextSignIn, navigate]);

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);// Get the form data
    await login(data.get("email"), data.get("password"));
  };

  // Return the LogIn component
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
          <Typography component="h1" variant="h5 " fontFamily="Boogaloo">
            Sign In
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
              Sign In
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signup">{"Don't have an account? SignUp"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
