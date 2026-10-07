# Issues

Central tracker — one file per issue. Pick by UID, branch, link PR.

## File naming

`docs/issues/<UID>-<kebab>.md` — UID `<PREFIX>-XXX` where `<PREFIX>` is **this project's** code (scaffolded as `{{UID_PREFIX}}`), never a shared or borrowed one. Single word → first 2 letters + first consonant at index 2 (`arcdraw` → `ARC`, `brikk` → `BRK`); two words → 1+2 (`my-cool` → `MCO`); three+ → initials (`my-cool-app` → `MCA`). Zero-padded sequential, next = max+1. Race → second merger renames via `git mv`.

## Creating one — use the script

Never hand-write a UID. The script reads the existing issue filenames to learn `<PREFIX>`, takes max+1, renders `TEMPLATE.md`, and refuses on a collision instead of overwriting.

```bash
node scripts/new-issue.mjs --title "Login button dead on mobile"
node scripts/new-issue.mjs --title "..." --severity high --label security,auth --github
```

| Flag | Default | Notes |
| ---- | ------- | ----- |
| `--title` | required | plain-language title; also becomes the file slug |
| `--slug` | from title | override the kebab suffix |
| `--severity` | `medium` | `critical\|high\|medium\|low\|info` |
| `--label` | none | repeatable |
| `--assignee` | `unassigned` | handle |
| `--description` | empty | one-paragraph Description |
| `--github` | off | also open the `gh` issue, record URL under `## References` |
| `--dry-run` | off | print the path, write nothing |

Same command whether the report came from a GitHub issue page, a user bug report, or an agent finding — one numbering path per project. `--github` is optional; `docs/issues/` stays the source of truth either way.

## Required frontmatter

```markdown
---
uid: {{UID_PREFIX}}-XXX
title: Short human title
status: open | in_progress | review | closed
severity: critical | high | medium | low | info
assignee: <handle> | unassigned
created: YYYY-MM-DD
updated: YYYY-MM-DD
labels: [backend, security, docs]
---

## Description
## Reproduction / Evidence
## Proposed solution
## Acceptance criteria
- [ ] observable criterion
## References
## Solution (filled before move to solved/)
```

Use `file:line` refs. Severity: `critical` = money/auth/data-loss · `high` = core flow broken · `medium` = degraded w/ workaround · `low` = cosmetic · `info` = chore. Unsure → higher + why.

## Workflow

1. Pick or create (assign `assignee` + `in_progress` BEFORE fix). 2. Branch `<handle>/<PREFIX>-XXX-desc` off `origin/main`. 3. Granular commits (`fix(<PREFIX>-XXX): …`). 4. PR `fix(<PREFIX>-XXX): …` body `Closes docs/issues/<PREFIX>-XXX-*.md`. 5. Admin squash-merges → file `git mv` to `solved/` + `status: closed` (+ close GitHub issue manually after testing). 6. Never edit another's open issue without coordination.

## Solved

Update SAME file with `## Solution` (what/commits/PR/verification), set `closed` + `updated`, `git mv docs/issues/<UID>-*.md docs/issues/solved/`. Never delete.

## Security issues

Report privately first (`SECURITY.md`). Record sanitized issue after fix (class + files + verification, no PoC/secrets/data).
