import React from "react";
import { render, screen } from "@testing-library/react";
import FamilyChatManager from "./FamilyChatManager";
import { FireBaseContext } from "../../contexts/FireBaseFunctions";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    state: {
      familyid: "mocked-family-id",
    },
  }),
  useNavigate: jest.fn(),
}));

describe("FamilyChatManager", () => {
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
    expect(screen.getByText(/My Conversations/i)).toBeInTheDocument();
  });

  it("sets members and chatRooms state correctly", async () => {
    render((
      <FireBaseContext.Provider
        value={{ getChatRoom, getMembersOfFamily, getMyUserName }}
      >
        <FamilyChatManager />
      </FireBaseContext.Provider>
    ));

    // Wait for the async operations in useEffect to complete
    await screen.findByText(/My Conversations/i);

    // The state should be set correctly after useEffect runs
    expect(screen.getByText(/member1/i)).toBeInTheDocument();
    expect(screen.getByText(/member2/i)).toBeInTheDocument();
    expect(screen.getByText(/Family Chat/i)).toBeInTheDocument();
  });

  // You can write more test cases to cover different scenarios here
});
