// Import necessary modules and components
import Selectable from "./FamilyCalendar";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import NavBar from "../Layout/NavBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

// Define the Calendar component
function Calendar() {
  // Set up localizer using moment for react-big-calendar
  const localizer = momentLocalizer(moment);
  // Get the current location and set up navigate function from react-router-dom
  const location = useLocation();
  const navigate = useNavigate();
  // Extract the familyid from the state
  const familyid = location.state.familyid;

  // Handle click event for the "Click to schedule time with your family" button
  const handleClick = () => {
    // Navigate to the family time scheduler page with the familyid as state
    navigate("/familytimescheduler", {
      state: { familyid: familyid },
    });
  };
  return (
    <div>
      <header>
        {/* Render the navigation bar */}
        <NavBar />
        {/* Render the "Family Calendar" heading and instructions */}
        <Container maxWidth="xs" sx={{ borderRadius: "16px" }}>
          <Typography
            variant="h2"
            align="center"
            color="theme.palette.primary.main"
            paragraph
            fontFamily="Boogaloo"
          >
            Family Calendar
          </Typography>

          <Typography
            component="h2"
            align="center"
            sx={{ color: "theme.palette.primary.main" }}
            gutterBottom
            fontFamily="Pakaud"
          >
            Click on a slot to schedule an event, or drag the cursor over a
            date-time range
          </Typography>
           {/* Render the "Click to schedule time with your family" button */}
          <Button variant="outlined" size="large" onClick={handleClick}>
            <Typography
              component="h2"
              variant="h5"
              align="center"
              sx={{
                color: "theme.palette.primary.main",
                alignContent: "center",
              }}
              gutterBottom
              fontFamily="Boogaloo"
            >
              Click to schedule time with your family for this week!
            </Typography>
          </Button>
        </Container>
        {/* Render the FamilyCalendar component with the localizer and familyid */}
        <Selectable localizer={localizer} familyid={familyid} />
      </header>
    </div>
  );
}

export default Calendar;
