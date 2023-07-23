// Import necessary modules and components
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function FamilyCodePopover(props) {
  // Extract the family code from the props
  const familycode = props.familyid;
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Handle click event to open the popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Handle close event to close the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine if the popover is open
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Render the component
  return (
    <div>
      {/* Button to trigger the popover */}
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
      {/* Popover to display the family code */}
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
        {/* Content of the popover */}
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
