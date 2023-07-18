// Import necessary testing libraries
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import FamilyList from "./FamilyList";
import { FireBaseContext } from "../contexts/FireBaseFunctions";

// Mock the useFireBase hook
jest.mock("../../contexts/FireBaseFunctions", () => ({
  useFireBase: () => ({
    getFamilyName: jest.fn(),
    getMembersOfFamily: jest.fn(),
  }),
}));

// Mock the react-router-dom useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

// Sample test data
const mockFamilyId = "sample-family-id";
const mockFamilyName = "Sample Family";
const mockMembers = ["Member1", "Member2", "Member3"];

// Mock the image import
jest.mock("../../images/familypic.jpg", () => "mock-familypic");

// Test cases
describe("FamilyList Component", () => {
  // Helper function to render the component with props
  const renderComponent = (props) => {
    return render(
    <FamilyList familyid={mockFamilyId} {...props} />);
  };

  it("should display family name and members", async () => {
    // Mock the getFamilyName and getMembersOfFamily functions
    const { useFireBase } = require("../../contexts/FireBaseFunctions");
    useFireBase().getFamilyName.mockResolvedValue(mockFamilyName);
    useFireBase().getMembersOfFamily.mockResolvedValue(mockMembers);

    renderComponent();

    // Check if the family name and members are displayed
    await screen.findByText(mockFamilyName);
    mockMembers.forEach((member) => {
      expect(screen.getByText(member)).toBeInTheDocument();
    });
  });

  it("should call navigate when 'Enter Family' button is clicked", () => {
    const { useNavigate } = require("react-router-dom");
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    renderComponent();

    // Click the 'Enter Family' button
    fireEvent.click(screen.getByText("Enter Family"));

    // Check if navigate is called with the correct path and state
    expect(navigateMock).toHaveBeenCalledWith("/familyhomepage", {
      state: {
        familyid: mockFamilyId,
      },
    });
  });

  it("should render the image correctly", () => {
    renderComponent();

    // Check if the image is rendered with the correct alt text and source
    const imageElement = screen.getByAltText("familypic");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "mock-familypic");
  });

  // Add more test cases for any other functionality and edge cases as needed
});
