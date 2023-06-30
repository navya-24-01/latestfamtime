import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../contexts/AuthContext";
import { Box } from "@mui/material";
import { useFireBase } from "../../contexts/FireBaseFunctions";
import ErrorAlert from "../Layout/ErrorAlert";
import Typography from "@mui/material/Typography";
export default function FamilyJoiner() {
  const { joinAFamily, message } = useFireBase();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState("Joining a family!");

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
    joinAFamily(data.get("familycode"));
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
        size="large"
        sx={{ fontFamily: "Boogaloo" }}
        onClick={handleClickOpen}
      >
        <Typography sx={{ fontFamily: "Boogaloo" }} variant="h5">
          Join a new family
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
            Join a Family
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
                Enter the family joining code
              </Typography>
            </DialogContentText>
            <TextField
              autoFocus
              name="familycode"
              margin="dense"
              id="familycode"
              type="familycode"
              fullWidth
              variant="standard"
            />
            <DialogActions>
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
