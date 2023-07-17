import React from "react";
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
/*jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(() => ({ currentUser: { uid: "testUserId", email: "test@example.com" } })),
}));*/

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
});

