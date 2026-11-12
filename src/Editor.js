import { useEffect, useRef, useState } from "react";
const fields = {
  projects: [
    "title",
    "category",
    "description",
    "role",
    "tags",
    "image",
    "url",
    "github",
  ],
  experience: ["title", "company", "period", "description", "url"],
  certificates: ["title", "issuer", "date", "credential", "url"],
};
const labels = {
  url: "Website or credential URL",
  github: "Source code URL",
  image: "Image path or URL",
  tags: "Technologies (comma separated)",
  period: "Dates",
  credential: "Credential ID",
};
export default function Editor({ data, onPreview, onClose }) {
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(data))),
    [tab, setTab] = useState("projects"),
    [message, setMessage] = useState("");
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current,
      previous = document.activeElement;
    element.showModal();
    return () => {
      previous?.focus();
    };
  }, []);
  function update(index, key, value) {
    setDraft((old) => ({
      ...old,
      [tab]: old[tab].map((entry, i) =>
        i === index ? { ...entry, [key]: value } : entry,
      ),
    }));
  }
  function exportContent() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(draft, null, 2) + "\n"], {
        type: "application/json",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "content.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage(
      "Downloaded content.json. Replace src/content.json in GitHub and commit to publish.",
    );
  }
  function saveDraft() {
    try {
      localStorage.setItem("caleb-portfolio-draft", JSON.stringify(draft));
      setMessage("Draft saved in this browser. Export the file to publish it.");
    } catch {
      setMessage(
        "Browser storage is unavailable. Export your content to save it.",
      );
    }
  }
  function loadDraft() {
    try {
      const saved = JSON.parse(localStorage.getItem("caleb-portfolio-draft"));
      if (
        !saved ||
        !saved.profile ||
        !Array.isArray(saved.projects) ||
        !Array.isArray(saved.experience) ||
        !Array.isArray(saved.certificates) ||
        !Array.isArray(saved.skills)
      )
        throw new Error();
      setDraft(saved);
      setMessage("Browser draft loaded.");
    } catch {
      setMessage("No valid saved draft found.");
    }
  }
  return (
    <dialog ref={dialog} className="editor" onCancel={onClose}>
      <div className="editor-top">
        <div>
          <p className="eyebrow">YOUR PORTFOLIO, YOUR WORDS</p>
          <h2>
            Content studio<span>.</span>
          </h2>
        </div>
        <button aria-label="Close content editor" onClick={onClose}>
          ✕
        </button>
      </div>
      <p className="editor-help">
        Edit, preview, then export. Changes stay in your browser until you
        replace <code>src/content.json</code> in GitHub. This editor does not
        publish or require a login.
      </p>
      <div className="filters editor-tabs">
        {["profile", ...Object.keys(fields)].map((t) => (
          <button
            key={t}
            className={tab === t ? "selected" : ""}
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "profile" ? (
        <div className="editor-fields">
          {Object.entries(draft.profile).map(([key, value]) => (
            <label key={key}>
              {key}
              <input
                value={value}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    profile: { ...draft.profile, [key]: e.target.value },
                  })
                }
              />
            </label>
          ))}
          <label>
            Skills (comma separated)
            <input
              value={draft.skills.join(",")}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
          </label>
        </div>
      ) : (
        <>
          <button
            className="button add-entry"
            onClick={() =>
              setDraft({
                ...draft,
                [tab]: [
                  ...draft[tab],
                  {
                    id: `${tab}-${Date.now()}`,
                    ...Object.fromEntries(fields[tab].map((key) => [key, ""])),
                  },
                ],
              })
            }
          >
            + Add{" "}
            {tab === "experience"
              ? "job"
              : tab === "projects"
                ? "project"
                : "certificate"}
          </button>
          {draft[tab].map((entry, index) => (
            <fieldset key={entry.id}>
              <legend>{entry.title || `New entry ${index + 1}`}</legend>
              <div className="editor-fields">
                {fields[tab].map((key) => (
                  <label key={key}>
                    {labels[key] || key}
                    {key === "description" ? (
                      <textarea
                        value={entry[key]}
                        onChange={(e) => update(index, key, e.target.value)}
                      />
                    ) : (
                      <input
                        value={entry[key]}
                        onChange={(e) => update(index, key, e.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>
              <button
                className="remove"
                onClick={() =>
                  setDraft({
                    ...draft,
                    [tab]: draft[tab].filter((_, i) => i !== index),
                  })
                }
              >
                Remove entry
              </button>
            </fieldset>
          ))}
        </>
      )}
      <p role="status">{message}</p>
      <div className="editor-actions">
        <button
          className="button primary"
          onClick={() => {
            onPreview(draft);
            onClose();
          }}
        >
          Preview on page
        </button>
        <button className="button" onClick={saveDraft}>
          Save browser draft
        </button>
        <button className="button" onClick={loadDraft}>
          Load draft
        </button>
        <button className="button" onClick={exportContent}>
          Export content.json ↓
        </button>
      </div>
    </dialog>
  );
}
