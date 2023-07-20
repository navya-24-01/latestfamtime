import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import FamilyJoiner from "../../components/UserHomePage/FamilyJoiner";
import "@testing-library/jest-dom/extend-expect";
import {FireBaseContext} from "../../contexts/FireBaseFunctions";

describe("FamilyJoiner", () => {
  const joinAFamily = jest.fn();

  it("renders without errors", () => {
    render(
      <FireBaseContext.Provider value={{ joinAFamily }}>
        <FamilyJoiner />
      </FireBaseContext.Provider>
    );
  });

  it("opens the dialog when the button is clicked", async () => {
    const { getByText, getByRole } = render(
      <FireBaseContext.Provider value={{ joinAFamily }}>
        <FamilyJoiner />
      </FireBaseContext.Provider>
    );
    const joinFamilyButton = getByText("Join a new family");
    fireEvent.click(joinFamilyButton);
    const dialogElement = getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });

  it("closes the dialog when the cancel button is clicked", async () => {
    const { getByText, queryByText } = render(
      <FireBaseContext.Provider value={{ joinAFamily }}>
        <FamilyJoiner />
      </FireBaseContext.Provider>
    );
    const joinFamilyButton = getByText("Join a new family");
    fireEvent.click(joinFamilyButton);
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    // Wait for the dialog to be removed from the DOM
    await waitFor(() => expect(queryByText("Join a Family")).toBeNull());
  });

  it("submits the form with the provided family code", async () => {
    const { getByText, getByLabelText } = render(
      <FireBaseContext.Provider value={{ joinAFamily }}>
        <FamilyJoiner />
      </FireBaseContext.Provider>
    );
    const joinFamilyButton = getByText("Join a new family");
    fireEvent.click(joinFamilyButton);
    const familyCodeInput = getByLabelText("familycode");
    const enterButton = getByText("Enter");
    fireEvent.change(familyCodeInput, { target: { value: "ABC123" } });
    fireEvent.click(enterButton);

    // Wait for the joinAFamily function to be called with the correct family code
    await waitFor(() => expect(joinAFamily).toHaveBeenCalledWith("ABC123"));
  });
});
