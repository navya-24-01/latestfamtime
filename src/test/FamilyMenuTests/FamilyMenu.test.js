import React from "react";
import { render, screen } from "@testing-library/react";
import FamilyMenu from "../../components/UserHomePage/FamilyMenu";
import { FireBaseContext } from "../../contexts/FireBaseFunctions";
import "@testing-library/jest-dom/extend-expect";

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

// Mock the FirebaseContext value with a mock getUsersFamilies function
const mockGetUsersFamilies = jest.fn(() =>
  Promise.resolve(["family1", "family2", "family3"])
);

//Mock the NavBar component
jest.mock("../../components/Layout/NavBar", () => () => (
  <div>Mocked NavBar</div>
));

//Mock the HomeButton component
jest.mock("../../components/Layout/HomeButton", () => () => (
  <div>Mocked HomeButton</div>
));

//Mock the BackButton component
jest.mock("../../components/Layout/BackButton", () => () => (
  <div>Mocked BackButton</div>
));

test("renders FamilyMenu without errors", () => {
  render(
    <FireBaseContext.Provider
      value={{ getUsersFamilies: mockGetUsersFamilies, familyAdded: jest.fn() }}
    >
      <FamilyMenu />
    </FireBaseContext.Provider>
  );
});

test("displays 'Welcome Back To FamTime' text", () => {
  render(
    <FireBaseContext.Provider
      value={{ getUsersFamilies: mockGetUsersFamilies, familyAdded: jest.fn() }}
    >
      <FamilyMenu />
    </FireBaseContext.Provider>
  );
  const welcomeText = screen.getByText("Welcome Back To FamTime");
  expect(welcomeText).toBeInTheDocument();
});

test("renders FamilyCreator component", () => {
  render(
    <FireBaseContext.Provider
      value={{ getUsersFamilies: mockGetUsersFamilies, familyAdded: jest.fn() }}
    >
      <FamilyMenu />
    </FireBaseContext.Provider>
  );
  const familyCreator = screen.getByText("Create a new family"); // Replace with the actual test ID of FamilyCreator component
  expect(familyCreator).toBeInTheDocument();
});

test("renders FamilyJoiner component", () => {
  render(
    <FireBaseContext.Provider
      value={{ getUsersFamilies: mockGetUsersFamilies, familyAdded: jest.fn() }}
    >
      <FamilyMenu />
    </FireBaseContext.Provider>
  );
  const familyJoiner = screen.getByText("Join a new family"); // Replace with the actual test ID of FamilyJoiner component
  expect(familyJoiner).toBeInTheDocument();
});

it("renders the mocked NavBar component", () => {
     const { getByText } = render(
       <FireBaseContext.Provider
         value={{ getUsersFamilies: mockGetUsersFamilies, familyAdded: jest.fn() }}
       >
         <FamilyMenu />
       </FireBaseContext.Provider>
     );
    const mockedNavBar = getByText("Mocked NavBar");
    expect(mockedNavBar).toBeInTheDocument();
  });