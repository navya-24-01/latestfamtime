import Selectable from "./familytimeschedulercal";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import NavBar from "../Layout/NavBar";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";

// Component for managing family time scheduling
function FamilyTimeScheduler() {
  const localizer = momentLocalizer(moment); // Initialize the localizer for Big Calendar using 'moment'
  const location = useLocation(); // Get the current location using 'useLocation' hook
  const familyid = location.state.familyid; // Extract the familyid from the location state

  return (
    <div>
      <header>
        <NavBar />
        <Container maxWidth="xs" sx={{ borderRadius: "16px" }}>
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
            Drag the cursor over time slots to mark your availability, and
            compare it to other's schedules.
          </Typography>
        </Container>
        <Selectable localizer={localizer} familyid={familyid} />
      </header>
    </div>
  );
}

export default FamilyTimeScheduler;
