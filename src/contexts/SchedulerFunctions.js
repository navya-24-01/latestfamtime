import React, { useContext, createContext } from "react";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Import the Firebase Firestore instance from the configuration file
import { db } from "../config/firebase";

// Create a new context for the Scheduler functions
const SchedulerContext = createContext();

// Custom hook to use the Scheduler functions from the context
export function useSchedulerFunctions() {
  return useContext(SchedulerContext);
}

// Component to provide the Scheduler functions through context to its children
export function SchedulerFunctionProvider({ children }) {
  // Reference to the availability collection in the database.
  const eventsRef = collection(db, "availability");

  // Function to add a new availability event to the database
  async function addAvailability(event, familyId) {
    await addDoc(eventsRef, {
      event,
      familyId,
    });
  }

  // Function to delete a specific availability document from the database
  async function deleteAvailabilityDoc(id) {
    await deleteDoc(doc(db, "availability", id));
  }

  // Function to remove a specific availability event from the database
  async function removeAvailability(event, familyId) {
    // Query to get all availability events for the specified familyId and matching event details
    const queryEvents = query(
      eventsRef,
      where("familyId", "==", familyId),
      where("event", "==", event)
    );

    // Get the snapshot of the queried events
    const snapshot = await getDocs(queryEvents);
    let myEvents = [];

    // Iterate through the snapshot and push the document IDs to the myEvents array
    snapshot.forEach((doc) => {
      myEvents.push(doc.id);
    });

    // Create an array of promises to delete each event document
    const promises = myEvents.map((id) => {
      deleteAvailabilityDoc(id);
    });

    // Execute all the delete promises simultaneously using Promise.all
    await Promise.all(promises);
  }

  // Function to get all availability events for a specific familyId
  async function getAvailabilities(familyId) {
    // Query to get all availability events for the specified familyId
    const queryEvents = query(eventsRef, where("familyId", "==", familyId));
    let myEvents = [];

    // Get the snapshot of the queried events
    const snapshot = await getDocs(queryEvents);

    // Iterate through the snapshot and push the data to the myEvents array
    snapshot.forEach((doc) => {
      myEvents.push({ ...doc.data() });
    });

    // Map the data to create a newEvents array with proper format for rendering in the calendar
    const newEvents = myEvents.map((obj) => ({
      title: obj.event.title,
      start: obj.event.start.toDate(),
      end: obj.event.end.toDate(),
    }));
    return newEvents;
  }

  // Create an object containing all the Scheduler functions to be passed as the value for the context
  const value = {
    addAvailability,
    getAvailabilities,
    removeAvailability,
  };

  // Provide the Scheduler functions to its children components through the SchedulerContext.Provider
  return (
    <SchedulerContext.Provider value={value}>
      {children}
    </SchedulerContext.Provider>
  );
}
