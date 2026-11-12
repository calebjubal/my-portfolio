import { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import StoryNavigation from "./StoryNavigation";
import content from "./content.json";
import Editor from "./Editor";
import Header from "./Header";
import TechnologyStickers from "./TechnologyStickers";
import ContactActions from "./ContactActions";
import Icon from "./Icon";
import SvgText, { StarMark, ArrowMark } from "./SvgText";
import "./App.css";
export const safeLink = (value) =>
  /^(https?:\/\/|mailto:|\/[^/])/.test(value || "") ? value : undefined;
const Arrow = ArrowMark;
const number = (n) => String(n).padStart(2, "0");
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
      <Header />
      <StoryNavigation
        revision={`${category}:${query}:${projects.length}:${certificates.length}:${experience.length}`}
      />
      <main id="main">
        <section id="home" className="hero wrap">
          <div className="hero-top">
            <p className="eyebrow">PORTFOLIO / VOL. 01</p>
            <p className="eyebrow">{profile.location}</p>
          </div>
          <h1 className="name-heading" aria-label={profile.name}>
            <span className="hero-line name-first">
              <SvgText text={profile.name.split(" ")[0].toUpperCase()} />
              <span className="name-star">
                <StarMark />
              </span>
            </span>
            <span className="hero-line surname">
              <SvgText
                text={profile.name.split(" ").slice(1).join(" ").toUpperCase()}
              />
            </span>
          </h1>
          <div className="hero-bottom">
            <span className="index-label">01 — THE INTRODUCTION</span>
            <p className="intro">
              {profile.role}.<br />
              <span>Turning “I wonder” into “it works.”</span>
            </p>
            <a
              className="round-link"
              href="#work"
              aria-label="Explore selected work"
            >
              <span>Explore selected work</span>
              <span aria-hidden="true">
                <Icon name="ArrowDown" />
              </span>
            </a>
          </div>
          <div className="intro-board">
            <div className="board-statement">
              <span className="eyebrow">THE MINDSET</span>
              <h2>
                Make things.
                <br />
                Break things.
                <br />
                <em>Figure it out.</em>
              </h2>
            </div>
            <div className="board-bio">
              <p className="hero-description">{profile.intro}</p>
              <div className="actions">
                {safeLink(profile.resume) && (
                  <a
                    className="text-link"
                    href={safeLink(profile.resume)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="FileText" /> Read my résumé
                  </a>
                )}
                <a
                  className="text-link"
                  href={safeLink(profile.github)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github
                    className="social-icon"
                    size={18}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />{" "}
                  Inside my GitHub <Arrow />
                </a>
              </div>
              <p className="bio-note">
                A student’s curiosity.
                <br />
                An engineer’s urge to make it work.
              </p>
            </div>
            <figure className="portrait">
              <img src={safeLink(profile.portrait)} alt={profile.name} />
              <figcaption>THE PERSON BEHIND THE PULL REQUESTS.</figcaption>
            </figure>
          </div>
        </section>
        <TechnologyStickers skills={skills} projects={projects} />
        <section id="work" className="section wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 — A FEW EXPERIMENTS THAT STUCK</p>
              <h2>
                Selected
                <br />
                <em>work.</em>
                <sup>({number(projects.length)})</sup>
              </h2>
            </div>
            <p className="muted">
              Small ideas. Real problems.
              <br />A little more learned with every build.
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
              <Icon name="Search" />
              <input
                aria-label="Search projects"
                placeholder="Search the index"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <div className="project-grid">
            {visible.map((p) => (
              <article className="project" key={p.id}>
                <div className="project-heading">
                  <span className="project-number">
                    /{number(projects.indexOf(p) + 1)}
                  </span>
                  <h3>{p.title}</h3>
                  <span className="project-category">{p.category}</span>
                </div>
                <div
                  className={`project-image tone-${projects.indexOf(p) % 3}`}
                >
                  {safeLink(p.image) && (
                    <img
                      src={safeLink(p.image)}
                      alt={p.imageAlt || `${p.title} project overview`}
                      loading="lazy"
                    />
                  )}
                  <span className="image-caption">
                    {p.imageCaption ||
                      `BUILD NOTES / ${number(projects.indexOf(p) + 1)}`}
                  </span>
                </div>
                <div className="project-copy">
                  <p className="muted">{p.description}</p>
                  <dl>
                    <div>
                      <dt>MY PART</dt>
                      <dd>{p.role}</dd>
                    </div>
                    <div>
                      <dt>BUILT WITH</dt>
                      <dd className="tags">
                        <TechnologyStickers
                          skills={p.tags.split(",")}
                          projects={projects}
                          compact
                        />
                      </dd>
                    </div>
                  </dl>
                  <div className="project-links">
                    {safeLink(p.url) && (
                      <a
                        className="text-link"
                        href={safeLink(p.url)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit project <Icon name="ExternalLink" />
                      </a>
                    )}
                    {safeLink(p.github) && (
                      <a
                        className="text-link"
                        href={safeLink(p.github)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon name="Code2" /> View source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!visible.length && (
            <p className="empty" role="status">
              No projects match. Try another search or category.
            </p>
          )}
          <a className="chapter-next" href="#experience">
            <span>THE NEXT PAGE</span>What happens beyond the code?
            <span>
              <Icon name="ArrowDown" />
            </span>
          </a>
        </section>
        <section id="experience" className="experience-section">
          <div className="wrap">
            <div className="experience-top">
              <p className="eyebrow">03 — LEARNING IN THE REAL WORLD</p>
              <span className="paper-label">FIELD NOTES / EXPERIENCE</span>
            </div>
            <div className="experience-layout">
              <div>
                <h2>
                  Outside the
                  <br />
                  <em>classroom.</em>
                </h2>
                <p className="muted">
                  New teams, different perspectives,
                  <br />
                  and problems a tutorial can’t prepare you for.
                </p>
                <a
                  className="text-link"
                  href={safeLink(profile.linkedin)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin
                    className="social-icon"
                    size={18}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />{" "}
                  The full story on LinkedIn <Arrow />
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
                        About the team <Arrow />
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
            <span className="paper-footer">
              STILL LEARNING. ALWAYS WILL BE.
            </span>
          </div>
        </section>
        <section id="certificates" className="section wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 — KEEP THE CURIOSITY</p>
              <h2>
                More tools.
                <br />
                <em>More possibilities.</em>
              </h2>
            </div>
            <p className="muted">
              A growing collection of things
              <br />I wanted to understand better.
            </p>
          </div>
          <div className="certificate-grid">
            {certificates.map((cert, index) => (
              <article className="certificate" key={cert.id}>
                <span className="cert-index">{number(index + 1)}</span>
                <div>
                  <h3>{cert.title}</h3>
                  <p className="credential">
                    {cert.issuer}
                    {cert.credential && <span> / ID: {cert.credential}</span>}
                  </p>
                </div>
                <span className="cert-date">{cert.date}</span>
                {safeLink(cert.url) && (
                  <a
                    className="credential-link"
                    aria-label={`View ${cert.title} credential`}
                    href={safeLink(cert.url)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Arrow />
                  </a>
                )}
              </article>
            ))}
          </div>
          <a className="chapter-next" href="#contact">
            <span>THE NEXT PAGE</span>Some things are better built together.
            <span>
              <Icon name="ArrowDown" />
            </span>
          </a>
        </section>
        <section id="contact" className="contact-section">
          <div className="wrap contact">
            <p className="eyebrow">05 — THIS PAGE IS STILL UNWRITTEN</p>
            <div className="contact-title">
              <h2>
                What’s
                <br />
                <em>next?</em>
              </h2>
              <span className="contact-spark" aria-hidden="true">
                <Icon name="ArrowUpRight" />
              </span>
            </div>
            <div className="contact-bottom">
              <p>
                An interesting problem. A new opportunity.
                <br />
                Or a conversation that leads somewhere.
              </p>
              <ContactActions email={profile.email} name={profile.name} />
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div>
          <a href={safeLink(profile.github)} target="_blank" rel="noreferrer">
            <Github
              className="social-icon"
              size={18}
              strokeWidth={1.7}
              aria-hidden="true"
            />{" "}
            GitHub <Arrow />
          </a>
          <a href={safeLink(profile.linkedin)} target="_blank" rel="noreferrer">
            <Linkedin
              className="social-icon"
              size={18}
              strokeWidth={1.7}
              aria-hidden="true"
            />{" "}
            LinkedIn <Arrow />
          </a>
          <button onClick={() => setEditing(true)}>
            <Icon name="PenLine" /> Edit content
          </button>
        </div>
        <a href="#home">
          Back to the beginning <Icon name="ArrowUp" />
        </a>
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
