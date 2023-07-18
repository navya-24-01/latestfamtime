import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import FamilyDocs from "../../components/FamilyDocs/FamilyDocs";

jest.mock("react-router-dom", () => ({
    useLocation: jest.fn(),
  }));
  
  const mockLocation = {
    state: {
      familyid: "test-family-id",
    },
  };


describe("FamilyDocs", () => {
  test("renders FamilyDocs component", () => {
    useLocation.mockReturnValue(mockLocation);

    render(
      <MemoryRouter>
        <FamilyDocs />
      </MemoryRouter>
    );

    expect(container).toBeDefined();
    // Add your assertions here to test the component's behavior
  });
});

