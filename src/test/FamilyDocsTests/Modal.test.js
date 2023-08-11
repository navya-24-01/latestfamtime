import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModalComponent from "../../components/FamilyDocs/Modal";
import "@testing-library/jest-dom/extend-expect";

describe("ModalComponent", () => {
  const mockSetOpen = jest.fn();
  const mockSetTitle = jest.fn();
  const mockAddDocument = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.mock("firebase/firestore", () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    addDoc: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(),
    onSnapshot: jest.fn()
  }));

  it("renders modal component", () => {
    const props = {
      open: true,
      setOpen: mockSetOpen,
      title: "",
      setTitle: mockSetTitle,
      addDocument: mockAddDocument,
    };
    const { getByLabelText, getByText } = render(<ModalComponent {...props} />);
    const titleInput = getByText("Enter the title of the document:");
    const addButton = getByText("Add a Document");
    expect(titleInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("calls setOpen with false when modal is closed", () => {
    const props = {
      open: true,
      setOpen: mockSetOpen,
      title: "",
      setTitle: mockSetTitle,
      addDocument: mockAddDocument,
    };
    const { getByText } = render(<ModalComponent {...props} />);
    const titleInput = getByText("Enter the title of the document:");
    fireEvent.keyDown(titleInput, { key: "Escape", code: "Escape" });
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("calls setTitle with the input value when title input is changed", () => {
    const props = {
      open: true,
      setOpen: mockSetOpen,
      title: "",
      setTitle: mockSetTitle,
      addDocument: mockAddDocument,
    };
    const { getByPlaceholderText } = render(<ModalComponent {...props} />);
    const titleInput = getByPlaceholderText("Add a Title...");
    fireEvent.change(titleInput, { target: { value: "New Document" } });
    expect(mockSetTitle).toHaveBeenCalledWith("New Document");
  });

  it("calls addDocument when add button is clicked", () => {
    const props = {
      open: true,
      setOpen: mockSetOpen,
      title: "New Document",
      setTitle: mockSetTitle,
      addDocument: mockAddDocument,
    };
    const { getByText } = render(<ModalComponent {...props} />);
    const addButton = getByText("Add a Document");
    fireEvent.click(addButton);
    expect(mockAddDocument).toHaveBeenCalled();
  });
});