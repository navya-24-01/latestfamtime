import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import FamilyCreator from "../../components/UserHomePage/FamilyCreator";
import "@testing-library/jest-dom/extend-expect";
import {
  FireBaseContext,
} from "../../contexts/FireBaseFunctions";

describe("FamilyCreator", () => {
  const createAFamily = jest.fn();

  it("renders without errors", () => {
    render(
      <FireBaseContext.Provider value={{ createAFamily }}>
        <FamilyCreator />
      </FireBaseContext.Provider>
    );
  });

  it("opens the dialog when the button is clicked", () => {
    const { getByText, getByRole, getByLabelText } = render(
      <FireBaseContext.Provider value={{ createAFamily }}>
        <FamilyCreator />
      </FireBaseContext.Provider>
    );
    const createFamilyButton = getByText("Create a new family");
    fireEvent.click(createFamilyButton);
    const dialogElement = getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });

  it("closes the dialog when the cancel button is clicked", async () => {
    const { getByText, queryByText } = render(
      <FireBaseContext.Provider value={{ createAFamily }}>
        <FamilyCreator />
      </FireBaseContext.Provider>
    );
    const createFamilyButton = getByText("Create a new family");
    fireEvent.click(createFamilyButton);
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    // Wait for the dialog to be removed from the DOM
    await waitForElementToBeRemoved(() => queryByText("Create A New Family!"));

    // Check that the dialog is no longer in the DOM
    expect(queryByText("Create A New Family!")).toBeNull();
  });

  it("submits the form with the provided family name", async () => {
    const { getByText, getByLabelText } = render(
      <FireBaseContext.Provider value={{ createAFamily }}>
        <FamilyCreator />
      </FireBaseContext.Provider>
    );
    const createFamilyButton = getByText("Create a new family");
    fireEvent.click(createFamilyButton);
    const familyNameInput = getByLabelText("familyname");
    const saveButton = getByText("Save");
    fireEvent.change(familyNameInput, { target: { value: "My Family" } });
    fireEvent.click(saveButton);

    // Wait for the createAFamily function to be called

    await waitFor(() => expect(createAFamily).toHaveBeenCalled());
  });
});
