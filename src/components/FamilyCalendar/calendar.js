import Selectable from "./familycalendar";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import NavBar from "../Layout/NavBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate, Link } from "react-router-dom";
import  Container  from "@mui/material/Container";


function Calendar() {
  const localizer = momentLocalizer(moment);
  const location = useLocation();
  const navigate = useNavigate();
const familyid = location.state.familyid;

const handleClick = () => {
 navigate("/familytimescheduler", {
   state: { familyid: familyid },
 });
}
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
            My Conversations
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

        <Selectable localizer={localizer} familyid={familyid} />
      </header>
    </div>
  );
}

export default Calendar;
