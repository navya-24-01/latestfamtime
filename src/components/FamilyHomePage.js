// Import necessary components and modules
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import NavBar from "./Layout/NavBar";
import Container from "@mui/material/Container";
import { useFireBase } from "../contexts/FireBaseFunctions";

export default function FamilyHomePage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [familyName, setFamilyName] = React.useState();
  const [members, setMembers] = React.useState();
  const familyid = location.state.familyid;
  console.log("in family home page", familyid);
  // Access Firebase functions using the custom hook
  const { getFamilyName, getMembersOfFamily } = useFireBase();

  React.useEffect(() => {
    async function fetchData() {
      // Fetch family name and members of the family using Firebase functions
      const familyName = await getFamilyName(familyid);
      const users = await getMembersOfFamily(familyid);
      setMembers(users);
      setFamilyName(familyName);
    }

    fetchData();
  }, [familyid, getFamilyName, getMembersOfFamily]);

  // Function to handle navigation to the Family Chat page
  const handleClickFamilyChat = () => {
    navigate("/familychatmanager", {
      state: { familyid: familyid },
    });
  };
  // Function to handle navigation to the Family Calendar page
 const handleClickFamilyCalendar = () => {
   navigate("/familycalendar", {
     state: { familyid: familyid },
   });
 };

 // Function to handle navigation to the Family Docs page
  const handleClickFamilyDocs = () => {
    navigate("/familydocs", {
      state: { familyid: familyid },
    });
  };

  return (
    <>
    {/* Render the navigation bar */}

      <NavBar />
      <br />
      <Container maxWidth="xs" sx={{ borderRadius: "16px" }}>
        <Typography
          variant="h1"
          align="center"
          color="theme.palette.primary.main"
          paragraph
          fontFamily="Boogaloo"
        >
          {familyName}
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Grid xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontFamily="Boogaloo"
                  >
                    Family Chat
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Pakaud"
                  >
                    Click to chat with your entire family, or individual
                    members!
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={handleClickFamilyChat}
                    sx={{ fontFamily: "Boogaloo" }}
                  >
                    Enter Family Chat
                  </Button>
                </CardActions>
              </Card>
              <h1></h1>
               {/* Card for Family Docs */}
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontFamily="Boogaloo"
                  >
                    Family Docs
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Pakaud"
                  >
                    Click to share and view important information with your
                    family!
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={handleClickFamilyDocs}
                    sx={{ fontFamily: "Boogaloo" }}
                  >
                    Enter Family Docs
                  </Button>
                </CardActions>
              </Card>
              <h1></h1>
              {/* Card for Family Calendar */}
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontFamily="Boogaloo"
                  >
                    Family Calendar
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Pakaud"
                  >
                    Click to plan important events with your family and schedule family time!
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={handleClickFamilyCalendar}
                    sx={{ fontFamily: "Boogaloo" }}
                  >
                    Enter Family Calendar
                  </Button>
                </CardActions>
              </Card>
              <Card sx={{ maxWidth: 345 }}></Card>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}
