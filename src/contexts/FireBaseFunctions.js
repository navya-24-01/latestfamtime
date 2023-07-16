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

export const FireBaseContext = createContext();

export function useFireBase() {
  return useContext(FireBaseContext);
}

export function FunctionProvider({ children }) {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState();

  // function checks if a family with the given family Id exists
  async function checkFamilyExists(familyId) {
    const familyref = doc(db, "family", familyId);
    const family = await getDoc(familyref);
    console.log("checkfamilyexists")
    if (!family.exists()) {
      return false;
    } else {
      return true;
    }
  }

  async function checkUserExists() {
    const userref = doc(db, "user", currentUser.uid);
    const user = await getDoc(userref);
    console.log("checkuserexists")
    if (!user.exists()) {
      return false;
    } else {
      return true;
    }
  }

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

  async function createPrivateChat(userId, familyId) {
    console.log("createprivatechat");
    const chatRoomId = uuidv4();
    await setDoc(doc(db, "chat", chatRoomId), {
      familyId,
      users: currentUser.uid + userId,
    });
  }

  async function createAllPrivateChats(familyId) {
    console.log("createallprivatechats");
    const familyRef = doc(db, "family", familyId);
    const familyData = await getDoc(familyRef);
    const users = familyData.data().userfamilies;
    users.map((user) => createPrivateChat(user, familyId));
  }

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

  async function addUserToFamily(familyId) {
    console.log("addUserToFamily");
    const familyRef = doc(db, "family", familyId);
    await updateDoc(familyRef, {
      userfamilies: arrayUnion(currentUser.uid),
    });
    createAllPrivateChats(familyId);
  }

  async function getUsersFamilies() {
    console.log("getUsersFamilies");
    const userRef = doc(db, "user", currentUser.uid);
    const userData = await getDoc(userRef);
    return userData.data().userfamilies;
  }

  async function addFamilyToUser(familyId) {
    console.log("addFamilyToUser");
    const userRef = doc(db, "user", currentUser.uid);
    await updateDoc(userRef, {
      userfamilies: arrayUnion(familyId),
    });
  }

  async function getFamilyName(familyID) {
    console.log("getFamilyName");
    const familyRef = doc(db, "family", familyID);
    const familyData = await getDoc(familyRef);
    return familyData.data().familyname;
  }

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

  async function getMyUserName() {
    console.log("getmyusername");
    const userref = doc(db, "user", currentUser.uid);
    const userData = await getDoc(userref);
    return userData.data().username;
  }

  async function getOthersUserName(userId) {
    console.log("getothersusername");
    const userref = doc(db, "user", userId);
    const userData = await getDoc(userref);
    return userData.data().username;
  }

  async function getMembersOfFamily(familyId) {
    console.log("getmembersoffamily");
    const familyRef = doc(db, "family", familyId);
    const familyData = await getDoc(familyRef);
    const promises = familyData
      .data()
      .userfamilies.map((userId) =>
        currentUser.uid == userId ? "me" : getOthersUserName(userId)
      );
    return Promise.all(promises);
  }

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

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
}
