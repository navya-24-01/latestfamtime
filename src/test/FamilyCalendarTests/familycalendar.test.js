import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Selectable from "../../components/FamilyCalendar/familycalendar";
import { CalendarContext } from "../../contexts/CalendarFunctions";
import Globalize from "globalize";
import { globalizeLocalizer } from "react-big-calendar";
import "@testing-library/jest-dom/extend-expect";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
}));

const yourLocalizerInstance = globalizeLocalizer(Globalize, { culture: "en" });

describe("Selectable Component", () => {
  const addEvent = jest.fn();
  const getEvents = jest.fn(() => Promise.resolve([]));
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the calendar correctly", () => {
    render(
      <CalendarContext.Provider value={{ addEvent, getEvents }}>
        <Selectable
          localizer={yourLocalizerInstance}
          familyid="test-family-id"
        />
      </CalendarContext.Provider>
    );
  });

  it("clicking the 'Month' button changes the view", () => {
    render(
      <CalendarContext.Provider value={{ addEvent, getEvents }}>
        <Selectable
          localizer={yourLocalizerInstance}
          familyid="test-family-id"
        />
      </CalendarContext.Provider>
    );

    const monthButton = screen.getByRole("button", { name: "Month" });
    fireEvent.click(monthButton);

    const monthView = screen.getByText("Month");
    expect(monthView).toBeInTheDocument();
  });
  
it("clicking the 'Week' button changes the view", () => {
  render(
    <CalendarContext.Provider value={{ addEvent, getEvents }}>
      <Selectable localizer={yourLocalizerInstance} familyid="test-family-id" />
    </CalendarContext.Provider>
  );
  // Find the 'Week' button using its text
  const weekButton = screen.getByRole("button", { name: "Week" });

  // Click the 'Week' button
  fireEvent.click(weekButton);

  // After clicking, check if the calendar view has changed to the 'Week' view
  const weekView = screen.getByText("Week");
  expect(weekView).toBeInTheDocument();
});

it("clicking the 'Day' button changes the view", () => {
  render(
    <CalendarContext.Provider value={{ addEvent, getEvents }}>
      <Selectable localizer={yourLocalizerInstance} familyid="test-family-id" />
    </CalendarContext.Provider>
  );

  const dayButton = screen.getByRole("button", { name: "Day" });
  fireEvent.click(dayButton);

  const dayView = screen.getByText("Day");
  expect(dayView).toBeInTheDocument();
});

it("clicking the 'Agenda' button changes the view", () => {
  render(
    <CalendarContext.Provider value={{ addEvent, getEvents }}>
      <Selectable localizer={yourLocalizerInstance} familyid="test-family-id" />
    </CalendarContext.Provider>
  );

  const agendaButton = screen.getByRole("button", { name: "Agenda" });
  fireEvent.click(agendaButton);

  const agendaView = screen.getByText("Agenda");
  expect(agendaView).toBeInTheDocument();
});

it("opens the dialog box when a slot is selected", () => {
    const { getByRole, queryAllByTestId } = render(
      <CalendarContext.Provider value={{ addEvent, getEvents }}>
        <Selectable
          localizer={yourLocalizerInstance}
          familyid="test-family-id"
        />
      </CalendarContext.Provider>
    );

    // Replace these with your desired start and end times
    const start = new Date(2023, 6, 18, 10, 0); // July 18, 2023, 10:00 AM
    const end = new Date(2023, 6, 18, 11, 0); // July 18, 2023, 11:00 AM

    // Call handleSelectSlot function by clicking on the corresponding button
    const weekButton = getByRole("button", { name: "Week" });
    fireEvent.click(weekButton);

    // Simulate the onSelectSlot event
    const sunButton = getByRole("button", { name: "Sun 12/04" });
    const monButton = getByRole("button", { name: "Mon 13/04" });
    fireEvent.click(sunButton, { start, end });
    fireEvent.click(monButton, { start, end });

    // Check if the dialog box is open
    const dialogTitle = queryAllByTestId("add-event-dialog");
    expect(dialogTitle).toBeInTheDocument;
  });})