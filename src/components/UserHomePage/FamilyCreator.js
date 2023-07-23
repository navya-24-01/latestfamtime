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

export default function FamilyCreator() {
  // Get the necessary Firebase functions using the useFireBase hook
  const { createAFamily, messageFC, addingFamilyNow } = useFireBase();
  // State to manage the dialog open/close state
  const [open, setOpen] = React.useState(false);
  // State to manage the error message in the ErrorAlert
  const [alert, setAlert] = React.useState("Creating your family!");
  // State to manage the family name input field
  const [familyName, setFamilyName] = React.useState("")


  // Handle form submission
  React.useEffect(() => {
    async function fetchData() {
      if (messageFC) {
        setAlert(messageFC);
      }
    }
    fetchData();
  }, [messageFC]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    // Call the createAFamily function from the Firebase context to create the family
    await createAFamily(familyName);
    // Call the addingFamilyNow function from the Firebase context to set a flag indicating that the family is being added
    addingFamilyNow();
    // Clear the familyName input field
    setFamilyName("");
    // Close the dialog box after the family is created successfully
    if(messageFC === "Family has been created!") {
      handleClose();
    }
  };
  // Open the dialog box
  const handleClickOpen = () => {
    setOpen(true);
    setAlert("Creating a Family!")
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
        sx={{ fontFamily: "Boogaloo" }}
        onClick={handleClickOpen}
        size="large"
      >
        <Typography sx={{ fontFamily: "Boogaloo" }} variant="h5">
          Create a new family
        </Typography>
      </Button>
      {/* Dialog box for creating a new family */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            fontFamily="Boogaloo"
          >
            Create A New Family!
          </Typography>
        </DialogTitle>
        {/* Display an error alert if there is any message (alert) */}
        <ErrorAlert errorText={alert} />
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
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
                Enter a name for your family:
              </Typography>
            </DialogContentText>
            {/* Input field to enter the family name */}
            <TextField
              required
              name="familyname"
              margin="dense"
              id="familyname"
              type="familyname"
              label="familyname"
              data-testid= "familyname"
              fullWidth
              variant="standard"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              autoComplete="off"
            />

            <DialogActions>
              {/* Button to cancel the family creation */}
              <Button onClick={handleClose}>
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
              {/* Button to save and create the family */}
              <Button type="submit">
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                  fontFamily="Boogaloo"
                >
                  Save
                </Typography>
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}
