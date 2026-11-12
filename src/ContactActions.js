import Icon from "./Icon";

export function emailLinks(email, name) {
  const subject = `Portfolio enquiry for ${name}`;
  return {
    mailto: `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}`,
    gmail: `https://mail.google.com/mail/?${new URLSearchParams({ view: "cm", fs: "1", to: email, su: subject }).toString()}`,
  };
}
export default function ContactActions({ email, name }) {
  const links = emailLinks(email, name);
  return (
    <div className="contact-email-actions">
      <a className="button primary" href={links.mailto}>
        Let’s talk <Icon name="Mail" />
      </a>
      <a
        className="gmail-link text-link"
        href={links.gmail}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Gmail <Icon name="ExternalLink" />
      </a>
      <a className="email" href={links.mailto}>
        {email}
      </a>
    </div>
  );
}
