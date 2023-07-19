import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams, useNavigate } from "react-router-dom";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ToastContainer } from "react-toastify";
import EditDocs from "../../components/FamilyDocs/EditDocs";
import { Quill } from "react-quill";
import "@testing-library/jest-dom/extend-expect";
import { getByTestId } from "@testing-library/react";


jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
}));

jest.mock("../../config/firebase", () => ({
  db: {
    collection: jest.fn(),
  },
}));

describe("EditDocs", () => {
  const mockUseParams = jest.fn();
  const mockUseNavigate = jest.fn();
  //const mockDoc = jest.fn();
  const mockDoc = { id: "doc1"}
  const mockUpdateDoc = jest.fn();
  const mockOnSnapshot = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useParams.mockImplementation(() => mockUseParams());
    useNavigate.mockImplementation(() => mockUseNavigate);
    collection.mockReturnValue({id: "collection1"}); 
    doc.mockReturnValue(mockDoc);
    updateDoc.mockReturnValue(mockUpdateDoc);
    onSnapshot.mockImplementation((document, callback) => {
        callback({
          data: () => ({
            title: "Document Title",
            docsDesc: "Document Description",
          }),
        });
        return mockOnSnapshot;
      });
      
  });

  it("renders EditDocs component", () => {
    mockUseParams.mockReturnValue({ id: "doc1" });

    const { getByText, getByTestId } = render(<EditDocs />);
    const goBackButton = getByText("Go Back");
    const quillEditor = getByTestId("quill-editor");
    expect(goBackButton).toBeInTheDocument();
    expect(quillEditor).toBeInTheDocument();
  });

  it("navigates back when Go Back button is clicked", () => {
    mockUseParams.mockReturnValue({ id: "doc1" });

    const { getByText } = render(<EditDocs />);
    const goBackButton = getByText("Go Back");
    fireEvent.click(goBackButton);
    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
  });
  
  
});

  
   

