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
export default function ProfilePage() {
  const { message, setUser, checkUserExists } = useFireBase();
  const [alert, setAlert] = React.useState("Creating your profile");
  const navigate = useNavigate();
  const [userExists, setUserExists] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      // Check if the user already exists
      const user = await checkUserExists();
      setUserExists(user);

      if (message) {
        setAlert(message);
      }
      
      // If the user exists, navigate to the family menu page
      if (user) {
        navigate("/familymenu");
      }
    }
    fetchData();
  }, [message, checkUserExists, setUserExists, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Set the user's username
    await setUser(data.get("UserName"));

    // Navigate to the family menu page
    navigate("/familymenu");
  };

  return (
    <div>
      {/* Render the profile creation form if the user doesn't exist */}
      {!userExists ? (
        <>
          {/* Display any error/alert messages */}
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
        // If the user exists, navigate to the family menu page
        navigate("/familymenu")
      )}
    </div>
  );
}
