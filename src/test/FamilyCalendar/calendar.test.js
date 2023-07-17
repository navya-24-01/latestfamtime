import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "../../components/FamilyCalendar/calendar";
import Selectable from "../../components/FamilyCalendar/familycalendar"; // Assuming the correct path to the Selectable component
import NavBar from "../../components/Layout/NavBar";
import "@testing-library/jest-dom/extend-expect";

// Mock moment
jest.mock("moment", () => {
  const moment = () => ({
    format: jest.fn().mockReturnValue("2023-07-20T12:00:00.000Z"), // Replace with any desired date in ISO format
    utcOffset: jest.fn().mockReturnValue(0), // Mock the utcOffset function
  });
  moment.utc = jest.fn().mockReturnValue(moment); // Mock the utc function
  return moment;
});

// Mock the NavBar component
jest.mock("../../components/Layout/NavBar", () => () => (
  <div>Mocked NavBar</div>
));

jest.mock("../../components/FamilyCalendar/familycalendar", () => () => (
  <div>mocked-selectable</div>
));

/*const props = {
    familyid : "test-family-id",
    localizer : "moment"
}*/
/*jest.mock("../../components/FamilyCalendar/familycalendar", () => () => (
  <div data-testid = "selectable">Mocked Selectable</div>
));*/

/*jest.mock("../../components/FamilyCalendar/familycalendar", () => ({
  Selectable: (props) => {
    const MockSelectable = "mocked-selectable";
    return <MockSelectable{...props} />;
  },
}));*/



jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockLocation = {
  state: {
    familyid: "test-family-id",
  },
};

const mockNavigate = jest.fn();

describe("Calendar", () => {
  beforeEach(() => {
    useLocation.mockReturnValue(mockLocation);
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Calendar component with the correct header text", () => {
    const { getByText } = render(<Calendar />);
    const headerText = getByText("My Conversations");
    expect(headerText).toBeInTheDocument();
  });

  it("renders the Selectable component", () => {
    const { getByText } = render(<Calendar />);
    const selectableComponent = getByText("mocked-selectable");

    // Ensure that the Selectable component is rendered with the correct props
    expect(selectableComponent).toBeInTheDocument();
    /*expect(selectableComponent.props.localizer).toBe("moment");
    expect(selectableComponent.props.familyid).toBe("test-family-id");*/
  });

  it("navigates to the '/familytimescheduler' route when the button is clicked", () => {
    const { getByText } = render(<Calendar />);
    const button = getByText(
      "Click to schedule time with your family for this week!"
    );

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/familytimescheduler", {
      state: { familyid: "test-family-id" },
    });
  });

  it("renders the mocked NavBar component", () => {
    const { getByText } = render(<Calendar />);
    const mockedNavBar = getByText("Mocked NavBar");
    expect(mockedNavBar).toBeInTheDocument();
  });

  // Add more test cases as needed for other components or functionalities in the Calendar component
});
