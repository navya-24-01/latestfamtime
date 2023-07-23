import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function FamilyCodePopover(props) {
  const familycode = props.familyid;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <Typography
          variant="h6"
          align="center"
          color="theme.palette.primary.main"
          paragraph
          fontFamily="Boogaloo"
        >
          Show family code
        </Typography>
      </Button>
      <Popover
        id={id}
        data-testid = "popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          color="theme.palette.primary.main"
          paragraph
          fontFamily="Pakaud"
        >
          Share this code with your family for them to join!:
          <br />{" "}
          <Typography
            variant="h6"
            align="center"
            color="theme.palette.primary.main"
            paragraph
            sx={{ color: "theme.palette.primary.main" }}
            fontFamily="Pakaud"
          >
            {familycode}
          </Typography>
        </Typography>
      </Popover>
    </div>
  );
}
