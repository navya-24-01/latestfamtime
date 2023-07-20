import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModalComponent from "../../components/FamilyDocs/Modal";
import "@testing-library/jest-dom/extend-expect";

describe("ModalComponent", () => {
  const mockSetOpen = jest.fn();
  const mockSetTitle = jest.fn();
  const mockAddData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal component", async () => {
    const props = {
      open: true,
      setOpen: mockSetOpen,
      title: "",
      setTitle: mockSetTitle,
      addData: mockAddData,
    };
    const { getByLabelText, getByText } = render(<ModalComponent {...props} />);
    const titleInput = getByText("Enter the title of the document:");
    const addButton = getByText("Add a Document");
    expect(titleInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("calls setOpen with false when modal is closed", async () => {
    const props = {
      open: true,
      setOpen: mockSetOpen,
      title: "",
      setTitle: mockSetTitle,
      addData: mockAddData,
    };
    const { getByText } = render(<ModalComponent {...props} />);
    const titleInput = getByText("Enter the title of the document:");
    fireEvent.keyDown(titleInput, { key: "Escape", code: "Escape" });
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("calls setTitle with the input value when title input is changed", async () => {
    const props = {
      open: true,
      setOpen: mockSetOpen,
      title: "",
      setTitle: mockSetTitle,
      addData: mockAddData,
    };
    const { getByPlaceholderText } = render(<ModalComponent {...props} />);
    const titleInput = getByPlaceholderText("Add a Title...");
    fireEvent.change(titleInput, { target: { value: "New Document" } });
    expect(mockSetTitle).toHaveBeenCalledWith("New Document");
  });

  it("calls addData when add button is clicked", async () => {
    const props = {
      open: true,
      setOpen: mockSetOpen,
      title: "New Document",
      setTitle: mockSetTitle,
      addData: mockAddData,
    };
    const { getByText } = render(<ModalComponent {...props} />);
    const addButton = getByText("Add a Document");
    fireEvent.click(addButton);
    expect(mockAddData).toHaveBeenCalled();
  });
});
