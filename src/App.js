import { useState } from "react";
import StoryNavigation from "./StoryNavigation";
import content from "./content.json";
import Editor from "./Editor";
import "./App.css";
export const safeLink = (value) =>
  /^(https?:\/\/|mailto:|\/[^/])/.test(value || "") ? value : undefined;
const Arrow = () => <span aria-hidden="true">↗</span>;
function App() {
  const [data, setData] = useState(content),
    [editing, setEditing] = useState(false),
    [category, setCategory] = useState("All projects"),
    [query, setQuery] = useState("");
  const { profile, projects, certificates, experience, skills } = data;
  const visible = projects.filter(
    (p) =>
      (category === "All projects" || p.category === category) &&
      `${p.title} ${p.tags} ${p.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header wrap">
        <a className="brand" href="#home" aria-label="Caleb home">
          c<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#certificates">Certificates</a>
        </nav>
        <a className="nav-contact" href="#contact">
          Let’s talk <Arrow />
        </a>
      </header>
      <StoryNavigation revision={`${category}:${query}:${projects.length}:${certificates.length}:${experience.length}`} />
      <main id="main">
        <section id="home" className="hero wrap">
          <div>
            <p className="eyebrow">
              <span className="dot" />
              {profile.location} · Student mindset. Builder energy.
            </p>
            <h1>
              <span className="hero-line">Curious mind.</span>
              <span className="hero-line">Restless <em>builder.</em></span>
            </h1>
            <p className="intro">
              I’m {profile.name.split(" ")[0]}. {profile.role}.
              Still learning. Already making things happen.
            </p>
            <p className="muted hero-description">{profile.intro}</p>
            <div className="actions">
              <a className="button primary" href="#work">
                Start the story ↓
              </a>
              {safeLink(profile.resume) && (
                <a
                  className="text-link"
                  href={safeLink(profile.resume)}
                  target="_blank"
                  rel="noreferrer"
                >
                  View résumé <Arrow />
                </a>
              )}
            </div>
            <div className="hero-note">
              <span>CHAPTER 01 / THE SPARK</span>
              <span>Scroll to see where curiosity goes.</span>
            </div>
          </div>
          <div className="portrait-area">
            <div className="orbit" aria-hidden="true" />
            <div className="portrait-frame">
              <img src={safeLink(profile.portrait)} alt={profile.name} />
              <span className="photo-label">CALEB / A WORK IN PROGRESS</span>
            </div>
            <div className="floating-note">
              <span aria-hidden="true">✳</span>
              <div>
                Ideas → experiments.
                <br />
                <strong>Experiments → real things.</strong>
              </div>
            </div>
            <span className="portrait-index" aria-hidden="true">
              &lt; building_my_next_chapter /&gt;
            </span>
          </div>
        </section>
        <div className="skill-strip">
          <div className="wrap">
            <span className="eyebrow">THE EXPERIMENT KIT</span>
            <div>
              {skills.filter(Boolean).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
        <section id="work" className="section wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CHAPTER 02 / THE EXPERIMENTS</p>
              <h2>
                Less “what if.” More “built it”<span>.</span>
              </h2>
            </div>
            <p className="muted">
              An idea becomes a late-night experiment.
              <br />
              Then it becomes something you can use.
            </p>
          </div>
          <div className="work-controls">
            <div className="filters" aria-label="Filter projects">
              {[
                "All projects",
                ...new Set(projects.map((p) => p.category)),
              ].map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  className={category === c ? "selected" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Search projects"
                placeholder="Find a project…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <div className="project-grid">
            {visible.map((p, index) => (
              <article className="project" key={p.id}>
                <div className={`project-image tone-${index % 3}`}>
                  {safeLink(p.image) && (
                    <img
                      src={safeLink(p.image)}
                      alt={`${p.title} interface`}
                      loading="lazy"
                    />
                  )}
                  <span className="project-number">
                    0{projects.indexOf(p) + 1}
                  </span>
                </div>
                <div className="project-meta">
                  <span>{p.category}</span>
                  <span>{p.role}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="muted">{p.description}</p>
                <div className="tags">
                  {p.tags
                    .split(",")
                    .filter(Boolean)
                    .map((tag) => (
                      <span key={tag}>{tag.trim()}</span>
                    ))}
                </div>
                <div className="project-links">
                  {safeLink(p.url) && (
                    <a href={safeLink(p.url)} target="_blank" rel="noreferrer">
                      Live project <Arrow />
                    </a>
                  )}
                  {safeLink(p.github) && (
                    <a
                      href={safeLink(p.github)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source code <Arrow />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          {!visible.length && (
            <p className="empty" role="status">
              No projects match. Try another search or category.
            </p>
          )}
        </section>
        <div className="wrap"><a className="chapter-next" href="#experience"><span>02 → 03</span> Taking it beyond the screen <span>↓</span></a></div>
        <section id="experience" className="experience-section">
          <div className="wrap experience-layout">
            <div>
              <p className="eyebrow">CHAPTER 03 / OUTSIDE THE CLASSROOM</p>
              <h2>
                Real teams.
                <br />
                <em>Real learning.</em>
              </h2>
              <p className="muted">
                Taking the experiments into the real world.
                <br />
                Learning from people, problems, and the process.
              </p>
              <a
                className="text-link"
                href={safeLink(profile.linkedin)}
                target="_blank"
                rel="noreferrer"
              >
                More on LinkedIn <Arrow />
              </a>
            </div>
            <div className="timeline">
              {experience.map((job) => (
                <article key={job.id}>
                  <p className="eyebrow">{job.period}</p>
                  <h3>{job.title}</h3>
                  <p className="company">{job.company}</p>
                  <p className="muted">{job.description}</p>
                  {safeLink(job.url) && (
                    <a
                      className="text-link"
                      href={safeLink(job.url)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      About the company <Arrow />
                    </a>
                  )}
                </article>
              ))}
              {!experience.length && (
                <p className="muted">
                  The next chapter is taking shape. Follow my journey on
                  LinkedIn.
                </p>
              )}
            </div>
          </div>
        </section>
        <div className="wrap"><a className="chapter-next" href="#certificates"><span>03 → 04</span> There’s always another level <span>↓</span></a></div>
        <section id="certificates" className="section wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CHAPTER 04 / LEVELING UP</p>
              <h2>
                The learning never logs off<span>.</span>
              </h2>
            </div>
            <span className="count">
              {certificates.length.toString().padStart(2, "0")} CERTIFICATES
            </span>
          </div>
          <div className="certificate-grid">
            {certificates.map((cert) => (
              <article className="certificate" key={cert.id}>
                <span className="cert-icon" aria-hidden="true">
                  ✧
                </span>
                <div>
                  <p className="eyebrow">
                    {cert.issuer} · {cert.date}
                  </p>
                  <h3>{cert.title}</h3>
                  {cert.credential && (
                    <p className="credential">ID: {cert.credential}</p>
                  )}
                  {safeLink(cert.url) && (
                    <a
                      className="text-link"
                      href={safeLink(cert.url)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View credential <Arrow />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="wrap"><a className="chapter-next" href="#contact"><span>04 → 05</span> This is where you come in <span>↓</span></a></div>
        <section id="contact" className="contact wrap">
          <p className="eyebrow">CHAPTER 05 / THE NEXT CHAPTER</p>
          <h2>
            The next cool thing?
            <br />
            <em>Let’s build it.</em>
          </h2>
          <div>
            <p>
              Have an idea, an opportunity,
              <br />
              or just something interesting to share?
            </p>
            <a className="button primary" href={`mailto:${profile.email}`}>
              Say hello <Arrow />
            </a>
            <a className="email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </section>
      </main>
      <footer className="wrap">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div>
          <a href={safeLink(profile.github)} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
          <a href={safeLink(profile.linkedin)} target="_blank" rel="noreferrer">
            LinkedIn <Arrow />
          </a>
          <button onClick={() => setEditing(true)}>Edit content</button>
        </div>
        <a href="#home">Back to top ↑</a>
      </footer>
      {editing && (
        <Editor
          data={data}
          onPreview={setData}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
export default App;
