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
        <Container maxWidth = "lg">
          <Button variant="outlined" size="large" onClick={handleClick}>
            <Typography
              component="h2"
              variant="h5"
              align="center"
              sx={{ color: "theme.palette.primary.main" }}
              gutterBottom
              fontFamily="Boogaloo"
            >
              Click to schedule time with your family for this week!
            </Typography>
          </Button>
        </Container>
        
        <Selectable localizer={localizer} />
      </header>
    </div>
  );
}

export default Calendar;
