import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import { AuthContext } from "../contexts/AuthContext";
import '@testing-library/jest-dom/extend-expect'; 

describe("WelcomePage", () => {
  test("renders WelcomePage component without errors", () => {
    const {queryAllByText}= render(
      <AuthContext.Provider value={{ currentUser: { uid: "mock-uid" } }}>
        <MemoryRouter>
          <WelcomePage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Check if the component renders without errors
    const famTimeElements = screen.queryAllByText("FamTime");
    expect(famTimeElements.length).toBeGreaterThan(0);
  });

  test("displays 'Sign Up' link", () => {
    const {getByText}= render(
        <AuthContext.Provider value={{ currentUser: { uid: "mock-uid" } }}>
        <MemoryRouter>
          <WelcomePage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Check if the 'Sign Up' link is displayed
    expect(screen.getByText(/New User\? Click To/i)).toBeInTheDocument();
  });

  test("displays 'Sign In' link", () => {
    const {getByText}= render(
        <AuthContext.Provider value={{ currentUser: { uid: "mock-uid" } }}>
        <MemoryRouter>
          <WelcomePage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Check if the 'Sign In' link is displayed
    // Define a custom text matcher function
    const signInTextMatcher = (content, element) => {
    const hasText = (node) => node.textContent === content;
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(
      (child) => !hasText(child)
    );
    return elementHasText && childrenDontHaveText;
  };

  // Use the custom text matcher to find the 'Sign In' link
  const signInLink = screen.getByText((content, element) =>
    signInTextMatcher("Sign In ", element)
  );

  // Check if the 'Sign In' link is displayed
  expect(signInLink).toBeInTheDocument();
  });
});

