import { render, screen, fireEvent } from "@testing-library/react";
import TechnologyStickers from "./TechnologyStickers";
import { getTechnologyStats } from "./technologyCatalog";
const projects = [
  { tags: "Python, Python, HTML & CSS, Next.js" },
  { tags: "python, React, CSS3" },
];
test("counts each featured project once with canonical technology names", () => {
  const stats = getTechnologyStats(
    ["Python", "HTML", "CSS", "NextJS", "C++"],
    projects,
  );
  expect(stats.map(({ name, count }) => [name, count])).toEqual([
    ["Python", 2],
    ["HTML", 1],
    ["CSS", 2],
    ["Next.js", 1],
    ["C++", 0],
  ]);
});
test("shows readable usage on focus or tap, closes on Escape and outside interaction", () => {
  render(
    <TechnologyStickers skills={["Python"]} projects={projects} compact />,
  );
  const sticker = screen.getByRole("button", { name: "Python", exact: true });
  fireEvent.focus(sticker);
  expect(screen.getByRole("tooltip")).toHaveTextContent(
    "Python02featured projects",
  );
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  fireEvent.click(sticker);
  expect(sticker).toHaveAttribute("aria-expanded", "true");
  fireEvent.pointerDown(document.body);
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});
test("updates counts when projects are edited and handles unknown skills without broken images", () => {
  const { rerender } = render(
    <TechnologyStickers
      skills={["Python", "New tool"]}
      projects={projects}
      compact
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Python", exact: true }));
  rerender(
    <TechnologyStickers
      skills={["Python", "New tool"]}
      projects={[]}
      compact
    />,
  );
  expect(screen.getByRole("tooltip")).toHaveTextContent("00featured projects");
  expect(
    screen.getByRole("button", { name: "New tool" }).querySelector("img"),
  ).toBeNull();
});
