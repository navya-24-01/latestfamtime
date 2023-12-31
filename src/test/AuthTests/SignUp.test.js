import React from "react"; 
import { render, screen, fireEvent } from "@testing-library/react"; 
import SignUp from "../../components/Auth/SignUp"; 
import { AuthContext } from "../../contexts/AuthContext"; 
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
 
// Mock the AuthContext value with a mock signup function and errorText state 
const mockSignup = jest.fn(); 
const mockErrorText = "Mock error message"; 

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
}));
 
test("renders SignUp without errors", () => { 
  render( 
    <AuthContext.Provider 
      value={{ signup: mockSignup, currentUser: null, errorTextSignUp: null }} 
    >
        <MemoryRouter>
        <SignUp /> 
        </MemoryRouter>
    </AuthContext.Provider> 
  ); 
}); 
 
test("displays 'Sign up' text", () => { 
  render( 
    <AuthContext.Provider 
      value={{ signup: mockSignup, currentUser: null, errorTextSignUp: null }} 
    >
        <MemoryRouter>
        <SignUp />
        </MemoryRouter> 
    </AuthContext.Provider> 
  ); 
  const signUpText = screen.getByText("Sign up"); 
  expect(signUpText).toBeInTheDocument(); 
}); 
 
 
test("displays error message if errorText is present", () => { 
  render( 
    <AuthContext.Provider 
      value={{ 
        signup: mockSignup, 
        currentUser: null, 
        errorTextSignUp: mockErrorText, 
      }} 
    >
        <MemoryRouter>
        <SignUp />
        </MemoryRouter> 
    </AuthContext.Provider> 
  ); 
 
  const errorMessage = screen.getByText(mockErrorText); 
  expect(errorMessage).toBeInTheDocument(); 
});


 
