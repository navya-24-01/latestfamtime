import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import FamilyHomePage from "../components/FamilyHomePage";
import { AuthContext } from "../contexts/AuthContext";
import { FireBaseContext } from "../contexts/FireBaseFunctions";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

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

describe("FamilyHomePage", () => {
  const mockFamilyName = "Test Family";
  const mockMembers = ["Member 1", "Member 2"];

  const mockGetFamilyName = jest.fn().mockResolvedValue(mockFamilyName);
  const mockGetMembersOfFamily = jest
    .fn()
    .mockResolvedValue(mockMembers);

  const mockNavigate = jest.fn();

  beforeEach(() => {
    useLocation.mockReturnValue({
      state: {
        familyid: "test-family-id",
      },
    });
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders FamilyHomePage component without errors", () => {
    render(
      <AuthContext.Provider value={{}}>
        <MemoryRouter>
          <FireBaseContext.Provider
            value={{ getFamilyName: mockGetFamilyName, getMembersOfFamily: mockGetMembersOfFamily }}
          >
            <FamilyHomePage />
          </FireBaseContext.Provider>
        </MemoryRouter>
      </AuthContext.Provider>
    );

  });

  test("clicking Family Chat button navigates to Family Chat page", () => {
    render(
      <AuthContext.Provider value={{}}>
        <MemoryRouter>
          <FireBaseContext.Provider
            value={{ getFamilyName: mockGetFamilyName, getMembersOfFamily: mockGetMembersOfFamily }}
          >
            <FamilyHomePage />
          </FireBaseContext.Provider>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Simulate clicking the Family Chat button
    fireEvent.click(screen.getByText("Enter Family Chat"));

    // Check if useNavigate is called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith("/familychatmanager", {
      state: { familyid: "test-family-id" },
    });
  });

  test("clicking Family Docs button navigates to Family Docs page", () => {
    render(
      <AuthContext.Provider value={{}}>
        <MemoryRouter>
          <FireBaseContext.Provider
            value={{ getFamilyName: mockGetFamilyName, getMembersOfFamily: mockGetMembersOfFamily }}
          >
            <FamilyHomePage />
          </FireBaseContext.Provider>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Simulate clicking the Family Docs button
    fireEvent.click(screen.getByText("Enter Family Docs"));

    // Check if useNavigate is called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith("/familydocs", {
      state: { familyid: "test-family-id" },
    });
  });

  test("clicking Family Calendar button navigates to Family Calendar page", () => {
    render(
      <AuthContext.Provider value={{}}>
        <MemoryRouter>
          <FireBaseContext.Provider
            value={{ getFamilyName: mockGetFamilyName, getMembersOfFamily: mockGetMembersOfFamily }}
          >
            <FamilyHomePage />
          </FireBaseContext.Provider>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Simulate clicking the Family Calendar button
    fireEvent.click(screen.getByText("Enter Family Calendar"));

    // Check if useNavigate is called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith("/familycalendar", {
      state: { familyid: "test-family-id" },
    });
  });
});
