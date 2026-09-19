# Docs Navigation

> Single index for humans + agents. `AGENTS.md` + `AGENTRULES.md` are authority — this file tells **what lives where + what is fresh**. Read top-to-bottom, stop when you have what you need.

## Read order

| # | File | Why |
| --- | ---- | --- |
| 1 | `AGENTS.md` | What it is, commands, repo map, conventions |
| 2 | `AGENTRULES.md` | Behavior: branches, commits, logs, checks |
| 3 | `CONTRIBUTING.md` | Human on-ramp (agents: §§For AI agents) |
| 4 | `docs/issues/README.md` | Pick/create issue (UID scheme + automation) |
| 5 | `docs/agent-logs/README.md` | Per-session log placement (add-only) |
| 6 | `docs/rules/` | Merge-blocking rules (violations block merge) |
| 7 | `README.md` | Deep reference — consult, don't memorize |
| 8 | `docs/ideas.md` | Original ideas discussion (why this scope) |
| 9 | `roadmap.md` | Pointer to tracker (tracker IS roadmap) |

## What lives where

| Path | Contents | State |
| ---- | -------- | ----- |
| `docs/ideas.md` | Ideas discussion → decisions + non-goals | Fresh (written once by /init, then frozen) |
| `docs/issues/{{UID_PREFIX}}-*.md` | Active tracker | **Fresh — source of truth** |
| `docs/issues/solved/` | Closed + `## Solution` | **Fresh — append via `git mv`** |
| `docs/issues/README.md` + `TEMPLATE.md` | Workflow + template | Fresh |
| `docs/agent-logs/<handle>/` | One file per session | **Fresh — add-only, never edit** |
| `docs/agent-logs/CONTRIBUTORS.md` | Handle roster | Fresh |
| `docs/agent-logs/KNOWN_ISSUES.md` | Accepted-broken (check before debugging red) | Fresh |
| `docs/rules/` | Merge-blocking rules | Fresh |
| `roadmap.md` | Pointer only | Pointer — don't extend |
| `docs/design.md` | Architecture/design decisions | Fresh |
| `docs/plans/` | Dated build plans | **Frozen — reference only** |
| `docs/audits/` | Security/test artifacts | **Frozen — new work uses issues** |
| `src/routes/README.md` etc. | Local conventions | Fresh |

## Freshness contract

- **Active:** `docs/issues/` + `docs/agent-logs/<handle>/` + `docs/rules/`. Nothing else tracks in-flight work.
- **Frozen = frozen:** link, never edit.
- **Stale:** contradicting doc gets `> Stale as of YYYY-MM-DD: ...` banner + replacing source, never silent rewrite.
- **Enums are law:** issue `status: open|in_progress|review|closed` (CI-enforced). Free-text breaks automation.
