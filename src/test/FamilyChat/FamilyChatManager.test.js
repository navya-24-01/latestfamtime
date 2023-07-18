import React from "react";
import { render, screen, act } from "@testing-library/react";
import FamilyChatManager from "../../components/Chat/FamilyChatManager";
import { FireBaseContext } from "../../contexts/FireBaseFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockLocation = {
  state: {
    familyid: "test-family-id",
  },
};

const mockNavigate = jest.fn();

jest.mock("../../components/Layout/NavBar", () => () => (
  <div>Mocked NavBar</div>
));

describe("FamilyChatManager", () => {

  beforeEach(() => {
    useLocation.mockReturnValue(mockLocation);
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const getMembersOfFamily = jest.fn(() =>
    Promise.resolve(["member1", "member2"])
  );
  const getChatRoom = jest.fn(() => Promise.resolve("mocked-chat-room"));
  const getMyUserName = jest.fn(() => Promise.resolve("mocked-username"));

  it("renders without crashing", () => {
    render(
      <FireBaseContext.Provider
        value={{ getChatRoom, getMembersOfFamily, getMyUserName }}
      >
        <FamilyChatManager />
      </FireBaseContext.Provider>
    );
    // Ensure that the component renders without throwing any errors
    expect(screen.getByText("My Conversations")).toBeInTheDocument();
  });

  it("sets members and chatRooms state correctly", async () => {
      await act(async () => {
        render(
          <FireBaseContext.Provider
            value={{ getChatRoom, getMembersOfFamily, getMyUserName }}
          >
            <FamilyChatManager />
          </FireBaseContext.Provider>
        );

        // Wait for the async operations in useEffect to complete

        // The state should be set correctly after useEffect runs
        await waitFor(() =>
          expect(screen.getByText("member1")).toBeInTheDocument()
        );

        await waitFor(() =>
          expect(screen.getByText("member2")).toBeInTheDocument()
        );

        await waitFor(() =>
         expect(screen.getByText("Family Chat")).toBeInTheDocument()
        );
        
      
      });
  // You can write more test cases to cover different scenarios here
});})
