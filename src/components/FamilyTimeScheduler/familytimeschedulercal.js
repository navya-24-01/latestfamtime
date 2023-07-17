import React, { useState, useCallback, useMemo } from "react";
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

// Component for handling selectable events in the family time scheduler
export default function Selectable({ localizer, familyid }) {
  const { addAvailability, getAvailabilities, removeAvailability } =
    useSchedulerFunctions(); // Initialize functions for managing availabilities from custom hook
  const [myEvents, setEvents] = useState([]); // State to hold the user's availability events
  const [title, setTitle] = useState(""); // State to hold the title of the user's availability event
  const [open, setOpen] = useState(false); // State to manage the open/close state of the availability dialog
  const [startStamp, setStartStamp] = useState(new Date()); // State to hold the start timestamp of the availability event
  const [endStamp, setEndStamp] = useState(new Date()); // State to hold the end timestamp of the availability event
  const { getMyUserName } = useFireBase(); // Initialize function for getting the user's username from custom hook
  const [userName, setUserName] = useState(""); // State to hold the user's username
  const [eventColors, setEventColors] = useState([]); // State to manage event colors for different users
  const [addingEvent, setAddingEvent] = useState(false); // State to manage adding an event to the calendar
  const [openDisplay, setOpenDisplay] = useState(false); // State to manage the open/close state of the display dialog
  const [deletingEvent, setDeletingEvent] = useState(false); // State to manage deleting an event from the calendar
  const { addEvent } = useCalendarFunctions(); // Initialize function for adding an event to the calendar from custom hook
  const [openEvent, setOpenEvent] = useState(false); // State to manage the open/close state of the event dialog
  const [addingEventTitle, setAddingEventTitle] = useState(""); // State to hold the title of the user's new event

  // Function to find and return the color associated with a particular event user
  const findColor = (event) => {
    for (var i = 0; i < eventColors.length; i++) {
      if (event.title === eventColors[i].eventUser) {
        return eventColors[i].color;
      }
    }
  };

  // Fetch the user's username from Firebase when the component mounts
  React.useEffect(() => {
    async function fetchData() {
      const username = await getMyUserName();
      setUserName(username);
    }
    fetchData();
    console.log(userName);
  }, [getMyUserName]);

  // Fetch the user's availability events from the scheduler when the component mounts or when adding/deleting events
  React.useEffect(() => {
    async function fetchData() {
      const events = await getAvailabilities(familyid);
      setEvents(events);
      setAddingEvent(false);
      setDeletingEvent(false);
    }
    fetchData();
  }, [getAvailabilities, familyid, addingEvent, deletingEvent]);

  // Generate random colors for each user's events and update the state when the component mounts or when myEvents changes
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

  // Function to handle selecting a time slot on the calendar
  const handleSelectSlot = ({ start, end }) => {
    setOpen(true);
    setEndStamp(end);
    setStartStamp(start);
  };

  // Function to handle closing the availability dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle closing the event dialog
  const handleCloseEvent = () => {
    setOpenEvent(false);
  };

  // Function to handle closing the display dialog
  const handleCloseDisplay = () => {
    setOpenDisplay(false);
  };

  // Function to handle submitting the availability event
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

  // Function to handle submitting the display event
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

  // Callback function to get event styles based on the user's color
  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      style: {
        backgroundColor: findColor(event),
      },
    }),
    [eventColors, findColor]
  );

  // Function to handle selecting an event on the calendar
  const handleSelectEvent = ({ title, start, end }) => {
    setOpenDisplay(true);
    setEndStamp(end);
    setStartStamp(start);
    setTitle(title);
  };

  // Function to handle opening the event dialog
  const openEventDialog = () => {
    setOpenEvent(true);
  };

  // Function to handle submitting the new event
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

  // Default date and scroll time options for the calendar
  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  return (
    <>
      {/* Availability Dialog */}
      <Dialog open={open} onClose={handleClose}>
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

      {/* Event Dialog */}
      <Dialog open={openEvent} onClose={handleCloseEvent}>
        <DialogTitle>Add a new event to the familycalendar</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the name of the event!</DialogContentText>
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
          <Button onClick={handleCloseEvent}>Cancel</Button>
          <Button onClick={handleSubmitEvent}>Add Event</Button>
        </DialogActions>
      </Dialog>
      <div className="height600">
        {/* Render the calendar */}
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
