/*import React from "react";
import { render, fireEvent, waitFor, getByRole, getByTestId, getByText, queryByTestId } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import '@testing-library/jest-dom'
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Docs from "../../components/FamilyDocs/Docs";
import "@testing-library/jest-dom/extend-expect";


jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  onSnapshot: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

jest.mock("../../config/firebase", () => ({
  db: {
    collection: jest.fn(),
  },
}));

describe("Docs", () => {
  const navigateMock = jest.fn();
  useNavigate.mockImplementation(() => navigateMock);

  const familyid = "familyId"; // Corrected prop casing
  const mockDocsData = [
    { id: "doc1", title: "Document 1", docsDesc: "Description 1" },
    { id: "doc2", title: "Document 2", docsDesc: "Description 2" },
  ];

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("renders add document button", () => {
    const { getByText } = render(<Docs familyid={familyid} />);
    const addDocument=getByText("Add a document");
    expect(addDocument).toBeInTheDocument();
  });

  it("opens modal when add document button is clicked", async () => {
    const { getByText, queryByTestId } = render(<Docs familyid={familyid} />);
    const addDocumentButton = getByText("Add a document");
  
    fireEvent.click(addDocumentButton);
  
    await waitFor(() => {
      const modalElement = queryByTestId("modal"); // Update this to the appropriate test id or class
      expect(modalElement).toBeInTheDocument();
    });
  });
  
  

  it("closes modal when cancel button is clicked", () => {
    const { getByText, queryByText } = render(<Docs familyid={familyid} />);
    fireEvent.click(getByText("Add a document"));
    fireEvent.click(getByText("Cancel"));
    expect(queryByText("Add Document Modal")).not.toBeInTheDocument();
  });

  it("adds document when save button is clicked", async () => {
    const { getByText, getByLabelText } = render(<Docs familyid={familyid} />);
    fireEvent.click(getByText("Add a document"));
    fireEvent.change(getByLabelText("Document Title"), {
      target: { value: "New Document" },
    });
    fireEvent.click(getByText("Save"));
    await waitFor(() => expect(addDoc).toHaveBeenCalled());
    expect(addDoc).toHaveBeenCalledWith(collection(db, "docsData"), {
      title: "New Document",
      docsDesc: "",
      familyid: familyid, // Corrected prop casing
    });
  });

  it("navigates to edit document page when a document is clicked", () => {
    const { getByText } = render(<Docs familyid={familyid} />);
    fireEvent.click(getByText("Document 1"));
    expect(navigateMock).toHaveBeenCalledWith("/editDocs/doc1");
  });

  it("fetches and displays documents data", async () => {
    const queryMock = jest.fn();
    const onSnapshotMock = jest.fn();
    query.mockReturnValue(queryMock);
    onSnapshot.mockImplementation((query, callback) => {
      callback({ docs: mockDocsData });
      return onSnapshotMock;
    });

    const { getByText } = render(<Docs familyid={familyid} />);
    await waitFor(() => expect(getDocs).toHaveBeenCalled());
    expect(getDocs).toHaveBeenCalledWith(queryMock);

    expect(getByText("Document 1")).toBeInTheDocument();
    expect(getByText("Document 2")).toBeInTheDocument();
  });
});*/


