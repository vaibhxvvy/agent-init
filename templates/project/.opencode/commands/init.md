---
description: Init any project with the agent-init template (ideas → scaffold → fill)
agent: build
---

# /init — agent-init override (beats built-in)

You are initializing this project with the **agent-init template** (incruit + chopsticks lineage). Do NOT run the default thin scan. Follow this flow exactly.

## Phase 1 — Ideas discussion (max 5 questions, use question tool if available)

Ask/decide, then write `docs/ideas.md`:
1. One-paragraph outcome: what does this project do, for whom, what job done?
2. Personas/roles + visibility (private/public)?
3. Stack: framework/language/data/auth/external (or `cargo --version` / `node --version` detection via `!` shell output)?
4. Repo map: top dirs + entry points (`!`ls` output allowed)?
5. Constraints: commands (dev/build/test/lint), deploy quirks, non-goals?

Write `docs/ideas.md` with: Goal / Personas / Stack / Non-goals / Open questions. This file freezes after this phase.

## Phase 2 — Scaffold (never overwrite without backup)

Run `node scripts/agent-init.mjs --here` if present, else manually copy from the installed template (`templates/project/`):
- `AGENTS.md`, `AGENTRULES.md`, `roadmap.md`
- `docs/NAVIGATION.md`, `docs/ideas.md` (keep Phase 1 content)
- `docs/design.md` (architecture decisions — see chopsticks STATE pattern)
- `docs/issues/{README.md,TEMPLATE.md}`, `docs/issues/solved/.gitkeep`
- `docs/agent-logs/{README.md,CONTRIBUTORS.md,KNOWN_ISSUES.md}`
- `docs/rules/README.md`, `docs/plans/.gitkeep`, `docs/audits/.gitkeep`
- `.opencode/commands/` (keep this init + add roadmap/design/log commands)

Back up any existing `AGENTS.md` → `AGENTS.md.bak-<ts>` first.

## Phase 3 — Fill (replace ALL {{PLACEHOLDERS}})

- `AGENTS.md`: project paragraph (from ideas), stack table, commands (detected), repo tree (`!` tree output), personas, deploy quirks.
- `AGENTRULES.md`: set handle key (`init.contributor`), keep workflow as-is.
- `docs/agent-logs/CONTRIBUTORS.md`: first handle row.
- Create `docs/issues/INC-001-project-bootstrap.md` (`status: in_progress`, `assignee: <handle>`) + first session log `docs/agent-logs/<handle>/YYYY-MM-DD-HHmm.md` with Task/Actions/Files/Commits/Verification/Follow-ups.
- Link everything in `docs/NAVIGATION.md` (verify every path exists).

## Phase 4 — Verify + report

Run formatter + typecheck + tests (per stack; `cargo fmt/clippy/test` or `prettier/tsc/vitest`). Report: files created, placeholders remaining (must be zero), checks pass/fail, next 3 issues to file. Never claim completeness with placeholders left.
