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
  const { createAFamily, message } = useFireBase();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState("Creating your family!");

  // Fetch data when message changes
  React.useEffect(() => {
    async function fetchData() {
      if (message) {
        setAlert(message);
      }
    }
    fetchData();
  }, [message]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createAFamily(data.get("familyname"));
    //window.location.reload(false)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                Enter a name for your family:
              </Typography>
            </DialogContentText>
            <TextField
              name="familyname"
              margin="dense"
              id="familyname"
              type="familyname"
              fullWidth
              variant="standard"
            />
            <DialogActions>
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
