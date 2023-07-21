import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import FamilyDocs from "../../components/FamilyDocs/FamilyDocs";
import { AuthContext } from "../../contexts/AuthContext";

jest.mock("../../components/Layout/NavBar", () => {
  return function MockNavBar() {
    return <div>Mocked NavBar</div>; // Provide a mock implementation for the NavBar component
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

const currentUser = { uid: "jefnbhkehfn" };

describe("FamilyDocs", () => {
  test("renders FamilyDocs component without errors", async () => {
    const mockLocation = {
      state: {
        familyid: "test-family-id",
      },
    };

    useLocation.mockReturnValue(mockLocation);

    render(
      <AuthContext.Provider value={{ currentUser }}>
        <MemoryRouter>
          <FamilyDocs />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });
});