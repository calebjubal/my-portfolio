import { render, screen } from "@testing-library/react";
import ContactActions, { emailLinks } from "./ContactActions";
test("offers the registered mail handler and an explicit Gmail compose alternative", () => {
  render(<ContactActions email="hello+work@example.com" name="Caleb & team" />);
  const main = screen.getByRole("link", { name: "Let’s talk" });
  expect(main.getAttribute("href")).toBe(
    "mailto:hello%2Bwork%40example.com?subject=Portfolio%20enquiry%20for%20Caleb%20%26%20team",
  );
  const gmail = screen.getByRole("link", { name: "Open in Gmail" });
  const url = new URL(gmail.href);
  expect(url.origin).toBe("https://mail.google.com");
  expect(url.searchParams.get("to")).toBe("hello+work@example.com");
  expect(url.searchParams.get("su")).toBe("Portfolio enquiry for Caleb & team");
  expect(gmail).toHaveAttribute("target", "_blank");
});
test("encodes edited profile fields without adding extra recipients or headers", () => {
  const links = emailLinks("a@example.com?bcc=other@example.com", "A & B");
  expect(links.mailto).toContain(
    "a%40example.com%3Fbcc%3Dother%40example.com?subject=",
  );
  expect(new URL(links.gmail).searchParams.get("to")).toBe(
    "a@example.com?bcc=other@example.com",
  );
});
