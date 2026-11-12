import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Icon from "./Icon";
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  function closeOnEscape(event) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggle.current?.focus();
    }
  }
  return (
    <header className="header wrap" onKeyDown={closeOnEscape}>
      <a
        className="brand"
        href="#home"
        aria-label="Caleb home"
        onClick={() => setOpen(false)}
      >
        CC<span>+</span>
      </a>
      <span className="header-caption">
        A PERSONAL FIELD GUIDE
        <br />
        TO THINGS I BUILD.
      </span>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <X aria-hidden="true" size={22} />
        ) : (
          <Menu aria-hidden="true" size={22} />
        )}
        <span>Menu</span>
      </button>
      <nav
        id="main-navigation"
        className={open ? "is-open" : ""}
        aria-label="Main navigation"
        onClick={(event) => {
          if (event.target.closest("a")) setOpen(false);
        }}
      >
        <a href="#work">Selected work</a>
        <a href="#experience">The journey</a>
        <a href="#certificates">Certificates</a>
        <a href="#contact">
          Get in touch <Icon name="ArrowUpRight" />
        </a>
      </nav>
    </header>
  );
}
