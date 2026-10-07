# /init — agent-init for Claude Code (mirrors opencode override)

Initialize with the agent-init template. Do NOT do a default scan.

1. Discuss ideas (≤5 questions) → write `docs/ideas.md` (Goal/Personas/Stack/Non-goals/Open questions). Freeze after.
2. Scaffold from `templates/project/` (backup existing `AGENTS.md` → `AGENTS.md.bak-<ts>`): `AGENTS.md`, `AGENTRULES.md`, `roadmap.md`, `docs/NAVIGATION.md`, `docs/ideas.md` (keep), `docs/design.md`, `docs/issues/{README,TEMPLATE}`, `docs/issues/solved/.gitkeep`, `scripts/new-issue.mjs`, `docs/agent-logs/{README,CONTRIBUTORS,KNOWN_ISSUES}`, `docs/rules/`, `.claude/commands/`.
3. Fill ALL `{{PLACEHOLDERS}}`, create `docs/issues/<PREFIX>-001-project-bootstrap.md` + first session log, verify NAVIGATION paths. Prefix = this project's code from its name: single word → first 2 letters + first consonant at index 2 (`arcdraw`→`ARC`, `brikk`→`BRK`, `brix`→`BRX`); two words → 1+2; three+ → initials. Never a shared `INC` or another project's code.
4. File every later issue with `node scripts/new-issue.mjs --title "..." [--github]` (auto max+1, refuses on collision) — never hand-write a UID.
5. Run formatter/typecheck/tests per stack; report files, placeholders left (must be 0), checks, next 3 issues.
