import { useEffect, useRef, useState } from "react";
const chapters = [
  { id: "home", label: "The spark" },
  { id: "work", label: "The experiments" },
  { id: "experience", label: "The real world" },
  { id: "certificates", label: "Leveling up" },
  { id: "contact", label: "What’s next" },
];

// Native animations keep motion small and progressively enhance visible content.
export default function StoryNavigation({ revision }) {
  const [active, setActive] = useState("home");
  const progress = useRef(null);
  const introduced = useRef(false);
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
        let current = chapters[0].id;
        for (const chapter of chapters) {
          const section = document.getElementById(chapter.id);
          if (section && section.getBoundingClientRect().top <= window.innerHeight * .45) current = chapter.id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    resize?.observe(document.body);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); resize?.disconnect(); };
  }, []);
  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (typeof IntersectionObserver === "undefined" || !Element.prototype.animate || preference?.matches) return;
    const animations = new Set();
    const run = (element, delay = 0) => {
      const motion = element.animate([{ opacity: 0, transform: "translateY(34px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 850, delay, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
      animations.add(motion);
      motion.onfinish = () => animations.delete(motion);
    };
    if (!introduced.current) {
      document.querySelectorAll(".hero-line, .hero .intro, .hero-description, .hero .actions").forEach((element, index) => run(element, index * 95));
      introduced.current = true;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      observer.unobserve(entry.target);
    }), { threshold: .12 });
    document.querySelectorAll(".section-heading, .project, .timeline article, .certificate, .experience-layout > div:first-child, .chapter-next, .contact h2, .contact > div").forEach(element => observer.observe(element));
    const stop = () => { if (preference.matches) { observer.disconnect(); animations.forEach(animation => animation.cancel()); } };
    preference?.addEventListener?.("change", stop);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); preference?.removeEventListener?.("change", stop); };
  }, [revision]);
  return <>
    <div className="reading-progress" aria-hidden="true"><div ref={progress}/></div>
    <nav className="story-nav" aria-label="Story chapters">
      <span className="story-caption">THE STORY SO FAR</span>
      {chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? "step" : undefined} aria-label={`Chapter ${index + 1}: ${chapter.label}`}><span className="chapter-dot"/><span className="chapter-label">{String(index + 1).padStart(2, "0")} / {chapter.label}</span></a>)}
    </nav>
    <div className="chapter-status" aria-hidden="true"><span>0{chapters.findIndex(chapter => chapter.id === active) + 1} / 05</span>{chapters.find(chapter => chapter.id === active)?.label}<span className="status-dot"/></div>
  </>;
}
