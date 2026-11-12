# Design study: Engineering field notes

## Directions considered

| Direction                                     | Strength                                                                       | Decision                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Cobalt and white                              | Crisp technical contrast                                                       | Too close to a generic product landing page for this portfolio.                             |
| Forest and cream                              | Calm, readable, academic                                                       | Too close to the first design and less distinct from the existing layout.                   |
| Maroon and gold throughout                    | Strong personal character                                                      | Too much emphasis everywhere; keep maroon for the final invitation and gold for small cues. |
| Ink, ivory, pale blue, maroon, and muted gold | Separates reading, technical work, and the invitation by surface and hierarchy | Selected.                                                                                   |

These are design judgments, not claims that colors universally produce particular emotions. Prior preferences against purple and orange are respected.

## Color roles

| Color                     | Role                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------- |
| Ink `#111b24`             | Main canvas: a quiet dark surface for screenshots and typography.                      |
| Ivory `#f3efe6`           | Primary text and the experience panel: a clear shift from project browsing to reading. |
| Pale blue `#aec9dd`       | Surname, technical labels, secondary display type.                                     |
| Muted blue-gray `#b0bdc6` | Body descriptions on dark surfaces.                                                    |
| Maroon `#702638`          | Contact section and heading emphasis on ivory. Never small text on dark ink.           |
| Gold `#e7c673`            | Navigation marks, counters, progress, and the primary contact button.                  |
| Slate, sage, and stone    | Screenshot backdrops only; no meaning depends on their color.                          |

## Contrast checks

Ratios below use the WCAG relative-luminance formula. These are selected text-pair checks, not a full accessibility certification.

| Pair                                    | Ratio   |
| --------------------------------------- | ------- |
| Ivory body text / ink canvas            | 15.17:1 |
| Muted body text / ink canvas            | 9.07:1  |
| Pale blue labels / ink canvas           | 10.11:1 |
| Gold navigation / ink canvas            | 10.55:1 |
| Ink text / ivory experience panel       | 15.17:1 |
| Secondary experience text / ivory panel | 5.58:1  |
| Maroon heading / ivory panel            | 9.04:1  |
| Ivory text / maroon contact panel       | 9.04:1  |
| Gold heading / maroon panel             | 6.29:1  |
| Ink button label / gold button          | 10.55:1 |

Normal-size text uses pairs above 4.5:1. Dark maroon is not used for labels on ink. Experience-panel focus outlines switch to maroon so gold does not disappear on ivory. Links, current navigation, and filters also have text, outlines, or shape cues.

## Layout and motion

The new design replaces the previous hero/card layout and accumulated palette overrides with a new component structure and one stylesheet: oversized name masthead, three-column introduction, numbered project index, paper experience panel, ruled credentials list, and a maroon contact spread. Motion supports reading through staged entrances and section reveals. Normal scrolling stays intact. System reduced-motion preferences disable motion.

## Sources

- [W3C: Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum/) — 4.5:1 for normal text and 3:1 for large text.
- [W3C: Use of Color](https://www.w3.org/TR/2023/REC-WCAG22-20231005/#use-of-color) — color is not the only way information is conveyed.
- [W3C: Colors with Good Contrast](https://www.w3.org/WAI/perspectives/contrast.html) — evaluate contrast while selecting the palette.

## SVG typography

The name masthead uses live SVG text with a measured viewBox and preserved aspect ratio. Canvas glyph-ink metrics remove excess line-box whitespace where supported, with SVG bounds as fallback. Letters scale naturally without textLength distortion. Name edits still come from content.json; the enclosing h1 supplies the accessible name and decorative SVGs are hidden from assistive technology. Star and arrow marks use SVG geometry. Body copy, labels, and credentials stay in selectable HTML with a larger responsive type scale.
