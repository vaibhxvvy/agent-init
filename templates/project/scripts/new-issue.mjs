// new-issue.mjs - file an issue with the next UID. Zero deps, node >= 18.
//
//   node scripts/new-issue.mjs --title "Login button dead on mobile"
//   node scripts/new-issue.mjs --title "..." --github
//
// UID = <PREFIX>-XXX where <PREFIX> is this project's code (scaffolded as
// {{UID_PREFIX}}) and XXX is max+1 across docs/issues/ and docs/issues/solved/.
// One source of truth: the existing issue filenames. Never hand-write a UID.
//
// Flags: --title (required) --slug --severity --label (repeatable) --assignee
//        --description --github --dry-run
// --github also opens the matching `gh` issue and records its URL in References.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const opt = (name, dflt = "") => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : dflt;
};
const all = (name) =>
  argv.flatMap((a, i) => (a === `--${name}` && argv[i + 1] && !argv[i + 1].startsWith("--") ? [argv[i + 1]] : []));

const title = opt("title").trim();
if (!title) {
  console.error('[new-issue] refused: --title is required. e.g. --title "Login button dead on mobile"');
  process.exit(1);
}
const severity = opt("severity", "medium");
if (!["critical", "high", "medium", "low", "info"].includes(severity)) {
  console.error(`[new-issue] refused: --severity "${severity}" must be critical|high|medium|low|info.`);
  process.exit(1);
}

const issuesDir = join(root, "docs", "issues");
const solvedDir = join(issuesDir, "solved");
const UID_RE = /^([A-Z0-9]{2,5})-(\d{3})-/;

const existing = [];
for (const dir of [issuesDir, solvedDir]) {
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    const m = f.match(UID_RE);
    if (m) existing.push({ prefix: m[1], n: Number(m[2]), file: f, dir });
  }
}
if (!existing.length) {
  console.error("[new-issue] refused: no existing issue files to derive the prefix from. Run the scaffolder first.");
  process.exit(1);
}

const counts = new Map();
for (const e of existing) counts.set(e.prefix, (counts.get(e.prefix) || 0) + 1);
const prefix = opt("prefix", [...counts].sort((a, b) => b[1] - a[1])[0][0]).toUpperCase();
const mine = existing.filter((e) => e.prefix === prefix);
const num = String(Math.max(...mine.map((e) => e.n)) + 1).padStart(3, "0");
const uid = `${prefix}-${num}`;

const kebab = (opt("slug") || title)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 60) || "issue";
const path = join(issuesDir, `${uid}-${kebab}.md`);
if (existsSync(path)) {
  console.error(`[new-issue] refused: ${uid} already exists at ${path}. Someone else took the number.`);
  process.exit(1);
}

const tplPath = join(issuesDir, "TEMPLATE.md");
if (!existsSync(tplPath)) {
  console.error("[new-issue] refused: docs/issues/TEMPLATE.md missing.");
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
const assignee = opt("assignee", "unassigned");
const handle = assignee === "unassigned" ? "<handle>" : assignee;
const labels = all("label");
let body = readFileSync(tplPath, "utf8")
  .replaceAll("{{UID_PREFIX}}-XXX", uid)
  .replace(/^title:.*$/m, `title: ${title}`)
  .replace(/^status:.*$/m, "status: open")
  .replace(/^severity:.*$/m, `severity: ${severity}`)
  .replace(/^assignee:.*$/m, `assignee: ${assignee}`)
  .replace(/^created:.*$/m, `created: ${today}`)
  .replace(/^updated:.*$/m, `updated: ${today}`)
  .replace(/^labels:.*$/m, `labels: [${labels.join(", ")}]`);

const description = opt("description").trim();
if (description) {
  const para = description.replace(/\s*\n\s*/g, " ");
  body = body.replace(/## Description\n\n[^\n]*/, `## Description\n\n${para}`);
}

let ghUrl = "";
if (flag("github")) {
  const ghBody = body.split("## Acceptance criteria")[0].trim();
  try {
    const args = ["issue", "create", "--title", title, "--body", ghBody];
    for (const l of labels) args.push("--label", l);
    ghUrl = execFileSync("gh", args, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    console.error("[new-issue] gh failed - local file still written, create the GitHub issue by hand.");
  }
}
if (ghUrl) body = body.replace(/## References\n\n(- Related PR: #\n)?/, `## References\n\n- GitHub: ${ghUrl}\n`);

if (flag("dry-run")) {
  console.log(`[new-issue] DRY-RUN would write: docs/issues/${uid}-${kebab}.md`);
  process.exit(0);
}
writeFileSync(path, body);
console.log(`[new-issue] ${uid} -> docs/issues/${uid}-${kebab}.md`);
if (ghUrl) console.log(`[new-issue] github: ${ghUrl}`);
console.log(`[new-issue] next: branch ${handle}/${uid}-${kebab}`);
