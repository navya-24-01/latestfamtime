// Import the necessary modules and components
import Selectable from "./FamilyTimeSchedulerCal";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import NavBar from "../Layout/NavBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Container from "@mui/material/Container";

function FamilyTimeScheduler() {
  // Initialize the momentLocalizer to work with the "react-big-calendar" library
  const localizer = momentLocalizer(moment);
  // Get the current location and extract the familyid from the state
  const location = useLocation();
  const navigate = useNavigate();
  const familyid = location.state.familyid;

  
  return (
    <div>
      <header>
        {/* Render the NavBar component */}
        <NavBar />
        <Container maxWidth="xs" sx={{ borderRadius: "16px" }}>
          {/* Display the heading for the page */}
          <Typography
            variant="h2"
            align="center"
            color="theme.palette.primary.main"
            paragraph
            fontFamily="Boogaloo"
          >
            Family Time Scheduler
          </Typography>
          <Typography
            component="h2"
            align="center"
            sx={{ color: "theme.palette.primary.main" }}
            gutterBottom
            fontFamily="Pakaud"
          >
            {/* Provide instructions to users */}
            Drag the cursor over time slots to mark your availability, and
            compare it to other's schedules.
          </Typography>
          
        </Container>
        {/* Render the Selectable component for the family time scheduler */}
        <Selectable localizer={localizer} familyid={familyid} />
      </header>
    </div>
  );
}

export default FamilyTimeScheduler;
