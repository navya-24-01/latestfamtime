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

const ChatContext = createContext();

export function useChatFunctions() {
  return useContext(ChatContext);
}

export function FunctionProvider({ children }) {
  const messageRef = collection(db, "messages");
  function getMessages(room) {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    let messages = [];
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
    });
    unsubscribe();
    return messages;
  }

  async function addMessage(room, user, newMessage) {
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user,
      room,
    });
  }

  const value = {
    getMessages,
    addMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
