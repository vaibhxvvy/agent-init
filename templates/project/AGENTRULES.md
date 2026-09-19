# AGENTRULES.md — Mandatory Rules for AI Coding Agents

> Every AI agent MUST follow without exception. `AGENTS.md` = how to work in codebase. This file = how you behave + prove it. Overrides agent defaults. Violations reverted.

## 1. The Golden Rules

1. **Never break the working project.** Keep verified flows green + CI (`format`, `typecheck`, `test`, `build`). No migration/schema change without proving free + paid (or main) paths still work.
2. **Land through PRs.** Work on `<handle>/<task>` (`git config init.contributor`). Push YOUR branch anytime (race-free). `main` moves only via admin squash-merge. Never `--force`, never rewrite pushed history.
3. **Commit granularly.** One logical change per commit. Small = revertable.
4. **Record everything.** New per-session file `docs/agent-logs/<handle>/YYYY-MM-DD-HHmm.md` in exact §3 format before finishing.
5. **Leave cleaner.** No dead/commented/debug code, no `any` where real type fits, no secrets.
6. **Do not touch `.env` / `.env.*`.** Never print secrets into logs/commits.
7. **Comment-only = comment-only.** Docs/format tasks → additions-only diffs.
8. **Verify before commit.** §4 checks per commit.
9. **Ask, don't assume.** Ambiguous product/destructive (delete/schema/force) needs admin approval first.
10. **Ignore admin-only triggers** (e.g. `recommit.md`-style redeploy hacks) — never read/edit/commit them; leave dirty for admin.

## 2. Commit Policy

Allowed: `add <paths>, commit, log/show/diff, stash, branch inspect, create/switch own <handle>/*, squash OWN unpushed, push origin <your-branch>`.
Forbidden: push main, `--force`, rewriting pushed history, resets of shared history, other remote mutations, tags, self-merge without approval.
Style: Conventional Commits imperative (`feat/fix/docs/style/refactor/test/chore(scope): …`). Every commit listed in log with short SHA. Undo own unpushed via `git revert`.

### 2.1 Session → PR protocol

1. Identity: `git config --get init.contributor`, else ask once (`[a-z0-9-]`), set + roster row in `docs/agent-logs/CONTRIBUTORS.md`.
2. Branch `<handle>/<short-task>` off latest `origin/main`. Record base SHA.
3. Granular commits + §4 per commit. 4. Log file in final commit. 5. Push + open PR (`Closes docs/issues/{{UID_PREFIX}}-XXX-*.md`). 6. ONLY admin squash-merges (bot `git mv` to `solved/` excepted). 7. After merge delete branch, note squashed SHA next session.

### 2.2 Stay current

Fetch at start + before push. Replay ONLY own unpushed via `git rebase origin/main` (never merge main in, never `--force`). Conflicts: preserve both intents, re-run §4, list in log. Stuck → log + hand to admin.

## 3. Session Log (MANDATORY)

File: `docs/agent-logs/<handle>/YYYY-MM-DD-HHmm.md` (END local 24h). Never edit others' files. Legacy `<handle>.md` frozen.
First line exactly: `## YYYY-MM-DD HH:mm | agent: <name> | tool: <opencode|claude-code|codex|other> | model: <id>`
Sections: `**Task:**` / `**Actions:**` (numbered, files+commands+agents+verifications) / `**Files changed:**` (add/modify/move/delete) / `**Commits:**` (`<sha> <msg>`) / `**Verification:**` (lint/type/test/build counts) / `**Follow-ups:**`.
Write BEFORE final commit so it ships in last commit. Exhaustive but factual. No secrets.

## 4. Verification Checklist (before EVERY commit)

| Command | Expectation |
| ------- | ----------- |
| formatter `--check` | zero diffs |
| typecheck | zero NEW errors (pre-existing in KNOWN_ISSUES.md) |
| tests | all pass |
| build | required when touching build/deps/routes/server |

Slow full `lint` once at session end. New known-failing → document in KNOWN_ISSUES.md, never silent.

## 5. Cleanliness + Issues

Strict mode on, boundary respected, WHY-comments + JSDoc, Prettier enforced, no dep add/remove without approval + reason.

### 5.1 Issues (`docs/issues/`)

- One file `docs/issues/<UID>-<kebab>.md`, UID `<PREFIX>-XXX` where `<PREFIX>` is the 3-letter acronym of your project name (derived at scaffold; `my-cool-app` → `MCA-001`). Override once via `--prefix` if needed, then keep monotonic. Next = max+1 (`git ls-files docs/issues/<PREFIX>-*.md | sort`); race → second merger `git mv` renames.
- Copy `TEMPLATE.md` (frontmatter `uid/title/status/severity/assignee/created/updated/labels` + Description/Repro/Proposed/Acceptance/References/Solution).
- Branch `<handle>/<PREFIX>-XXX-desc`, UID in commits + PR title/body.
- Statuses `open→in_progress→review→closed`; assignee moves forward; `review→closed` via merge + `git mv` to `solved/` + manual issue close after testing.
- **Assignment before solve:** `assignee:<handle>` + `in_progress` BEFORE fix. Sequence: assigned → solved (## Solution) → moved → PR opened. Skips reverted.

## 6. Multi-Agent Sessions

Sub-agents inherit ALL rules; owner responsible. Pre-spawn checklist: declare file scope per agent, no overlapping writes (reads ok), each task independently verifiable, owner re-runs §4 over combined diff + records every sub-agent in Actions. One session = one log.

## 7. Incident Rule

Broke it? Revert own commit, fix forward, log both honestly. Hiding failures worse than failure.
