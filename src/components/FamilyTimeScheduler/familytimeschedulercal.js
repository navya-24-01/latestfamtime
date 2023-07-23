// Import the necessary modules and components
import React, { Fragment, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Calendar, Views, DateLocalizer } from "react-big-calendar";
import { useSchedulerFunctions } from "../../contexts/SchedulerFunctions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useFireBase } from "../../contexts/FireBaseFunctions";
import randomColor from "randomcolor";
import Typography from "@mui/material/Typography";
import { useCalendarFunctions } from "../../contexts/CalendarFunctions";
import { TextField } from "@mui/material";

export default function Selectable({ localizer, familyid }) {
  // Import custom functions from the scheduler context
  const { addAvailability, getAvailabilities, removeAvailability } =
    useSchedulerFunctions();
  // State variables to manage events and modal dialog
  const [myEvents, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [startStamp, setStartStamp] = useState(new Date());
  const [endStamp, setEndStamp] = useState(new Date());
  const [userName, setUserName] = useState("");
  const [eventColors, setEventColors] = useState([]);
  const [addingEvent, setAddingEvent] = useState(false);
  const [openDisplay, setOpenDisplay] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(false);
  const { addEvent } = useCalendarFunctions();
  const [openEvent, setOpenEvent] = useState(false);
  const [addingEventTitle, setAddingEventTitle] = useState("");

  // Import custom functions from the Firebase context
  const { getMyUserName } = useFireBase();
  // Callback to find the color associated with the event user
  const findColor = (event) => {
    for (var i = 0; i < eventColors.length; i++) {
      if (event.title === eventColors[i].eventUser) {
        return eventColors[i].color;
      }
    }
  };

  // Fetch the current user's username from Firebase on component mount
  React.useEffect(() => {
    async function fetchData() {
      const username = await getMyUserName();
      setUserName(username);
    }
    fetchData();
    console.log(userName);
  }, [getMyUserName]);

  // Fetch the family's availabilities from the scheduler context on component mount and when events change
  React.useEffect(() => {
    async function fetchData() {
      const events = await getAvailabilities(familyid);
      setEvents(events);
      setAddingEvent(false);
      setDeletingEvent(false);
    }
    fetchData();
  }, [getAvailabilities, familyid, addingEvent, deletingEvent]);

  // Generate event colors based on the unique users' names when events change
  React.useEffect(() => {
    const uniqueUsers = [];
    const myEventsUsers = myEvents.map((event) => event.title);
    myEventsUsers.forEach((user) =>
      !uniqueUsers.includes(user) ? uniqueUsers.push(user) : uniqueUsers
    );
    const colors = randomColor({
      count: uniqueUsers.length,
      hue: "blue",
    });
    const userColors = colors.map(function (color) {
      return {
        color,
        eventUser: uniqueUsers[colors.indexOf(color)],
      };
    });

    setEventColors(userColors);
  }, [myEvents, setEventColors]);

  // Handle selecting a time slot on the calendar
  const handleSelectSlot = ({ start, end }) => {
    setOpen(true);
    setEndStamp(end);
    setStartStamp(start);
  };

  // Close the modal dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Close the event modal dialog
  const handleCloseEvent = () => {
    setOpenEvent(false);
  };

  // Close the availability modal dialog
  const handleCloseDisplay = () => {
    setOpenDisplay(false);
  };

  // Handle adding an availability event
  const handleSubmit = () => {
    if (userName) {
      const event = {
        start: startStamp,
        end: endStamp,
        title: userName,
      };
      addAvailability(event, familyid);
      setEvents((prev) => [...prev, { startStamp, endStamp, title }]);
      setAddingEvent(true);
      handleClose();
    }
  };

   // Handle removing an availability event
  const handleSubmitDisplay = async () => {
    const event = {
      start: startStamp,
      end: endStamp,
      title: userName,
    };
    await removeAvailability(event, familyid);
    setDeletingEvent(true);
    handleCloseDisplay();
  };

  // Get event styles based on the user's color
  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      style: {
        backgroundColor: findColor(event),
      },
    }),
    [eventColors, findColor]
  );

  // Handle selecting an event on the calendar
  const handleSelectEvent = ({ title, start, end }) => {
    setOpenDisplay(true);
    setEndStamp(end);
    setStartStamp(start);
    setTitle(title);
  };

  // Open the add event modal dialog
  const openEventDialog = () => {
    setOpenEvent(true);
  };

  // Handle submitting the add event form
  const handleSubmitEvent = () => {
    setAddingEventTitle(title);
    if (title) {
      const event = {
        start: startStamp,
        end: endStamp,
        title: addingEventTitle,
      };
      addEvent(event, familyid);
      handleCloseEvent();
    }
    setAddingEventTitle("");
  };

  // Configuration for defaultDate and scrollToTime props of the calendar
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
        {/* Modal dialog for marking availability */}
        <DialogTitle>
          {" "}
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
            My availability
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            {" "}
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
          <Button onClick={handleSubmit}>
            {" "}
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
              Mark available
            </Typography>
          </Button>
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
            {title} is available
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
          {title === userName ? (
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
                Mark Unavailable
              </Typography>
            </Button>
          ) : (
            ""
          )}
          <Button onClick={openEventDialog}>
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
              Add Event to Calendar
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEvent} onClose={handleCloseEvent}>
        <DialogTitle>
          <Typography
            variant="h5"
            align="center"
            color="theme.palette.primary.main"
            paragraph
            fontFamily="Boogaloo"
          >
            Add a new event to the Family calendar
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              variant="h5"
              align="center"
              color="theme.palette.primary.main"
              paragraph
              fontFamily="Boogaloo"
            >
              Enter the name of the event!
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            value={addingEventTitle}
            onChange={(e) => setAddingEventTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEvent}>
            <Typography
              variant="h5"
              align="center"
              color="theme.palette.primary.main"
              paragraph
              fontFamily="Boogaloo"
            >
              Cancel
            </Typography>
          </Button>
          <Button onClick={handleSubmitEvent}><Typography
              variant="h5"
              align="center"
              color="theme.palette.primary.main"
              paragraph
              fontFamily="Boogaloo"
            >Add Event</Typography></Button>
        </DialogActions>
      </Dialog>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
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
