// Import the necessary modules and components
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { useFireBase } from "../../contexts/FireBaseFunctions";
import ErrorAlert from "../Layout/ErrorAlert";
import Typography from "@mui/material/Typography";
export default function FamilyJoiner() {
  // Get the necessary Firebase functions using the useFireBase hook
  const { joinAFamily, messageFJ, addingFamilyNow } = useFireBase();
  // State to manage the dialog open/close state
  const [open, setOpen] = React.useState(false);
  // State to manage the error message in the ErrorAlert
  const [alert, setAlert] = React.useState("Joining a family!");
  // State to manage the family code input field
  const [familyCode, setFamilyCode] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      if (messageFJ) {
        setAlert(messageFJ);
      }
    }
    fetchData();
  }, [messageFJ]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call the joinAFamily function from the Firebase context to join the family using the family code
    await joinAFamily(familyCode);
    // Call the addingFamilyNow function from the Firebase context to set a flag indicating that the family is being added
    addingFamilyNow();
    // Clear the familyCode input field
    setFamilyCode("");
    // Close the dialog box after successfully joining the family
    if(messageFJ === "Family Joined") {
      handleClose();
    }
  };

  // Open the dialog box
  const handleClickOpen = () => {
    setOpen(true);
    setAlert("Joining a new family")
  };

  // Close the dialog box
  const handleClose = () => {
    setOpen(false);
  };

  // Render the component
  return (
    <div>
      <Button
        variant="outlined"
        size="large"
        sx={{ fontFamily: "Boogaloo" }}
        onClick={handleClickOpen}
      >
        <Typography sx={{ fontFamily: "Boogaloo" }} variant="h5">
          Join a new family
        </Typography>
      </Button>
      {/* Dialog box for joining a family */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            fontFamily="Boogaloo"
          >
            Join a Family
          </Typography>
        </DialogTitle>
        {/* Display an error alert if there is any message (alert) */}
        <ErrorAlert errorText={alert} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <DialogContent>
            <DialogContentText>
              {" "}
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
                fontFamily="Pakaud"
              >
                Enter the family joining code
              </Typography>
            </DialogContentText>
            {/* Input field to enter the family joining code */}
            <TextField
              required
              name="familycode"
              margin="dense"
              id="familycode"
              type="text"
              label="familycode"
              value={familyCode}
              onChange={(e) => setFamilyCode(e.target.value)}
              fullWidth
              variant="standard"
              autoComplete="off"
            />
            <DialogActions>
               {/* Button to cancel the family joining */}
              <Button onClick={handleClose} sx={{ fontFamily: "Boogaloo" }}>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                  fontFamily="Boogaloo"
                >
                  Cancel
                </Typography>
              </Button>
               {/* Button to submit and join the family */}
              <Button type="submit" sx={{ fontFamily: "Boogaloo" }}>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                  fontFamily="Boogaloo"
                >
                  Enter
                </Typography>
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}
