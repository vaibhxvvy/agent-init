#!/usr/bin/env node
// agent-init CLI — npx agent-init [--global | --project | --here] [--agent opencode|claude|codex|all]
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h") || args.length === 0) {
  console.log(`agent-init v0.1.0 — one-click agentic template (opencode/claude/codex)
Usage:
  npx agent-init --global            install globals (AGENTS + /init override x3 agents)
  npx agent-init --project [dir]     scaffold template into [dir] (default: .)
  npx agent-init --here              scaffold into CWD (same as --project .)
  node scripts/agent-init.mjs --here --name "X" --dry-run   preview only
Flags:
  --agent <opencode|claude|codex|all>  default all
  --name <project>                     fill {{PROJECT_NAME}} (default: basename of target dir)
  --prefix <ABC>                       UID prefix 2-5 uppercase alphanumerics (default: 3-letter acronym of name)
  --stack <stack>                      fill {{FRAMEWORK}}
  --dry-run                            preview, write nothing`);
  process.exit(0);
}
const passthrough = args.flatMap((a) => {
  if (a === "--global") return ["--global"];
  return [a];
});
if (args.includes("--global")) {
  const isWin = process.platform === "win32";
  const script = isWin ? join(root, "install.ps1") : join(root, "install.sh");
  const cmd = isWin ? "powershell" : "bash";
  const cargs = isWin
    ? ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", script, "-Repo", root]
    : [script, root];
  const r = spawnSync(cmd, cargs, { stdio: "inherit" });
  process.exit(r.status ?? 1);
}
const r = spawnSync(process.execPath, [join(root, "scripts", "agent-init.mjs"), ...passthrough], { stdio: "inherit" });
process.exit(r.status ?? 1);
