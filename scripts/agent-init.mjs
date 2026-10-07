// agent-init scaffolder — zero-deps node.
// Usage: node scripts/agent-init.mjs --here [--name X] [--prefix Y] [--stack Y] [--dry-run] [--agent all|opencode|claude|codex]
// Name is independent: omitted --name infers basename(targetDir). Never copies another repo's name.
// UID prefix: --prefix override, else 3-letter acronym derived from project name (my-cool-app -> MCA).
import { cpSync, existsSync, renameSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const get = (k, d = "") => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const dry = argv.includes("--dry-run");
const here = argv.includes("--here") || argv.includes("--project");
const stack = get("--stack", "node + opencode");
const agent = get("--agent", "all");
const targetDir = argv.includes("--project") && argv[argv.indexOf("--project") + 1] && !argv[argv.indexOf("--project") + 1].startsWith("--")
  ? argv[argv.indexOf("--project") + 1] : process.cwd();

// Project name: explicit --name wins, else independent basename inference (current dir).
const rawName = get("--name", "");
const inferred = basename(targetDir) || "my-project";
const name = (rawName || inferred).trim() || "my-project";
if (/^(incruit|chopsticks)$/i.test(name)) {
  console.error(`[agent-init] refused: --name "${name}" is a reserved lineage name. Choose your project name.`);
  process.exit(1);
}

// UID prefix: explicit --prefix wins, else code derived from project name.
// Single word -> first 2 letters + first consonant from index 2 (a vowel at
// position 3 is skipped): arcdraw -> ARC, brikk -> BRK. Two words -> 1+2,
// three+ words -> initials.
function uidPrefixFor(projectName) {
  const parts = projectName.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  let code = "";
  if (parts.length >= 3) code = parts.slice(0, 3).map((p) => p[0]).join("");
  else if (parts.length === 2) code = (parts[0][0] || "") + (parts[1].slice(0, 2) || "");
  else if (parts.length === 1) {
    const w = parts[0];
    code = w.slice(0, 2);
    const third = w.slice(2).replace(/^[aeiou]+/, "")[0] || "";
    code += third;
  }
  code = (code || "prj").toUpperCase().replace(/[^A-Z0-9]/g, "X");
  return code.padEnd(3, "X").slice(0, 3);
}
const rawPrefix = get("--prefix", "");
let prefix = rawPrefix.trim().toUpperCase();
if (prefix) {
  if (!/^[A-Z0-9]{2,5}$/.test(prefix)) {
    console.error(`[agent-init] refused: --prefix "${rawPrefix}" must be 2-5 uppercase alphanumerics.`);
    process.exit(1);
  }
} else {
  prefix = uidPrefixFor(name);
}
const src = join(root, "templates", "project");
const dst = here || argv.includes("--project") ? targetDir : join(process.cwd(), "agent-init-out");

const list = (d, base = "") => readdirSync(d).flatMap((f) => {
  const p = join(d, f); const rel = join(base, f);
  return statSync(p).isDirectory() ? list(p, rel) : [rel];
});
console.log(`[agent-init] ${dry ? "DRY-RUN " : ""}scaffold: ${src} -> ${dst} (name=${name} prefix=${prefix} agent=${agent})`);
for (const rel of list(src)) {
  const s = join(src, rel);
  if (rel.includes(".opencode") && agent === "claude") continue; // claude mirror added in Phase C
  console.log(`  ${dry ? "would write" : "write"}: ${rel}`);
}
if (dry) { console.log("[agent-init] dry-run ok — no writes."); process.exit(0); }
if (existsSync(join(dst, "AGENTS.md"))) {
  const b = join(dst, `AGENTS.md.bak-${Date.now()}`);
  renameSync(join(dst, "AGENTS.md"), b); console.log(`backup: AGENTS.md -> ${b}`);
}
mkdirSync(dst, { recursive: true });
cpSync(src, dst, { recursive: true, filter: (s) => !(s.includes(".opencode") && agent === "claude") });
// fill placeholders
const fill = (p, map) => {
  let t = readFileSync(p, "utf8"); let changed = false;
  for (const [k, v] of Object.entries(map)) if (t.includes(k)) { t = t.replaceAll(k, v); changed = true; }
  if (changed) writeFileSync(p, t);
};
const agentsPath = join(dst, "AGENTS.md");
if (existsSync(agentsPath)) fill(agentsPath, { "{{PROJECT_NAME}}": name, "{{ONE_PARAGRAPH_OUTCOME}}": `${name} — outcome filled post ideas discussion`, "{{FRAMEWORK}}": stack, "{{UID_PREFIX}}": prefix });
for (const rel of list(dst)) {
  if (rel.endsWith(".md") || rel.endsWith(".mjs")) {
    const p = join(dst, rel);
    try { fill(p, { "{{PROJECT_NAME}}": name, "{{UID_PREFIX}}": prefix }); } catch {}
  }
}
// seed <PREFIX>-001 + NAVIGATION verify
const inc1 = join(dst, "docs", "issues", `${prefix}-001-project-bootstrap.md`);
if (!existsSync(inc1)) {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(inc1, `---\nuid: ${prefix}-001\ntitle: Project bootstrap (${name})\nstatus: in_progress\nseverity: info\nassignee: unassigned\ncreated: ${today}\nupdated: ${today}\nlabels: [bootstrap]\n---\n\n## Description\n\nInitial scaffold from agent-init template. Fill AGENTS.md placeholders, confirm stack/commands, file next issues.\n\n## Acceptance criteria\n\n- [ ] AGENTS.md has zero {{PLACEHOLDERS}}\n- [ ] docs/NAVIGATION.md paths all exist\n- [ ] first session log created\n`);
  console.log(`seed: docs/issues/${prefix}-001-project-bootstrap.md`);
}
// verify NAVIGATION paths
const nav = join(dst, "docs", "NAVIGATION.md");
if (existsSync(nav)) {
  const t = readFileSync(nav, "utf8");
  const missing = [...t.matchAll(/`((?:AGENTS\.md|AGENTRULES\.md|docs\/[^`]+|roadmap\.md)[^`]*)`/g)]
    .map((m) => m[1].split(" ")[0]).filter((p) => !existsSync(join(dst, p)) && !p.includes("<handle>") && !p.includes("*"));
  if (missing.length) { console.error(`NAVIGATION verify FAILED — missing: ${missing.join(", ")}`); process.exit(1); }
  console.log("verify: NAVIGATION paths ok");
}
const leftovers = [];
for (const rel of list(dst)) {
  if (!rel.endsWith(".md")) continue;
  const t = readFileSync(join(dst, rel), "utf8");
  if (t.includes("{{")) leftovers.push(rel);
}
if (leftovers.length) console.log(`warn: placeholders remain in: ${leftovers.join(", ")}`);
else console.log("verify: zero {{PLACEHOLDERS}} in .md (excluding intentional agent docs)");
console.log(`[agent-init] done -> ${dst}`);
