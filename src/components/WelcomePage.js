import React from "react";
import NavBar from "./Layout/NavBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Theme/Theme";
import Stack from "@mui/material/Stack";

export default function WelcomePage() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      >
        <NavBar />
        <Container
          maxWidth="mx"
          sx={{ align: "center", justifyContent: "center" }}
        >
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="text.primary"
            gutterBottom
            fontFamily="Boogaloo"
          >
            <h1> </h1>
            FamTime
          </Typography>
          <Typography
            component="h2"
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
            fontFamily="Padauk"
          >
            Time to reconnect with family!
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="outlined" size="large">
              <Typography
                component="h2"
                variant="h5"
                align="center"
                sx={{ color: theme.palette.primary.main }}
                gutterBottom
                fontFamily="Boogaloo"
              >
                New User? Click To <Link to="/signup">Sign Up!</Link>
              </Typography>
            </Button>
            <Typography
              component="h2"
              variant="h1"
              align="center"
              gutterBottom
              fontFamily="Boogaloo"
              sx={{ color: theme.palette.primary.main }}
            >
              OR
            </Typography>
            <Button variant="outlined" size="large">
              <Typography
                component="h2"
                variant="h5"
                align="center"
                sx={{ color: theme.palette.primary.main }}
                gutterBottom
                fontFamily="Boogaloo"
              >
                <Link to="/signin">Sign In </Link>With an Existing Account
              </Typography>
            </Button>
          </Stack>
        </Container>
      </div>
    </ThemeProvider>
  );
}
