import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams, useNavigate } from "react-router-dom";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ToastContainer } from "react-toastify";
import EditDocs from "../../components/FamilyDocs/EditDocs";
import "@testing-library/jest-dom/extend-expect";

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
    collection.mockReturnValue(mockDoc); // Update this line
    doc.mockReturnValue(mockDoc);
    updateDoc.mockReturnValue(mockUpdateDoc);
    /*onSnapshot.mockImplementation((document, callback) => {
        callback({
          data: () => ({
            title: "Document Title",
            docsDesc: "Document Description",
          }),
        });
        return mockOnSnapshot;
      });*/
      
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
  
  /*it("updates document when Quill editor value changes", async () => {
    mockUseParams.mockReturnValue({ id: "doc1" });
  
    render(<EditDocs />);
    const quillEditor = screen.getByTestId("quill-editor");
  
    const editorElement = quillEditor.querySelector(".ql-editor");
    editorElement.innerHTML = "New Document Content";
  
    // Trigger the change event manually
    const inputEvent = new InputEvent("input", {
      bubbles: true,
      cancelable: true,
    });
    editorElement.dispatchEvent(inputEvent);
  
    // Wait for the document update to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    // Ensure that the updateDoc function is called
    expect(mockUpdateDoc).toHaveBeenCalledWith(mockDoc, {
      docsDesc: "New Document Content",
    });
  });*/

  it("updates document when Quill editor value changes", async () => {
    mockUseParams.mockReturnValue({ id: "doc1" });
  
    render(<EditDocs />);
    
    //Get the Quill editor input element
    const quillEditor = screen.getByTestId("quill-editor")

    // Simulate the editor interaction by updating the content
    quillEditor.props.onTextChange("New Document Content");

  
    // Wait for the update to be processed
    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(mockDoc, {
        docsDesc: "New Document Content",
      });
    });
  });
  
  /*it("updates document when Quill editor value changes", () => {
    mockUseParams.mockReturnValue({ id: "doc1" });
  
    render(<EditDocs />);
    const quillEditor = screen.getByTestId("quill-editor");
    quillEditor.props().onChange("New Document Content");
  
    expect(mockUpdateDoc).toHaveBeenCalledWith(mockDoc, {
      docsDesc: "New Document Content",
    });
  });*/
  
});


