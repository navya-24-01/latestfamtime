import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "../../components/Layout/NavBar";
import { AuthContext } from "../../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom";

//Mock the HomeButton component
jest.mock("../../components/Layout/HomeButton", () => () => (
  <div>Mocked HomeButton</div>
));

//Mock the BackButton component
jest.mock("../../components/Layout/BackButton", () => () => (
  <div>Mocked BackButton</div>
));

describe("NavBar", () => {
  test("renders NavBar component without errors", async () => {
    const {getByText}= render(
      <AuthContext.Provider value={{ currentUser: { uid: "mock-uid" } }}>
        <MemoryRouter>
        <NavBar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Example assertion - Check if the component renders without errors
    expect(screen.getByText("Mocked HomeButton")).toBeInTheDocument();
  });

  test("displays LogOut button when user is logged in", async () => {
    render(
      <AuthContext.Provider value={{ currentUser: { uid: "mock-uid" } }}>
        <MemoryRouter>
        <NavBar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Check if the LogOut button is displayed
    expect(screen.getByRole("button", { name: "Log Out" })).toBeInTheDocument();
  });

  test("does not display LogOut button when user is not logged in", async () => {
    render(
      <AuthContext.Provider value={{ currentUser: null }}>
        <NavBar />
      </AuthContext.Provider>
    );

    // Check if the LogOut button is not displayed
    expect(screen.queryByRole("button", { name: "Log Out" })).toBeNull();
  });
});