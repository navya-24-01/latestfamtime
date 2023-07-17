import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Selectable from "../../components/FamilyCalendar/familycalendar";
import { CalendarContext } from "../../contexts/CalendarFunctions";
import Globalize from "globalize";
import { globalizeLocalizer } from "react-big-calendar";

const yourLocalizerInstance = globalizeLocalizer(Globalize, { culture: "en" });
describe("Selectable Component", () => {

  const addEvent = jest.fn();
    const getEvents =  jest.fn(() => Promise.resolve([]));
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

  /*it("opens the dialog on selecting a slot", () => {
    render(
      <CalendarContext.Provider value={{ addEvent, getEvents }}>
        <Selectable
          localizer={yourLocalizerInstance}
          familyid="test-family-id"
        />
      </CalendarContext.Provider>
    );
    const calendar = screen.getByRole("presentation");

    // Mock the selected slot for testing
    const start = new Date();
    const end = new Date();
    fireEvent.select(calendar, { start, end });

    // Verify that the dialog is open after selecting a slot
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes the dialog on clicking 'Cancel'", () => {
    render(
      <CalendarContext.Provider value={{ addEvent, getEvents }}>
        <Selectable
          localizer={yourLocalizerInstance}
          familyid="test-family-id"
        />
      </CalendarContext.Provider>
    );
    const calendar = screen.getByRole("presentation");

    // Mock the selected slot for testing
    const start = new Date();
    const end = new Date();
    fireEvent.select(calendar, { start, end });

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);

    // Verify that the dialog is closed after clicking "Cancel"
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("submits the event and adds it to the calendar", async () => {
    const addEvent = jest.fn();
   
    render(
      <CalendarContext.Provider value={{ addEvent, getEvents }}>
        <Selectable
          localizer={yourLocalizerInstance}
          familyid="test-family-id"
        />
      </CalendarContext.Provider>
    );
    const calendar = screen.getByRole("presentation");

    // Mock the selected slot and event title for testing
    const start = new Date();
    const end = new Date();
    fireEvent.select(calendar, { start, end });

    const eventTitle = "Test Event";
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: eventTitle } });

    const addButton = screen.getByRole("button", { name: "Add Event" });
    fireEvent.click(addButton);

    // Verify that the addEvent function is called with the correct event object
    expect(addEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        start: expect.any(Date),
        end: expect.any(Date),
        title: eventTitle,
      }),
      "test-family-id" // Ensure the correct family id is used
    );

    // Verify that the dialog is closed after clicking "Add Event"
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });*/

  // You can write more test cases to cover different scenarios and edge cases.
});
