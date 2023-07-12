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

const CalendarContext = createContext();

export function useCalendarFunctions() {
  return useContext(CalendarContext);
}

export function CalendarFunctionProvider({ children }) {
  //creating a reference to the events collection in the database.
  const eventsRef = collection(db, "events");

  async function deleteEventDoc(id) {
    await deleteDoc(doc(db, "events", id));
  }

  async function removeEvent(event, familyId) {
    const queryEvents = query(
      eventsRef,
      where("familyId", "==", familyId),
      where("event", "==", event)
    );

    const snapshot = await getDocs(queryEvents);
    let myEvents = [];
    snapshot.forEach((doc) => {
      myEvents.push(doc.id);
    });
    const promises = myEvents.map((id) => {
      deleteEventDoc(id);
    });

    await Promise.all(promises);
  }

  async function addEvent(event, familyId) {
    await addDoc(eventsRef, {
      event,
      familyId,
    });
  }

  async function getEvents(familyId) {
    const queryEvents = query(eventsRef, where("familyId", "==", familyId));
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
    return newEvents;
  }

  const value = {
    removeEvent,
    addEvent,
    getEvents,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
