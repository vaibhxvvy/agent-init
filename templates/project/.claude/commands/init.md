# /init — agent-init for Claude Code (mirrors opencode override)

Initialize with the agent-init template. Do NOT do a default scan.

1. Discuss ideas (≤5 questions) → write `docs/ideas.md` (Goal/Personas/Stack/Non-goals/Open questions). Freeze after.
2. Scaffold from `templates/project/` (backup existing `AGENTS.md` → `AGENTS.md.bak-<ts>`): `AGENTS.md`, `AGENTRULES.md`, `roadmap.md`, `docs/NAVIGATION.md`, `docs/ideas.md` (keep), `docs/design.md`, `docs/issues/{README,TEMPLATE}`, `docs/agent-logs/{README,CONTRIBUTORS,KNOWN_ISSUES}`, `docs/rules/`, `.claude/commands/`.
3. Fill ALL `{{PLACEHOLDERS}}`, create `docs/issues/<PREFIX>-001-project-bootstrap.md` (prefix = 3-letter acronym of project name) + first session log, verify NAVIGATION paths.
4. Run formatter/typecheck/tests per stack; report files, placeholders left (must be 0), checks, next 3 issues.
