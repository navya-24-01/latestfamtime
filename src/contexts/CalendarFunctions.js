import React, { useContext, createContext } from "react";
import {
  collection,
  query,
  where,
  deleteDoc,
  doc,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../config/firebase";

// Create a CalendarContext using createContext
const CalendarContext = createContext();

// Custom hook to access the CalendarContext
export function useCalendarFunctions() {
  return useContext(CalendarContext);
}

// CalendarFunctionProvider component that wraps the app and provides calendar-related functionality
export function CalendarFunctionProvider({ children }) {
  // Creating a reference to the "events" collection in the database.
  const eventsRef = collection(db, "events");

  // Function to delete an event document
  async function deleteEventDoc(id) {
    await deleteDoc(doc(db, "events", id));
  }

  // Function to remove an event from the calendar
  async function removeEvent(event, familyId) {
    // Create a query to find the events matching the familyId and event name
    const queryEvents = query(
      eventsRef,
      where("familyId", "==", familyId),
      where("event", "==", event)
    );

    // Get the matching documents
    const snapshot = await getDocs(queryEvents);
    let myEvents = [];
    snapshot.forEach((doc) => {
      myEvents.push(doc.id);
    });

    //Create an array of promises to delete each matching event document
    const promises = myEvents.map((id) => {
      deleteEventDoc(id);
    });

    // Wait for all the promises to resolve
    await Promise.all(promises);
  }

  // Function to add an event to the calendar
  async function addEvent(event, familyId) {
    await addDoc(eventsRef, {
      event,
      familyId,
    });
  }

  // Function to get all events for a given familyId
  async function getEvents(familyId) {
    // Create a query to get events matching the familyId
    const queryEvents = query(eventsRef, where("familyId", "==", familyId));
    let myEvents = [];

    // Get the documents and extract the event data
    const snapshot = await getDocs(queryEvents);
    snapshot.forEach((doc) => {
      myEvents.push({ ...doc.data() });
      console.log("seethis", doc.data());
    });

    // Transform the event data into the required format
    const newEvents = myEvents.map((obj) => ({
      title: obj.event.title,
      start: obj.event.start.toDate(),
      end: obj.event.end.toDate(),
    }));
    return newEvents;
  }

  // Create the value object that will be provided by the CalendarContext
  const value = {
    removeEvent,
    addEvent,
    getEvents,
  };

  // Render the CalendarContext.Provider and children
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
