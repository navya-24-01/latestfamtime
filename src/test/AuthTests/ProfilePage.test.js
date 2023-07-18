import React from "react"; 
import { render, fireEvent, waitFor } from "@testing-library/react"; 
import { FireBaseContext } from "../../contexts/FireBaseFunctions"; 
import ProfilePage from "../../components/Auth/ProfilePage"; 
import { MemoryRouter, Route, useNavigate } from "react-router-dom"; 
import "@testing-library/jest-dom/extend-expect"; 
 
 
const message = "Creating your profile"; 
const setUser = jest.fn(); 
const checkUserExists = jest.fn().mockResolvedValue(false); 
 
jest.mock("react-router-dom", () => { 
  const originalModule = jest.requireActual("react-router-dom"); 
  return { 
    ...originalModule, 
    useNavigate: () => jest.fn(), 
  }; 
}); 
 
describe("ProfilePage", () => { 
      
  it("renders without errors when a new user enters", () => { 
    render( 
      <FireBaseContext.Provider 
        value={{ 
          message, 
          setUser, 
          checkUserExists: jest.fn().mockResolvedValue(false), 
        }} 
      > 
        <MemoryRouter> 
          <ProfilePage /> 
        </MemoryRouter> 
      </FireBaseContext.Provider> 
    ); 
  }); 
});






