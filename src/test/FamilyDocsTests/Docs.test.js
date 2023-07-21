import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import Docs from "../../components/FamilyDocs/Docs";

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn(),
  where: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("Docs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Docs component", () => {
    render(<Docs familyid="family1" />);

  });

});

