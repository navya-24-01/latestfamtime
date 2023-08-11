import * as React from "react";
import Box from "@mui/material/Box";
//import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import "./App.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent({
  open,
  setOpen,
  title,
  setTitle,
  addDocument,
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-testid="close modal"
      >
        <Box sx={style}>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            fontFamily="Pakaud"
          >
            Enter the title of the document:
          </Typography>


          <input
            placeholder="Add a Title..."
            className="add-input"
            textAlign="center"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <div className="btn-container">
            <Button onClick={addDocument}>
              <Typography
                variant="h5"
                align="center"
                color="theme.palette.primary.main"
                paragraph
                fontFamily="Boogaloo"
              >
                Add a Document
              </Typography>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
