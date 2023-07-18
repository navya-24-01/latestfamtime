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
  const mockDoc = { id: "OMIA0dhMa6wu7B6V1KoB"}
  const mockUpdateDoc = jest.fn();
  const mockOnSnapshot = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useParams.mockImplementation(() => mockUseParams());
    useNavigate.mockImplementation(() => mockUseNavigate);
    collection.mockReturnValue({id: "docsData"}); // Update this line
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
    mockUseParams.mockReturnValue({ id: "OMIA0dhMa6wu7B6V1KoB" });

    const { getByText, getByTestId } = render(<EditDocs />);
    const goBackButton = getByText("Go Back");
    const quillEditor = getByTestId("quill-editor");
    expect(goBackButton).toBeInTheDocument();
    expect(quillEditor).toBeInTheDocument();
  });

  it("navigates back when Go Back button is clicked", () => {
    mockUseParams.mockReturnValue({ id: "OMIA0dhMa6wu7B6V1KoB" });

    const { getByText } = render(<EditDocs />);
    const goBackButton = getByText("Go Back");
    fireEvent.click(goBackButton);
    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
  });
  

  //uncomment this test case and resolve later
  it("updates document when Quill editor value changes", async () => {
  mockUseParams.mockReturnValue({ id: "OMIA0dhMa6wu7B6V1KoB" });

  render(<EditDocs />);
  
  // Get the Quill editor input element
  const quillEditor = screen.getByTestId("quill-editor");

  // Get the editor element within the Quill editor component
  const editorElement = quillEditor.querySelector(".ql-editor");
    
  // Simulate updating the content in the Quill editor
  fireEvent.change(editorElement, {
    target: { value: "New Document Content" },
  });
  
  // Wait for the update to be processed
  await waitFor(() => {
    expect(updateDoc).toHaveBeenCalledWith(mockDoc, {
      docsDesc: "New Document Content",
    });
  });
});

  
});










//Simulate the editor interaction by updating the content
    //userEvent.clear(quillEditor);
    //userEvent.type(quillEditor, "New Document Content");

    //fireEvent.change(quillEditor, {
     // target: { value: "New Document Content" },
    //});
    //quillEditor.props.onTextChange("New Document Content");



/*
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
  
  });*/

  // Access the underlying textarea element of the Quill editor
    //const textarea = quillEditor.querySelector("textarea");

    // Simulate the editor interaction by updating the content
   // userEvent.clear(textarea);
   //userEvent.type(textarea, "New Document Content");


