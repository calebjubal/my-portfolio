import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
test("opens navigation, closes on link selection, and supports Escape", () => {
  render(<Header />);
  const toggle = screen.getByRole("button", { name: "Open navigation" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(screen.getByRole("link", { name: "Certificates" }));
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(toggle);
  fireEvent.keyDown(screen.getByRole("link", { name: "The journey" }), {
    key: "Escape",
  });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
});
