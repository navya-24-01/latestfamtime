import React from "react";
import { render, screen } from "@testing-library/react";
import BasicAlerts from "../../components/Layout/ErrorAlert";
import "@testing-library/jest-dom/extend-expect"
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

describe("BasicAlerts", () => {
  test("renders BasicAlerts component with error message", async () => {
    const errorMessage = "This is an error message";

    const {getByText}= render(<BasicAlerts errorText={errorMessage} />);

    // Check if the error message is rendered correctly
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});