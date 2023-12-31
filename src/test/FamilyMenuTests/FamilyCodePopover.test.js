import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import FamilyCodePopover from "../../components/UserHomePage/FamilyCodePopover";
import "@testing-library/jest-dom/extend-expect";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
}));

describe("FamilyCodePopover", () => {
  it("renders without errors", () => {
    const familyId = "ABC123";
    render(<FamilyCodePopover familyid={familyId} />);
  });

  it("opens the popover when the button is clicked", () => {
    const familyId = "ABC123";
    const { getByText, getByTestId } = render(
      <FamilyCodePopover familyid={familyId} />
    );
    const showFamilyCodeButton = getByText("Show family code");
    fireEvent.click(showFamilyCodeButton);
    const popoverElement = getByTestId("popover");
    expect(popoverElement).toBeInTheDocument();
  });

  it("closes the popover when the button is clicked again", () => {
    const familyId = "ABC123";
    const { getByText, getByTestId } = render(
      <FamilyCodePopover familyid={familyId} />
    );
    const showFamilyCodeButton = getByText("Show family code");
    fireEvent.click(showFamilyCodeButton);
    fireEvent.click(showFamilyCodeButton); // Click again to close the popover
    const popoverElement = getByTestId("popover");
   waitFor(() => {
     expect(popoverElement).not.toBeInTheDocument();
   });
  });

  it("displays the correct family code in the popover", () => {
    const familyId = "ABC123";
    const { getByText } = render(<FamilyCodePopover familyid={familyId} />);
    const showFamilyCodeButton = getByText("Show family code");
    fireEvent.click(showFamilyCodeButton);
    const familyCodeText = getByText(
      "Share this code with your family for them to join!:"
    );
    expect(familyCodeText).toBeInTheDocument();
    const displayedFamilyCode = getByText(familyId);
    expect(displayedFamilyCode).toBeInTheDocument();
  });
});