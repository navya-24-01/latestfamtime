// Import the necessary components and modules
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import ProfilePage from "../Auth/ProfilePage";
import FamilyCreator from "./FamilyCreator";
import FamilyJoiner from "./FamilyJoiner";
import FamilyList from "./FamilyList";
import Grid from "@mui/material/Grid";
import { useFireBase } from "../../contexts/FireBaseFunctions";
import NavBar from "../Layout/NavBar";

export default function FamilyMenu() {
  // State to store user families
  const [userfamilies, setUserfamilies] = React.useState([]);
  // Custom hook to access Firebase functions
  const { getUsersFamilies, addingFamily, familyAdded } = useFireBase();

  React.useEffect(() => {
    async function fetchData() {
      // Retrieve the list of user families using Firebase function
      const usersfamilies = await getUsersFamilies();
      setUserfamilies(usersfamilies);
      // Set familyAdded flag to handle any changes in family list
      familyAdded()
      }
    
    console.log("call")
    // Fetch user families when the component mounts or familyAdded flag changes
    fetchData();
  }, [getUsersFamilies, familyAdded]);
  return (
    <div>
      {/* Render the navigation bar */}
      <NavBar />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h1"
              align="center"
              color="text.primary"
              gutterBottom
              fontFamily="Boogaloo"
            >
              Welcome Back To FamTime
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              fontFamily="Pakaud"
            >
              Let's reconnect with family.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* Render components to create or join a family */}
              <FamilyCreator />
              <FamilyJoiner />
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* Render a grid of user families using the FamilyList component */}
          <Grid container spacing={4}>
            {userfamilies.length > 0 &&
              userfamilies.map((family) => <FamilyList familyid={family} />)}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
