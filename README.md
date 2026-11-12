# Caleb's portfolio

A dark, chapter-based React portfolio with orange and gold accents, bold typography, projects, experience, certificates, and a browser-based content studio.

## Run locally

```sh
npm ci
npm start
```

Production build: `npm run build`. Tests: `npm test -- --watchAll=false`.

## Story and motion

Five chapters guide the visitor from the introduction through projects, work experience, credentials, and contact. Desktop chapter links and a compact reading indicator track progress without taking over normal scrolling. Native Web Animations provide staggered intro and on-scroll reveals; CSS handles the rotating star, floating note, and hover feedback. Motion respects the system reduced-motion setting, including changes during a visit. Content stays readable when animation APIs are unavailable. Observers, listeners, and animations are cleaned up on unmount.

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
