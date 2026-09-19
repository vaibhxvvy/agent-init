# Issues

Central tracker — one file per issue. Pick by UID, branch, link PR.

## File naming

`docs/issues/<UID>-<kebab>.md` — UID `<PREFIX>-XXX` where `<PREFIX>` is the 3-letter acronym of your project name (scaffolded as `{{UID_PREFIX}}`, e.g. `my-cool-app` → `MCA-001`). Zero-padded sequential. Next = max+1 (`git ls-files docs/issues/<PREFIX>-*.md | sort`). Race → second merger renames via `git mv`.

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
