import React, { useContext, createContext } from "react";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../config/firebase";

const SchedulerContext = createContext();

export function useSchedulerFunctions() {
  return useContext(SchedulerContext);
}

export function SchedulerFunctionProvider({ children }) {
  //creating a reference to the events collection in the database.
  const eventsRef = collection(db, "availibility");

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

  const value = {
    addEvent,
    getEvents,
  };

  return (
    <SchedulerContext.Provider value={value}>
      {children}
    </SchedulerContext.Provider>
  );
}
