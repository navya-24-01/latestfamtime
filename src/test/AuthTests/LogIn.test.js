import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogIn from "../../components/Auth/LogIn";
import { AuthContext } from "../../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

// Mock the AuthContext value
const login = jest.fn();
const errorText = "Invalid credentials";

test("renders LogIn without errors", async () => {
  render(
    <AuthContext.Provider value={{ login, errorText }}>
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    </AuthContext.Provider>
  );
});


test("displays the error message when there is an error", async () => {
  render(
    <AuthContext.Provider value={{ login, errorText }}>
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  // Wait for the error message to be displayed
  await waitFor(() => screen.getByText("Invalid credentials"));

  // Check if the error message is rendered
  expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
});
