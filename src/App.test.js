import { render, screen, fireEvent } from "@testing-library/react";
import App, { safeLink } from "./App";
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
});
afterEach(() => localStorage.clear());
test("filters projects by category and search and handles empty results", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "AI & data" }));
  expect(
    screen.getByRole("heading", { name: "Voice RAG College Counsellor" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", {
      name: "Satoshi Trace — offline investigations",
    }),
  ).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole("textbox", { name: "Search projects" }), {
    target: { value: "no-match" },
  });
  expect(screen.getByRole("status")).toHaveTextContent("No projects match");
});
test("edits and previews a job, persists a draft, and restores it", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Edit content" }));
  fireEvent.click(screen.getByRole("button", { name: "experience" }));
  fireEvent.click(screen.getByRole("button", { name: "Add job" }));
  const title = screen.getAllByLabelText("title")[1];
  fireEvent.change(title, { target: { value: "New role" } });
  fireEvent.click(screen.getByRole("button", { name: "Save browser draft" }));
  expect(
    JSON.parse(localStorage.getItem("caleb-portfolio-draft")).experience[1]
      .title,
  ).toBe("New role");
  fireEvent.click(screen.getByRole("button", { name: "Preview on page" }));
  expect(screen.getByRole("heading", { name: "New role" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Edit content" }));
  fireEvent.click(screen.getByRole("button", { name: "Load draft" }));
  fireEvent.click(screen.getByRole("button", { name: "experience" }));
  expect(screen.getAllByLabelText("title")[1]).toHaveValue("New role");
});
test("allows only expected URL protocols", () => {
  expect(safeLink("javascript:alert(1)")).toBeUndefined();
  expect(safeLink("//example.com")).toBeUndefined();
  expect(safeLink("https://example.com")).toBe("https://example.com");
  expect(safeLink("/certificate.pdf")).toBe("/certificate.pdf");
});
