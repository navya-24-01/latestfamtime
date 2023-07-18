/*import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FirebaseContext, useFireBase } from "../../contexts/FireBaseFunctions";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";

// Mock the dependencies or provide actual implementations for testing
jest.mock("firebase/firestore", () => ({
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  arrayUnion: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  or: jest.fn(),
  and: jest.fn(),
  limit: jest.fn(),
  getDocs: jest.fn(),
}));

// Mock the useAuth hook
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(() => ({ currentUser: { uid: "testUserId", email: "test@example.com" } })),
}));

// Mock the db object
const mockDb = {
  collection: jest.fn(() => mockDb),
  doc: jest.fn(() => mockDb),
  get: jest.fn(),
  set: jest.fn(),
  update: jest.fn(),
};

const currentUser = {
    uid : "testUserId",
    email : "test@example.com" 
}

describe("Firebase Functions", () => {
  let wrapper;
  let fireBase;

  beforeEach(() => {
    wrapper = ({ children }) => (
        <AuthContext.Provider value={currentUser}>
            <FirebaseContext.Provider value={fireBase}>{children}</FirebaseContext.Provider>
        </AuthContext.Provider>

    );
    fireBase = {
      db: mockDb, // Use the mock db object
      // Mocked functions or provide actual implementations if needed
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("checkFamilyExists", () => {
    it("should return false if family does not exist", async () => {
      // Mock the necessary Firestore functions and their return values
      const mockGetDoc = jest.fn(() => ({ exists: false }));
      jest.spyOn(fireBase.db, "doc").mockImplementation(() => ({
        get: mockGetDoc,
      }));

      await act(async () => {
        render(<Component />, { wrapper });
      });

      // Assertions or expectations
    });

    it("should return true if family exists", async () => {
      // Mock the necessary Firestore functions and their return values
      const mockGetDoc = jest.fn(() => ({ exists: true }));
      jest.spyOn(fireBase.db, "doc").mockImplementation(() => ({
        get: mockGetDoc,
      }));

      await act(async () => {
        render(<Component />, { wrapper });
      });

      // Assertions or expectations
    });
  });

  describe("checkUserExists", () => {
    it("should return false if user does not exist", async () => {
      // Mock the necessary Firestore functions and their return values
      const mockGetDoc = jest.fn(() => ({ exists: false }));
      jest.spyOn(fireBase.db, "doc").mockImplementation(() => ({
        get: mockGetDoc,
      }));

      let result;
      await act(async () => {
        render(<Component />, { wrapper });
        result = await fireBase.checkUserExists();
      });

      expect(result).toBe(false);
      expect(fireBase.db.doc).toHaveBeenCalledWith(fireBase.db, "user", currentUser.uid);
      expect(mockGetDoc).toHaveBeenCalled();
    });

    it("should return true if user exists", async () => {
      // Mock the necessary Firestore functions and their return values
      const mockGetDoc = jest.fn(() => ({ exists: true }));
      jest.spyOn(fireBase.db, "doc").mockImplementation(() => ({
        get: mockGetDoc,
      }));

      let result;
      await act(async () => {
        render(<Component />, { wrapper });
        result = await fireBase.checkUserExists();
      });

      expect(result).toBe(true);
      expect(fireBase.db.doc).toHaveBeenCalledWith(fireBase.db, "user", currentUser.uid);
      expect(mockGetDoc).toHaveBeenCalled();
    });
  });

  describe("setUser", () => {
    it("should set the user document with the provided details", async () => {
      // Mock the necessary Firestore functions
      const mockSetDoc = jest.fn();
      jest.spyOn(fireBase.db, "doc").mockImplementation(() => ({
        set: mockSetDoc,
      }));

      const userName = "John Doe";
      await act(async () => {
        render(<Component />, { wrapper });
        await fireBase.setUser(userName);
      });

      expect(fireBase.db.doc).toHaveBeenCalledWith(fireBase.db, "user", currentUser.uid);
      expect(mockSetDoc).toHaveBeenCalledWith({
        userid: currentUser.uid,
        username: userName,
        useremail: currentUser.email,
        userfamilies: [],
      });
      expect(setMessage).toHaveBeenCalledWith("Profile has been updated!");
    });
  });


  describe("createPrivateChat", () => {
    it("should create a private chat room with the provided user IDs and family ID", async () => {
      // Mock the necessary Firestore functions
      const mockSetDoc = jest.fn();
      jest.spyOn(fireBase.db, "doc").mockImplementation(() => ({
        set: mockSetDoc,
      }));

      const userId = "testUserId";
      const familyId = "testFamilyId";
      const chatRoomId = "testChatRoomId";
      jest.spyOn(uuidv4, "v4").mockReturnValue(chatRoomId);

      await act(async () => {
        render(<Component />, { wrapper });
        await fireBase.createPrivateChat(userId, familyId);
      });

      expect(fireBase.db.doc).toHaveBeenCalledWith(fireBase.db, "chat", chatRoomId);
      expect(mockSetDoc).toHaveBeenCalledWith({
        familyId,
        users: currentUser.uid + userId,
      });
    });
  });


  describe("createAllPrivateChats", () => {
    it("should create private chat rooms for all users in the family", async () => {
      // Mock the necessary Firestore functions and their return values
      const mockGetDoc = jest.fn(() => ({ data: jest.fn(() => ({ userfamilies: ["user1", "user2", "user3"] })) }));
      const mockCollection = jest.fn(() => ({
        where: jest.fn(() => ({
          get: jest.fn(() => ({
            forEach: jest.fn(),
          })),
        })),
      }));
      jest.spyOn(fireBase.db, "doc").mockImplementation(() => ({
        get: mockGetDoc,
      }));
      jest.spyOn(fireBase.db, "collection").mockImplementation(mockCollection);

      const familyId = "testFamilyId";

      await act(async () => {
        render(<Component />, { wrapper });
        await fireBase.createAllPrivateChats(familyId);
      });

      expect(fireBase.db.doc).toHaveBeenCalledWith(fireBase.db, "family", familyId);
      expect(mockGetDoc).toHaveBeenCalled();
      expect(fireBase.db.collection).toHaveBeenCalledWith(fireBase.db, "user");
      expect(mockCollection().where).toHaveBeenCalledWith("username", "in", ["user1", "user2", "user3"]);
    });
  });

  // Continue with assertions and expectations for other functions
});*/



import { expect } from 'chai';
import { describe, it } from 'mocha';
import { useFireBase, FunctionProvider } from '../../contexts/FireBaseFunctions';
import { createContext } from 'react';
import FireBaseFunctions from "../../contexts/FireBaseFunctions";

// Mocking Firebase dependencies
const mockDb = {};
const mockCurrentUser = { uid: 'user123', email: 'test@example.com' };
const mockAuthContext = createContext({ currentUser: mockCurrentUser });
const mockFireBaseContext = createContext();

// Mocking necessary functions from Firebase dependencies
const mockGetDoc = async (ref) => {
  if (ref.path === 'family/familyId') {
    return { exists: () => true };
  } else if (ref.path === 'user/user123') {
    return { exists: () => true };
  }
  return { exists: () => false };
};

const mockSetDoc = async (ref, data) => {
  mockDb[ref.path] = data;
};

const mockUpdateDoc = async (ref, data) => {
  const currentData = mockDb[ref.path];
  mockDb[ref.path] = { ...currentData, ...data };
};

const mockGetDocs = async (query) => {
  const chatData = { id1: { familyId: 'family123', users: 'user123user456' } };
  const userData = { user123: { username: 'John' }, user456: { username: 'Jane' } };

  if (query.path === 'user') {
    return {
      forEach: (callback) => {
        Object.entries(userData).forEach(([userId, data]) => {
          callback({ id: userId, data: () => data });
        });
      },
    };
  } else if (query.path === 'chat') {
    return {
      forEach: (callback) => {
        Object.entries(chatData).forEach(([chatId, data]) => {
          callback({ id: chatId, data: () => data });
        });
      },
    };
  }
};

// Mocking the necessary dependencies for the FireBaseFunctions component
jest.mock('firebase/firestore', () => ({
  getDoc: mockGetDoc,
  updateDoc: mockUpdateDoc,
  doc: (db, path) => ({ path }),
  setDoc: mockSetDoc,
  arrayUnion: (value) => value,
  collection: (db, path) => ({ path }),
  query: (collectionRef, ...conditions) => ({ path: collectionRef.path, conditions }),
  where: (field, operator, value) => ({ field, operator, value }),
  or: (...queries) => queries,
  and: (...queries) => queries,
  limit: (num) => num,
  getDocs: mockGetDocs,
}));

jest.mock('../config/firebase', () => ({
  db: mockDb,
}));

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ currentUser: mockCurrentUser }),
}));

// Start writing the test cases
describe('FireBaseFunctions', () => {
  let fireBaseFunctions;

  beforeEach(() => {
    fireBaseFunctions = useFireBase();
    fireBaseFunctions.setMessage = (message) => {
      fireBaseFunctions.message = message;
    };
  });

  it('should check if a family exists', async () => {
    const exists = await fireBaseFunctions.checkFamilyExists('family123');
    expect(exists).to.be.true;
  });

  it('should check if a user exists', async () => {
    const exists = await fireBaseFunctions.checkUserExists();
    expect(exists).to.be.true;
  });

  it('should set user data', async () => {
    const userName = 'John Doe';
    await fireBaseFunctions.setUser(userName);
    expect(mockDb['user/user123']).to.deep.equal({
      userid: 'user123',
      username: userName,
      useremail: 'test@example.com',
      userfamilies: [],
    });
    expect(fireBaseFunctions.message).to.equal('Profile has been updated!');
  });

  // Write more test cases for the remaining functions

});

