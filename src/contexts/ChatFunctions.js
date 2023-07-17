import React, { useContext, createContext } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Create a ChatContext using createContext
const ChatContext = createContext();

// Custom hook to access the ChatContext
export function useChatFunctions() {
  return useContext(ChatContext);
}

// FunctionProvider component that wraps the app and provides chat-related functionality
export function FunctionProvider({ children }) {
  // FunctionProvider component that wraps the app and provides chat-related functionality
  const messageRef = collection(db, "messages");

  // Function to get messages for a given room
  function getMessages(room) {
    // Create a query to get messages matching the room, ordered by createdAt
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    let messages = [];

    // Subscribe to the query and listen for changes
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      snapshot.forEach((doc) => {
        // Push each message document data along with its ID into the messages array
        messages.push({ ...doc.data(), id: doc.id });
      });
    });

    // Unsubscribe from the query to stop listening for changes
    unsubscribe();

    // Return the messages array
    return messages;
  }

  // Function to add a new message to a room
  async function addMessage(room, user, newMessage) {
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user,
      room,
    });
  }

  // Create the value object that will be provided by the ChatContext
  const value = {
    getMessages,
    addMessage,
  };
  
  // Render the ChatContext.Provider and children
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
