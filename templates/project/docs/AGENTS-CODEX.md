# Codex

Codex reads `AGENTS.md` natively — no separate config needed.

- Project rules: `<project>/AGENTS.md` (+ `AGENTRULES.md`, `docs/NAVIGATION.md` via `@` references).
- After `/init` (run under opencode or Claude, or manually via `npx agent-init --project .`), Codex sessions follow the same files: issues in `docs/issues/`, logs in `docs/agent-logs/<handle>/`.
- Keep Codex-visible instructions inside `AGENTS.md`; avoid opencode-only syntax there (put `@`/`!` command tricks in `.opencode/commands/`, not in `AGENTS.md`).
