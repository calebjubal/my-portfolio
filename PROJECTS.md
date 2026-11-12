# Project selection and logo sources

## Featured selection

I inspected the public repository inventory (61 public results), then read candidate READMEs and checked the selected projects' source/configuration. Private repositories are not featured or used for counts. “Best” is an editorial selection based on a clear problem, implemented behavior, documentation, reproducible setup, and complementary technical depth; it is not a measured ranking of every repository.

| Selected project             | Why it earns a place                                                                                                                                            | Verified sources                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AEGIS                        | Working cross-domain risk prototype with replayable scenarios, explicit detection logic, evidence, regression tests, and a real dashboard image.                | [README](https://github.com/calebjubal/aegis-prototype/blob/main/README.md), [detection engine](https://github.com/calebjubal/aegis-prototype/blob/main/app/lib/detection.ts), [package.json](https://github.com/calebjubal/aegis-prototype/blob/main/package.json), [Python requirements](https://github.com/calebjubal/aegis-prototype/blob/main/services/api/requirements.txt)                                  |
| Satoshi Trace                | Offline desktop engineering: evidence parsing, local case database, graph analysis, explainable leads, tests, and packaging.                                    | [README](https://github.com/calebjubal/crypto-forensics/blob/main/README.md), [package.json](https://github.com/calebjubal/crypto-forensics/blob/main/package.json), [source tree](https://github.com/calebjubal/crypto-forensics/tree/main/src)                                                                                                                                                                   |
| Voice RAG College Counsellor | Different interaction model: Flutter voice client, Python agent, grounded static-document retrieval, keyword fallback, tests, and missing-information deferral. | [README](https://github.com/calebjubal/voice-rag-counsellor/blob/main/README.md), [Python dependencies](https://github.com/calebjubal/voice-rag-counsellor/blob/main/pyproject.toml), [Flutter dependencies](https://github.com/calebjubal/voice-rag-counsellor/blob/main/college_counsellor_ai/pubspec.yaml), [retrieval implementation](https://github.com/calebjubal/voice-rag-counsellor/blob/main/src/rag.py) |

Other inspected candidates included Cryptalyzer, multi-agent RFP automation, the EY RFP prototype, Slurm Job Doctor, the GraphRAG benchmark, HRMS-Lite, Quickchat, Vision Agent, and AI test generation. The selected three give a compact spread of a dashboard, desktop application, and voice/mobile system. Slurm Job Doctor labels itself a planned MVP; the benchmark's README offers little explanation. Stronger evidence of implemented workflows was preferred to broad feature claims.

Project descriptions reflect repository evidence, not a fresh production certification. No unverified performance metrics, individual team contributions, live deployments, or security guarantees were added. Satoshi Trace findings remain investigative leads rather than proof; AEGIS remains a synthetic-data prototype; the counsellor uses a fictional university.

## Images

- AEGIS uses the real [command-center image in its repository](https://github.com/calebjubal/aegis-prototype/blob/main/docs/assets/command-center.png), copied locally.
- Satoshi Trace and the voice counsellor use original SVG architecture illustrations based on the verified READMEs. They are explicitly captioned as illustrations, not application screenshots. Replace them through the content editor when new screenshots are available.

## Technology logos

SVG logos are copied unmodified from [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0/icons), a recognized collection of language and development-tool marks. The [MIT license](public/logos/DEVICON-LICENSE.txt) is bundled with the assets. Source filenames and variants are recorded in the public/logos directory (Python, JavaScript, TypeScript, HTML5, CSS3, React, Next.js, NumPy, Pandas, C++, Dart, Flutter, Electron, FastAPI, SQLite, and Tailwind CSS original variants). Logos identify technologies, not endorsement. The white sticker borders and shadows surround the assets without changing their artwork.

## Count definition

A count means **featured projects using that technology**, not all-time work or all GitHub repositories. It is computed from `src/content.json` project `tags`, canonicalizing aliases and counting a technology no more than once per project. Counts update when project stacks change. The main pile includes the skill list and any technology appearing in the featured stacks; compact project stickers show only that project's stack. A skill with no featured usage displays zero rather than an invented number.

Skill and stack edits remain available in the content editor. New names without a bundled logo get a neutral code icon and their real name in the detail card, rather than a broken image or a fabricated brand mark. Add a verified SVG and catalog entry to give a new technology its own mark.

## Interaction

Sticker details have a dark background and light text. They work on pointer hover, keyboard focus, or tap, and close with Escape or outside interaction. The tooltip can be hovered. Mobile compact-stack detail cards use a viewport-aligned position; the main pile keeps the scattered treatment with comfortable tap areas.

References: [W3C Content on Hover or Focus](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html), [Devicon](https://github.com/devicons/devicon).
