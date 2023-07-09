import React, { Fragment, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Calendar, Views, DateLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Selectable({ localizer }) {
  const [myEvents, setEvents] = useState([""]);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event name");
      console.log("my event: ", start, end, title);
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      style: {
        backgroundColor: "#61A5C2",
      },
    }),
    []
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

  return (
    <Fragment>
      <strong>
        Click an event to see more info, or drag the mouse over the calendar to
        select a date/time range.
      </strong>

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
          style={{ height: "500px", margin: "50px" }}
          eventPropGetter={eventPropGetter}
        />
      </div>
    </Fragment>
  );
}

Selectable.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
