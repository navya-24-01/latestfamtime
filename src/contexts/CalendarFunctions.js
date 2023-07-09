import React, { useContext, createContext } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
  addDoc,
  getDocs,
  toDate,
} from "firebase/firestore";

import { db } from "../config/firebase";

const CalendarContext = createContext();

export function useCalendarFunctions() {
  return useContext(CalendarContext);
}

export function CalendarFunctionProvider({ children }) {
  const messageRef = collection(db, "messages");
  //creating a reference to the events collection in the database.
  const eventsRef = collection(db, "events");

  async function addEvent(event, familyId) {
    await addDoc(eventsRef, {
      event,
      familyId,
    });
  }

  async function getEvents(familyId) {
    console.log("see fam id", familyId);
    const queryEvents = query(eventsRef, where("familyId", "==", familyId));
    console.log("see query", queryEvents);
    let myEvents = [];
    const snapshot = await getDocs(queryEvents);
    snapshot.forEach((doc) => {
      myEvents.push({ ...doc.data() });
      console.log("seethis", doc.data());
    });

    const newEvents = myEvents.map((obj) => ({
      title: obj.event.title,
      start: obj.event.start.toDate(),
      end: obj.event.end.toDate(),
    }));
    console.log("see array", newEvents);
    return newEvents;
  }

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
    addEvent,
    getEvents,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
