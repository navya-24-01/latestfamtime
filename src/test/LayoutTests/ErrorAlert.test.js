import React from "react";
import { render, screen } from "@testing-library/react";
import BasicAlerts from "../../components/Layout/ErrorAlert";
import "@testing-library/jest-dom/extend-expect"
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
  serverTimestamp: jest.fn()
}));

describe("BasicAlerts", () => {
  test("renders BasicAlerts component with error message", () => {
    const errorMessage = "This is an error message";

    const {getByText}= render(<BasicAlerts errorText={errorMessage} />);

    // Check if the error message is rendered correctly
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});