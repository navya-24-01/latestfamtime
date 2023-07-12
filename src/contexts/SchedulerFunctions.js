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

import { db } from "../config/firebase";

const SchedulerContext = createContext();

export function useSchedulerFunctions() {
  return useContext(SchedulerContext);
}

export function SchedulerFunctionProvider({ children }) {
  //creating a reference to the availability collection in the database.
  const eventsRef = collection(db, "availability");

  async function addAvailability(event, familyId) {
    await addDoc(eventsRef, {
      event,
      familyId,
    });
  }

  async function deleteAvailabilityDoc(id) {
    await deleteDoc(doc(db, "availability", id));
  }

  async function removeAvailability(event, familyId) {
    const queryEvents = query(
      eventsRef,
      where("familyId", "==", familyId),
      where("event", "==", event)
    );
   
    const snapshot = await getDocs(queryEvents);
    let myEvents = [];
    snapshot.forEach((doc) => {
        myEvents.push(doc.id)
    })
    const promises = myEvents.map((id) => {
       deleteAvailabilityDoc(id);
    });

    await Promise.all(promises);
  }

  async function getAvailabilities(familyId) {
    const queryEvents = query(eventsRef, where("familyId", "==", familyId));
    let myEvents = [];
    const snapshot = await getDocs(queryEvents);
    snapshot.forEach((doc) => {
      myEvents.push({ ...doc.data() });
    });
    

    const newEvents = myEvents.map((obj) => ({
      title: obj.event.title,
      start: obj.event.start.toDate(),
      end: obj.event.end.toDate(),
    }));
    return newEvents;
  }

  const value = {
    addAvailability,
    getAvailabilities,
    removeAvailability,
  };

  return (
    <SchedulerContext.Provider value={value}>
      {children}
    </SchedulerContext.Provider>
  );
}
