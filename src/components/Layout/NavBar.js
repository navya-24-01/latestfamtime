import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { theme } from "../Theme/Theme";
import { useAuth } from "../../contexts/AuthContext";
import LogOut from "../Auth/LogOut";

// Component for the navigation bar at the top of the application
export default function NavBar() {
  // Get the current user's authentication state from the custom hook
  const { currentUser } = useAuth();
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
            FamTime
          </Typography>
          {/* Render the LogOut component if a user is authenticated, otherwise display nothing */}
          {currentUser ? <LogOut /> : ""}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
