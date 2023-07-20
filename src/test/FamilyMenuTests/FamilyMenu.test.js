import React from "react";
import { render, screen } from "@testing-library/react";
import FamilyMenu from "../../components/UserHomePage/FamilyMenu";
import { FireBaseContext } from "../../contexts/FireBaseFunctions";
import "@testing-library/jest-dom/extend-expect";


// Mock the FirebaseContext value with a mock getUsersFamilies function
const mockGetUsersFamilies = jest.fn(() =>
  Promise.resolve(["family1", "family2", "family3"])
);

//Mock the NavBar component
jest.mock("../../components/Layout/NavBar", () => () => (
  <div>Mocked NavBar</div>
));

test("renders FamilyMenu without errors", async () => {
  render(
    <FireBaseContext.Provider
      value={{ getUsersFamilies: mockGetUsersFamilies }}
    >
      <FamilyMenu />
    </FireBaseContext.Provider>
  );
});

test("displays 'Welcome Back To FamTime' text", async () => {
  render(
    <FireBaseContext.Provider
      value={{ getUsersFamilies: mockGetUsersFamilies }}
    >
      <FamilyMenu />
    </FireBaseContext.Provider>
  );
  const welcomeText = screen.getByText("Welcome Back To FamTime");
  expect(welcomeText).toBeInTheDocument();
});

test("renders FamilyCreator component", async () => {
  render(
    <FireBaseContext.Provider
      value={{ getUsersFamilies: mockGetUsersFamilies }}
    >
      <FamilyMenu />
    </FireBaseContext.Provider>
  );
  const familyCreator = screen.getByText("Create a new family"); // Replace with the actual test ID of FamilyCreator component
  expect(familyCreator).toBeInTheDocument();
});

test("renders FamilyJoiner component", async () => {
  render(
    <FireBaseContext.Provider
      value={{ getUsersFamilies: mockGetUsersFamilies }}
    >
      <FamilyMenu />
    </FireBaseContext.Provider>
  );
  const familyJoiner = screen.getByText("Join a new family"); // Replace with the actual test ID of FamilyJoiner component
  expect(familyJoiner).toBeInTheDocument();
});

it("renders the mocked NavBar component", async () => {
     const { getByText } = render(
       <FireBaseContext.Provider
         value={{ getUsersFamilies: mockGetUsersFamilies }}
       >
         <FamilyMenu />
       </FireBaseContext.Provider>
     );
    const mockedNavBar = getByText("Mocked NavBar");
    expect(mockedNavBar).toBeInTheDocument();
  });
