# Caleb's portfolio

An editorial field-notes portfolio with an ink-and-ivory foundation, pale blue technical accents, muted gold navigation, and a maroon contact section. See [DESIGN.md](DESIGN.md) for palette comparisons, placement decisions, measured text contrast, and sources.

## Run locally

```sh
npm ci
npm start
```

Production build: `npm run build`. Tests: `npm test -- --watchAll=false`.

## Story and motion

Five chapters guide visitors from the masthead through projects, work experience, credentials, and contact. A desktop chapter navigator and reading progress bar follow normal scrolling. Native Web Animations provide staged intro and on-scroll reveals; CSS adds restrained screenshot and control hover feedback. Motion respects system reduced-motion preferences, including changes during a visit. Content stays readable when animation APIs are unavailable. Observers, listeners, and animations are cleaned up on unmount.

## Update your portfolio

1. Open **Edit content** in the website footer.
2. Choose Profile, Projects, Experience, or Certificates. Edit entries or add/remove them.
3. **Preview on page** shows the changes for this visit. Reopen the editor to continue.
4. **Save browser draft** keeps work in this browser; **Load draft** restores it. Drafts are not public and do not sync between devices.
5. **Export content.json** downloads the complete content file.
6. In GitHub, replace `src/content.json` with the exported file and commit. Your connected Vercel deployment will rebuild when changes reach its production branch.

You can also edit `src/content.json` directly in GitHub. No component changes are needed for new entries. Add images and PDF certificates to `public/`, then use paths such as `/new-project.png` or `/certificate.pdf`. For external links, use full `https://` URLs. Leave unknown links empty: the site hides unavailable actions. Add new entries at the top of an array to feature them first.

The content editor is a local drafting tool, not an authenticated CMS: visitors can experiment with their own browser view but cannot change your repository or published portfolio. Closing the editor without previewing discards unsaved form changes; save a browser draft or export first.

## Content provenance and remaining details

- Original three projects, project screenshots, portrait, résumé, and email preserved from the existing repository. Project demo/source URLs were absent and remain blank.
- Six named certificates and credential IDs transcribed from the public LinkedIn profile at https://in.linkedin.com/in/caleb-chandrasekar. Direct credential URLs were not exposed; add those in the editor when available.
- Eascode's public company announcement at https://in.linkedin.com/company/eascodesolutions/ confirms a summer internship in 2026 for an LLM migration project. The public profile hides other job titles and dates; no additional roles or dates have been invented.
- Existing résumé PDF has been retained; review its contents before sharing.

## Deploy

The existing Create React App build and Vercel compatibility are preserved. Import this repository into Vercel (or use the existing connection), with build command `npm run build` and output directory `build`. Review a preview deployment before merging into the production branch.

## Social icons

GitHub and LinkedIn links use named Lucide React imports with visible text labels; icons are decorative for screen readers. `lucide-react` is pinned to 0.468.0 because current 1.x releases removed brand logos. Review social icon imports before upgrading that dependency.

Lucide also provides interface icons for navigation, search, résumé and project actions, contact, and editor controls. Icons are decorative alongside visible labels; the close control retains an accessible label.

## Contact email

“Let’s talk” uses a mailto compose link with the current profile email and a prefilled subject. The browser/OS opens its configured email handler, including Gmail where registered, otherwise the default mail app. “Open in Gmail” is a direct web compose alternative, opening in a new tab. Both open drafts; visitors review and send themselves. The website does not inspect installed apps, Google sign-in state, or send messages.

## Mobile layout

Phones use an expandable, labeled navigation menu; Escape closes it and returns focus to the toggle. Text and editor inputs stay readable, contact actions stack, and compact grids become a single-column reading flow. The content studio uses the dynamic viewport height, locks background scrolling while open, and keeps its close control visible. Long editable titles, emails, and credentials wrap without hiding horizontal overflow.
