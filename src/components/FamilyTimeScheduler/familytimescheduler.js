import Selectable from "./familytimeschedulercal";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import NavBar from "../Layout/NavBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Container from "@mui/material/Container";

function FamilyTimeScheduler() {
  const localizer = momentLocalizer(moment);
  const location = useLocation();
  const navigate = useNavigate();
  const familyid = location.state.familyid;

  const handleClick = () => {
    navigate("/familychatmanager", {
      state: { familyid: familyid },
    });
  };
  return (
    <div>
      <header>
        <NavBar />
       

        <Selectable localizer={localizer} />
      </header>
    </div>
  );
}

export default FamilyTimeScheduler;
