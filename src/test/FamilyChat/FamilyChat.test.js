import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Chat } from "../../components/Chat/FamilyChat"; // Make sure to correct the import statement accordingly
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

describe("Chat Component", () => {
  it("renders without errors", () => {
    render(<Chat room="test-room" user="test-user" />);
  });

  it("send button is clickable", () => {
    // Render the Chat component
    render(
      <Chat
        room="test-room"
        user="test-user"
        messages={[]} // Pass an empty array for messages as it's not relevant for this test
        // Pass the mock handleSubmit function as a prop
      />
    );

    // Find the input field and the send button
    const inputElement = screen.getByPlaceholderText("Enter your message");
    const sendButtonElement = screen.getByText("Send");

    // Type a message into the input field
    userEvent.type(inputElement, "Hello, this is a test message.");

    // Click the send button
    userEvent.click(sendButtonElement);
  });

  it("input field takes input correctly", () => {
    // Render the Chat component
    render(
      <Chat
        room="test-room"
        user="test-user"
        messages={[]} // Pass an empty array for messages as it's not relevant for this test
        handleSubmit={() => {}} // Mock handleSubmit function as it's not relevant for this test
      />
    );

    // Find the input field
    const inputElement = screen.getByPlaceholderText("Enter your message");

    // Type a message into the input field
    const testMessage = "Hello, this is a test message.";
    userEvent.type(inputElement, testMessage);

    // Verify that the input value is updated correctly
    expect(inputElement).toHaveValue(testMessage);
  });
});
