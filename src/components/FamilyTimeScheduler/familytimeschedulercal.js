import React, { Fragment, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Calendar, Views, DateLocalizer } from "react-big-calendar";
import { useSchedulerFunctions } from "../../contexts/SchedulerFunctions";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Typography from "@mui/material/Typography";
import { useFireBase } from "../../contexts/FireBaseFunctions";
import randomColor from "randomcolor";

export default function Selectable({ localizer, familyid }) {
  const { addEvent, getEvents } = useSchedulerFunctions();
  const [myEvents, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [startStamp, setStartStamp] = useState(new Date());
  const [endStamp, setEndStamp] = useState(new Date());
  const { getMyUserName } = useFireBase();
  const [userName, setUserName] = useState("");
  const [eventColors, setEventColors] = useState([]);
  const findColor = (event) => {
    for (var i = 0; i < eventColors.length; i++) {
      console.log("see arrayhere")
      console.log(eventColors[i])
      console.log("see event", event)
      if (event.title === eventColors[i].eventUser) {
        console.log(eventColors[i])
        return eventColors[i].color;
      }
    }
  };

  React.useEffect(() => {
    async function fetchData() {
      const username = await getMyUserName();
      setUserName(username);
    }
    fetchData();
    console.log(userName);
  }, [getMyUserName]);

  React.useEffect(() => {
    async function fetchData() {
      const events = await getEvents(familyid);
      setEvents(events);
      console.log("fetchedevents: ", events);
      console.log("myevents", myEvents);
      /*const uniqueUsers = []
      const myEventsUsers = myEvents.map((event) => event.title)
      myEventsUsers.forEach((user) => !(uniqueUsers.includes(user))? uniqueUsers.push(user): uniqueUsers)
      console.log("unique users")
      console.log(uniqueUsers)
      const colors = randomColor({
        count : uniqueUsers.length,
        hue : "blue"
      })
      const userColors = colors.map(function(color){ return {
        color,
        eventUser : uniqueUsers[colors.indexOf(color)]
      }})

      setEventColors(userColors)*/
      const uniqueUsers = [];
      const myEventsUsers = myEvents.map((event) => event.title);
      myEventsUsers.forEach((user) =>
        !uniqueUsers.includes(user) ? uniqueUsers.push(user) : uniqueUsers
      );
      console.log("unique users");
      console.log(uniqueUsers);
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

    }
    fetchData();
  }, [getEvents, familyid, setEvents, setEventColors]);

  
  const handleSelectSlot = ({ start, end }) => {
    setOpen(true);
    setEndStamp(end);
    setStartStamp(start);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("findcolors:" )
  const handleSubmit = () => {
    if (userName) {
      const event = {
        start: startStamp,
        end: endStamp,
        title: userName,
      };
      addEvent(event, familyid);
      setEvents((prev) => [...prev, { startStamp, endStamp, title }]);
      handleClose();
    }
  };

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      style: {
        backgroundColor: findColor(event),
      },
    }),
    [eventColors]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  console.log("i am");
  console.log(findColor("userB"));
  return (
    <>
      {findColor("userB")}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>My availability</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Mark as Available</Button>
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
