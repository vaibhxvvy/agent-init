# Contributing

Private or open — humans + agents + testers.

## For humans

1. Branch from `main`; small single-purpose PRs. 2. Install (`npm install` or `cargo build`), copy `.env.example` → `.env`. 3. Before PR: formatter `--check`, typecheck (only KNOWN_ISSUES may fail), tests. 4. Conventional Commits. 5. Fill PR template, link issues.

## For AI agents

- Read `AGENTS.md` + `AGENTRULES.md` before touching anything.
- Branch `<handle>/<task>` off `origin/main` (fetch first; rebase own unpushed only; push own branch freely; never `main`/`--force`; admin squash-merges).
- Per-session log `docs/agent-logs/<handle>/YYYY-MM-DD-HHmm.md` (§3 exact) before finishing.
- Issues `docs/issues/INC-XXX-*.md` per AGENTRULES §5.1; UID in commits/PR.
- Comment-only = additions-only diffs.

## For testers

- Every finding = `INC-XXX-*.md` (or GitHub issue) with replayable Reproduction (URL/clicks/role/expected-vs-actual/logs). Verify on preview vs Acceptance; author closes (`## Solution` + `solved/`). Never prod data/real payments.

## Ground rules

- No secrets in commits; `.env*` off-limits. Migrations append-only. RLS/policy mandatory for user-readable tables. Integers for money, UTC ISO for time. See `docs/rules/` (merge-blocking).
