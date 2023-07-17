import React, { useContext, useState, useEffect, createContext } from "react";
import {
  getDoc,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
  collection,
  query,
  where,
  or,
  and,
  limit,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

// Create a new context for the Firebase functions
const FireBaseContext = createContext();

// Custom hook to use the Firebase functions from the context
export function useFireBase() {
  return useContext(FireBaseContext);
}

// Component to provide the Firebase functions through context to its children
export function FunctionProvider({ children }) {
  // Get the current user's authentication state from the custom hook
  const { currentUser } = useAuth();

  // State to hold the message
  const [message, setMessage] = useState();

  // Function to check if a family with the given familyId exists in the database
  async function checkFamilyExists(familyId) {
    const familyref = doc(db, "family", familyId);
    const family = await getDoc(familyref);
    console.log("checkfamilyexists");
    if (!family.exists()) {
      return false;
    } else {
      return true;
    }
  }

  // Function to check if a user with the current user's uid exists in the database
  async function checkUserExists() {
    const userref = doc(db, "user", currentUser.uid);
    const user = await getDoc(userref);
    console.log("checkuserexists");
    if (!user.exists()) {
      return false;
    } else {
      return true;
    }
  }

  // Function to set the user's profile information in the database
  async function setUser(userName) {
    console.log("setUser");
    await setDoc(doc(db, "user", currentUser.uid), {
      userid: currentUser.uid,
      username: userName,
      useremail: currentUser.email,
      userfamilies: [],
    });

    setMessage("Profile has been updated!");
  }

  // Function to create a private chat room between the current user and another user (userId)
  async function createPrivateChat(userId, familyId) {
    console.log("createprivatechat");
    const chatRoomId = uuidv4();
    await setDoc(doc(db, "chat", chatRoomId), {
      familyId,
      users: currentUser.uid + userId,
    });
  }

  // Function to create private chat rooms for all members of a family
  async function createAllPrivateChats(familyId) {
    console.log("createallprivatechats");
    const familyRef = doc(db, "family", familyId);
    const familyData = await getDoc(familyRef);
    const users = familyData.data().userfamilies;
    users.map((user) => createPrivateChat(user, familyId));
  }

  // Function to get the user's ID based on their username
  async function getUserId(userName) {
    console.log("getUserId");
    const q = query(
      collection(db, "user"),
      where("username", "==", userName),
      limit(1)
    );
    const userIds = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => userIds.push(doc.id));
    console.log(userIds[0]);
    console.log("break");
    return userIds[0];
  }

  // Function to get the chat room ID for a conversation between the current user and another user (userName)
  async function getChatRoom(userName, familyId) {
    console.log("getChatRoom");
    const userId = await getUserId(userName);
    const chatRoomIds = [];
    console.log(currentUser.uid + userId);
    const q = query(
      collection(db, "chat"),
      and(
        where("familyId", "==", familyId),
        or(
          where("users", "==", currentUser.uid + userId),
          where("users", "==", userId + currentUser.uid)
        )
      ),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => chatRoomIds.push(doc.id));
    console.log(chatRoomIds[0]);
    console.log(userId);

    return chatRoomIds[0];
  }

  // Function to add the current user to a family (identified by familyId) and create private chat rooms for all family members
  async function addUserToFamily(familyId) {
    console.log("addUserToFamily");
    const familyRef = doc(db, "family", familyId);
    await updateDoc(familyRef, {
      userfamilies: arrayUnion(currentUser.uid),
    });
    createAllPrivateChats(familyId);
  }

  // Function to get an array of family IDs to which the current user belongs
  async function getUsersFamilies() {
    console.log("getUsersFamilies");
    const userRef = doc(db, "user", currentUser.uid);
    const userData = await getDoc(userRef);
    return userData.data().userfamilies;
  }

  // Function to add a family (identified by familyId) to the current user's family list
  async function addFamilyToUser(familyId) {
    console.log("addFamilyToUser");
    const userRef = doc(db, "user", currentUser.uid);
    await updateDoc(userRef, {
      userfamilies: arrayUnion(familyId),
    });
  }

  // Function to get the family name based on the familyID
  async function getFamilyName(familyID) {
    console.log("getFamilyName");
    const familyRef = doc(db, "family", familyID);
    const familyData = await getDoc(familyRef);
    return familyData.data().familyname;
  }

  // Function to create a new family with the provided family name
  function createAFamily(familyName) {
    console.log("createafamily");
    const familyId = uuidv4();
    setDoc(doc(db, "family", familyId), {
      familyname: familyName,
      familyId,
      userfamilies: [currentUser.uid],
    });

    addFamilyToUser(familyId);

    setMessage("family has been created!");
  }

  // Function to allow the current user to join an existing family (identified by familyId)
  async function joinAFamily(familyId) {
    console.log("joinafamily");
    const exists = await checkFamilyExists(familyId);
    if (!exists) {
      setMessage("Family does not exist!");
    } else {
      addUserToFamily(familyId);
      addFamilyToUser(familyId);
    }
  }

  // Function to get the username of the current user
  async function getMyUserName() {
    console.log("getmyusername");
    const userref = doc(db, "user", currentUser.uid);
    const userData = await getDoc(userref);
    return userData.data().username;
  }

  // Function to get the username of another user based on their userId
  async function getOthersUserName(userId) {
    console.log("getothersusername");
    const userref = doc(db, "user", userId);
    const userData = await getDoc(userref);
    return userData.data().username;
  }

  // If the current user is a member of the family, their username will be replaced with "me"
  async function getMembersOfFamily(familyId) {
    console.log("getmembersoffamily");
    const familyRef = doc(db, "family", familyId);
    const familyData = await getDoc(familyRef);

    // Create an array of promises to fetch the usernames of all members of the family
    const promises = familyData
      .data()
      .userfamilies.map((userId) =>
        currentUser.uid == userId ? "me" : getOthersUserName(userId)
      );
    // If the userId is equal to the current user's uid, set the username as "me"
    return Promise.all(promises);
  }

  // Define the value object that holds all the Firebase functions and data to be passed down through the context
  const value = {
    setUser,
    joinAFamily,
    createAFamily,
    getFamilyName,
    getUsersFamilies,
    message,
    checkUserExists,
    getMyUserName,
    getMembersOfFamily,
    getChatRoom,
    getMyUserName,
  };

  // Return the provider with the value object to provide Firebase functions and data to its children
  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
}
