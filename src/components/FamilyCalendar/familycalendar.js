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
  // Get calendar functions from the CalendarFunctions context
  const { addEvent, getEvents, removeEvent } = useCalendarFunctions();

  // State variables for managing events, event dialog, and event data
  const [myEvents, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [startStamp, setStartStamp] = useState(new Date());
  const [endStamp, setEndStamp] = useState(new Date());

  //State variables addingEventState and deletingEventState to transition to when an event is being added/deleted
  const [addingEvent, setAddingEvent] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(false);

  //State variables to handle opening and closing of dialog boxes
  const [openDisplay, setOpenDisplay] = useState(false);
  const [open, setOpen] = useState(false);

  // Fetch events from Firebase and update state when adding or deleting events
  React.useEffect(() => {
    async function fetchData() {
      const events = await getEvents(familyid);
      setEvents(events);
      setAddingEvent(false);
      setDeletingEvent(false);
    }
    fetchData();
  }, [getEvents, familyid, setEvents, addingEvent, deletingEvent]);

  // Handle the select slot event to show the add event dialog
  const handleSelectSlot = ({ start, end }) => {
    setOpen(true);
    setEndStamp(end);
    setStartStamp(start);
  };

  // Handle the close event for the add event dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle the close event for the display event dialog
  const handleCloseDisplay = () => {
    setOpenDisplay(false);
  };

  // Handle the submit event for adding a new event
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

  // Handle the submit event for deleting an existing event
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

  // Custom event style getter function to set background color for events
  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      style: {
        backgroundColor: "#61A5C2",
      },
    }),
    []
  );

  // Handle the select event to show the display event dialog
  const handleSelectEvent = ({ title, start, end }) => {
    setOpenDisplay(true);
    setEndStamp(end);
    setStartStamp(start);
    setTitle(title);
  };

  // Memoized default date and scroll-to-time options for the calendar
  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <>
      {/* Dialog for adding a new event */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
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

      {/* Dialog for displaying an existing event */}
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
        {/* Render the react-big-calendar */}
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
