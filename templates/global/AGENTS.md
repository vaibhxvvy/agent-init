# Global rules for all my projects (agent-init)

> Installed by agent-init one-click. Applied to every opencode session (`~/.config/opencode/AGENTS.md`). Keep personal, not project-specific. Project rules live in `<project>/AGENTS.md` + `opencode.json` instructions.

- Commit small, conventional (`feat/fix/docs/style/refactor/test/chore(scope): …`). One logical change per commit. Never `--force` pushed history, never push `main` directly.
- Verify before commit: formatter clean, zero NEW type errors, tests pass. Slow full lint once at session end.
- One session = one log (`docs/agent-logs/<handle>/YYYY-MM-DD-HHmm.md`): Task/Actions/Files/Commits/Verification/Follow-ups. Never edit others' logs.
- Issues before code for anything beyond trivial: `INC-XXX-kebab.md` from template, assign before solving, `## Solution` before move to `solved/`.
- Ask before destructive (delete/schema/force/secret rotation). Never touch `.env*`, never print secrets.
- Prefer existing patterns over new abstractions; match neighbors first. No plugin/daemon/multi-crate until trigger met (record trigger).
- Token discipline: lazy-load `docs/**` — read `NAVIGATION.md` first, then only the file the task needs. Never pre-read all issues/logs.
