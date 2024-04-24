import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "../TodoApp";

describe("TodoApp", () => {
  it("renders the component with necessary elements", () => {
    render(<TodoApp />);
    expect(screen.getByPlaceholderText("Add new")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter")).toBeInTheDocument();
  });

  it("allows users to add todos", async () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("Add new");
    userEvent.type(input, "Learn React Testing{enter}");
    await waitFor(() => {
      expect(screen.getByText("Learn React Testing")).toBeInTheDocument();
    });
  });
});
