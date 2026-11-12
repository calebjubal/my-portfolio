import { useEffect, useId, useRef, useState } from "react";
import { Code2 } from "lucide-react";
import { getTechnologyStats } from "./technologyCatalog";

export default function TechnologyStickers({
  skills,
  projects,
  compact = false,
}) {
  const allNames = compact
    ? skills
    : [...skills, ...projects.map((project) => project.tags)];
  const technologies = getTechnologyStats(allNames, projects);
  const [active, setActive] = useState(null);
  const root = useRef(null),
    unique = useId();
  useEffect(() => {
    if (!active) return;
    const escape = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    const outside = (event) => {
      if (!root.current?.contains(event.target)) setActive(null);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [active]);
  const content = (
    <div
      ref={root}
      className={`sticker-deck ${compact ? "sticker-deck-compact" : ""}`}
      style={{
        "--desktop-rows": Math.ceil(technologies.length / 8),
        "--mobile-rows": Math.ceil(technologies.length / 3),
      }}
      role="group"
      aria-label={
        compact ? "Project technologies" : "Technology sticker collection"
      }
    >
      {technologies.map((technology, index) => {
        const desktopColumn = index % 8,
          mobileColumn = index % 3;
        const isOpen = active?.key === technology.key;
        const tooltipId = `${unique}-technology-${index}`;
        const dropX = [
          7, 21, 31, 44, 57, 69, 81, 93, 12, 25, 37, 49, 62, 73, 86, 55,
        ];
        const dropY = [
          75, 37, 89, 45, 80, 44, 88, 45, 183, 155, 196, 154, 192, 156, 186,
          260,
        ];
        const tilt = [
          -15, 11, -7, 19, -12, 7, -18, 13, 9, -16, 17, -10, 12, -6, 18, -13,
        ][index % 16];
        return (
          <div
            key={technology.key}
            className={`sticker-slot ${isOpen ? "is-active" : ""}`}
            data-edge={
              desktopColumn === 0
                ? "left"
                : desktopColumn === 7
                  ? "right"
                  : "middle"
            }
            data-mobile-edge={
              mobileColumn === 0
                ? "left"
                : mobileColumn === 2
                  ? "right"
                  : "middle"
            }
            style={{
              "--x": `${dropX[index % 16]}%`,
              "--y": `${dropY[index % 16] + Math.floor(index / 16) * 280}px`,
              "--mobile-x": `${[16, 50, 84][mobileColumn]}%`,
              "--mobile-y": `${Math.floor(index / 3) * 110 + 48 + [0, 11, -8][mobileColumn]}px`,
              "--tilt": `${tilt}deg`,
            }}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse")
                setActive({ key: technology.key, reason: "hover" });
            }}
            onPointerLeave={() =>
              setActive((previous) =>
                previous?.key === technology.key && previous.reason === "hover"
                  ? null
                  : previous,
              )
            }
          >
            <button
              className="technology-sticker"
              aria-label={technology.name}
              aria-expanded={isOpen}
              aria-describedby={isOpen ? tooltipId : undefined}
              onFocus={() =>
                setActive({ key: technology.key, reason: "focus" })
              }
              onBlur={() =>
                setActive((previous) =>
                  previous?.key === technology.key &&
                  previous.reason === "focus"
                    ? null
                    : previous,
                )
              }
              onClick={() =>
                setActive((previous) =>
                  previous?.key === technology.key &&
                  previous.reason === "click"
                    ? null
                    : { key: technology.key, reason: "click" },
                )
              }
            >
              {technology.logo ? (
                <img
                  src={`/logos/${technology.logo}.svg`}
                  alt=""
                  width="72"
                  height="72"
                  loading="lazy"
                />
              ) : (
                <Code2 size={48} aria-hidden="true" />
              )}
            </button>
            {isOpen && (
              <div className="sticker-tooltip" id={tooltipId} role="tooltip">
                <span className="tooltip-kicker">IN THE TOOLKIT</span>
                <strong>{technology.name}</strong>
                <div>
                  <b>{technology.count.toString().padStart(2, "0")}</b>
                  <span>
                    featured {technology.count === 1 ? "project" : "projects"}
                  </span>
                </div>
                <p>
                  {technology.count
                    ? "Counted from the project stacks below."
                    : "In my toolkit; not used in the current selection."}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
  if (compact) return content;
  return (
    <section className="toolkit-section" aria-labelledby="toolkit-title">
      <div className="wrap">
        <div className="toolkit-heading">
          <div>
            <p className="eyebrow">TOOLS OF THE TRADE / NO NEAT LITTLE BOXES</p>
            <h2 id="toolkit-title">
              The creative <em>mess.</em>
            </h2>
          </div>
          <p className="muted">
            A few things I reach for.
            <br />
            Hover, focus, or tap a sticker to explore.
          </p>
        </div>
        {content}
        <p className="toolkit-caption">
          <span>LANGUAGES, FRAMEWORKS & LIBRARIES</span>
          <span>
            Counts reflect featured projects, not all GitHub repositories.
          </span>
        </p>
      </div>
    </section>
  );
}
