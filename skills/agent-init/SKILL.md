---
name: agent-init
description: Scaffold any project with the agent-init agentic template — ideas discussion, placeholder fill, per-project issue tracker with auto-derived UID prefix. Use when the user says /init, bootstrap agent docs, scaffold AGENTS.md, or set up issues/logs/rules for a new or existing project.
license: MIT
compatibility: opencode
metadata:
  audience: maintainers
  workflow: project-bootstrap
---

# agent-init

Independent project scaffolder. The project name always comes from the target directory (or explicit `--name`), never from another repo. Issue UIDs always derive from that project name as a 3-letter acronym (`my-cool-app` → `MCA-001`).

## When to use me

Use this when the user wants to init, bootstrap, or scaffold agentic docs: `AGENTS.md`, `AGENTRULES.md`, `docs/NAVIGATION.md`, `docs/ideas.md`, `docs/design.md`, `docs/issues/`, `docs/agent-logs/`, `docs/rules/`, plus `/init`, `/roadmap`, `/design`, `/log` commands.

## How to scaffold

Prefer the script; fall back to manual copy only if it is missing.

```bash
node scripts/agent-init.mjs --project <dir> --dry-run
node scripts/agent-init.mjs --project <dir>
```

Rules:

- `--name` omitted → basename of `<dir>` is the project name. `--name` overrides. Never reuse another repo's name; `incruit`/`chopsticks` are refused.
- `--prefix` omitted → 3-letter acronym of the name (first letters of first 3 words; `agent-init` → `AIN`, `shop` → `SHO`). `--prefix` overrides (2–5 uppercase alphanumerics).
- The scaffolder fills `{{PROJECT_NAME}}` and `{{UID_PREFIX}}` in every `.md`, seeds `docs/issues/<PREFIX>-001-project-bootstrap.md`, backs up existing `AGENTS.md`, and verifies every `docs/NAVIGATION.md` path.

## /init flow (what the command does)

1. Ideas discussion (max 5 questions) → `docs/ideas.md` (Goal/Personas/Stack/Non-goals/Open questions). Frozen after.
2. Scaffold (never overwrite without backup) from `templates/project/`.
3. Fill all `{{PLACEHOLDERS}}`: project paragraph, stack table, commands, repo tree, personas, deploy quirks; first `<PREFIX>-001` issue + first session log.
4. Verify: formatter + typecheck + tests per stack; zero `{{...}}` except intentional ones in `ideas.md`/`design.md`/`RULE_TEMPLATE.md`; NAVIGATION paths all exist.

## Tracker contract

- One file per issue: `docs/issues/<PREFIX>-XXX-kebab.md`, UID `<PREFIX>-XXX` zero-padded sequential, next = max+1, race → second merger renames via `git mv`.
- Branch `<handle>/<PREFIX>-XXX-desc`, UID in commits + PR title/body (`fix(<PREFIX>-XXX): …`, `Closes docs/issues/<PREFIX>-XXX-*.md`).
- Statuses `open|in_progress|review|closed`; assign (`assignee` + `in_progress`) before solving; `## Solution` before move to `solved/`.

## Verify before finishing

- `node --check scripts/agent-init.mjs && node scripts/agent-init.mjs --dry-run`
- Scaffold output contains no other project's name and no hardcoded `INC-` prefix.
- `docs/NAVIGATION.md` verify passes.
