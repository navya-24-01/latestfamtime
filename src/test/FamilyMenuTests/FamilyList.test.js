import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FamilyList from "../../components/UserHomePage/FamilyList";
import { FireBaseContext } from "../../contexts/FireBaseFunctions";
import { useNavigate } from "react-router-dom";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock the functions from the Firebase context
    const getFamilyName = jest.fn().mockResolvedValue("Test Family Name");
    const getMembersOfFamily = jest
      .fn()
      .mockResolvedValue(["Member 1", "Member 2"]);


const mockNavigate = jest.fn();

describe("FamilyList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the FamilyList component correctly", async () => {

    // Render the FamilyList component with the mocked Firebase context
    const { findByText } = render(
      <FireBaseContext.Provider value={{ getFamilyName, getMembersOfFamily }}>
        <FamilyList familyid="test-family-id" />
      </FireBaseContext.Provider>
    );

  });

  it("navigates to the '/familyhomepage' route when the 'Enter Family' button is clicked", async () => {
    useNavigate.mockReturnValue(mockNavigate); // Mock the navigate function

    const { getByText } = render(
      <FireBaseContext.Provider value={{getFamilyName, getMembersOfFamily}}>
        <FamilyList familyid="test-family-id" />
      </FireBaseContext.Provider>
    );

    const enterFamilyButton = getByText("Enter Family");
    fireEvent.click(enterFamilyButton);

    // Ensure that the navigate function is called with the correct path and state
    expect(mockNavigate).toHaveBeenCalledWith("/familyhomepage", {
      state: { familyid: "test-family-id" },
    });
  });
});
