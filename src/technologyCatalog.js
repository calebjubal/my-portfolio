export const technologyCatalog = {
  python: { name: "Python", logo: "python" },
  javascript: { name: "JavaScript", logo: "javascript" },
  typescript: { name: "TypeScript", logo: "typescript" },
  html: { name: "HTML", logo: "html" },
  css: { name: "CSS", logo: "css" },
  react: { name: "React", logo: "react" },
  nextjs: { name: "Next.js", logo: "nextjs" },
  numpy: { name: "NumPy", logo: "numpy" },
  pandas: { name: "Pandas", logo: "pandas" },
  "c++": { name: "C++", logo: "cpp" },
  dart: { name: "Dart", logo: "dart" },
  flutter: { name: "Flutter", logo: "flutter" },
  electron: { name: "Electron", logo: "electron" },
  fastapi: { name: "FastAPI", logo: "fastapi" },
  sqlite: { name: "SQLite", logo: "sqlite" },
  tailwindcss: { name: "Tailwind CSS", logo: "tailwindcss" },
};
const aliases = {
  html5: "html",
  css3: "css",
  reactjs: "react",
  cplusplus: "c++",
  cpp: "c++",
  tailwind: "tailwindcss",
};
export function technologyKey(value) {
  const key = value
    .toLowerCase()
    .trim()
    .replace(/[.\s_-]/g, "");
  return aliases[key] || key;
}
// Split only compound HTML & CSS; keep multiword tool names such as Tailwind CSS.
export function parseTechnologies(value) {
  return (Array.isArray(value) ? value : [value]).flatMap((item) =>
    typeof item === "string"
      ? item
          .split(/,|\s+&\s+/)
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
  );
}
export function getTechnologyStats(skills, projects) {
  const unique = new Map();
  for (const name of parseTechnologies(skills)) {
    const key = technologyKey(name);
    if (!unique.has(key))
      unique.set(key, {
        key,
        ...(technologyCatalog[key] || { name, logo: null }),
      });
  }
  const projectKeys = projects.map(
    (project) => new Set(parseTechnologies(project.tags).map(technologyKey)),
  );
  return [...unique.values()].map((technology) => ({
    ...technology,
    count: projectKeys.filter((keys) => keys.has(technology.key)).length,
  }));
}
