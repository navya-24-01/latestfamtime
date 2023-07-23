// Import the necessary modules and components
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { theme } from "../Theme/Theme";
import { useAuth } from "../../contexts/AuthContext";
import LogOut from "../Auth/LogOut";
import BackButton from "./BackButton";
import HomeButton from "./HomeButton"

export default function NavBar() {
  const { currentUser } = useAuth();
  // This component renders a Material-UI AppBar with a custom theme background color.
  // It displays the application logo (HomeButton) on the left side of the Toolbar.
  // If a user is authenticated (currentUser exists), it displays the LogOut and BackButton components on the right side of the Toolbar.
  // If a user is not authenticated (currentUser is null), it does not display any buttons on the right side.
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "theme.palette.primary.main" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            fontFamily="Boogaloo"
            sx={{ flexGrow: 1 }}
          >
          <HomeButton/>
          </Typography>
          {currentUser ? <LogOut /> : ""}
          {currentUser ? <BackButton /> : ""}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
