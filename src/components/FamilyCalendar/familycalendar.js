import React, { Fragment, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Calendar, Views, DateLocalizer } from "react-big-calendar";
import { useCalendarFunctions } from "../../contexts/CalendarFunctions";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Typography from "@mui/material/Typography";

export default function Selectable({ localizer, familyid }) {
  const { addEvent, getEvents, removeEvent } = useCalendarFunctions();
  const [myEvents, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [startStamp, setStartStamp] = useState(new Date());
  const [endStamp, setEndStamp] = useState(new Date());
  const [addingEvent, setAddingEvent] = useState(false);
  const [openDisplay, setOpenDisplay] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const events = await getEvents(familyid);
      setEvents(events);
      setAddingEvent(false);
      setDeletingEvent(false);
    }
    fetchData();
  }, [getEvents, familyid, setEvents, addingEvent, deletingEvent]);

  const handleSelectSlot = ({ start, end }) => {
    setOpen(true);
    setEndStamp(end);
    setStartStamp(start);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDisplay = () => {
    setOpenDisplay(false);
  };

  const handleSubmit = () => {
    setTitle(title);
    if (title) {
      const event = {
        start: startStamp,
        end: endStamp,
        title,
      };
      addEvent(event, familyid);
      setEvents((prev) => [...prev, { startStamp, endStamp, title }]);
      setAddingEvent(true);
      handleClose();
    }
    setTitle("");
  };

  const handleSubmitDisplay = async () => {
    const event = {
      start: startStamp,
      end: endStamp,
      title,
    };
    await removeEvent(event, familyid);
    setDeletingEvent(true);
    handleCloseDisplay();
  };

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      style: {
        backgroundColor: "#61A5C2",
      },
    }),
    []
  );

  const handleSelectEvent = ({ title, start, end }) => {
    setOpenDisplay(true);
    setEndStamp(end);
    setStartStamp(start);
    setTitle(title);
  };

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the name of the event!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Event</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDisplay} onClose={handleCloseDisplay}>
        <DialogTitle>
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
            {title}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDisplay}>
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
              Cancel
            </Typography>
          </Button>

          <Button onClick={handleSubmitDisplay}>
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
              Delete Event
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          style={{ height: "700px", margin: "50px" }}
          eventPropGetter={eventPropGetter}
        />
      </div>
    </>
  );
}

Selectable.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
