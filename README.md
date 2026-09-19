# agent-init — one-click agentic setup for any CLI agent

> Distilled from two production agentic systems (a TS SaaS app + a Rust launcher).
> Install once → every future `/init` uses YOUR template, auto-scaffolds roadmap/design/issues/logs/rules.

## Install (one command)

**Windows (PowerShell):**

```powershell
irm https://raw.githubusercontent.com/vaibhxvvy/agent-init/main/install.ps1 | iex
```

**macOS / Linux:**

```bash
curl -fsSL https://raw.githubusercontent.com/vaibhxvvy/agent-init/main/install.sh | bash
```

No clone needed — the installer downloads the template itself, backs up your existing globals, and installs for opencode + Claude + Codex. Then open any project and run `/init`.

## Other install methods

**npm (recommended):**

```bash
npm i -g agent-init
agent-init --global          # opencode + claude + codex globals, with backups
```

**Windows (PowerShell, no npm):**

```powershell
irm https://raw.githubusercontent.com/vaibhxvvy/agent-init/main/install.ps1 | iex
# local preview (no writes):
& "C:\Users\vaibh\Desktop\agent-init\install.ps1" -WhatIf
```

**macOS / Linux:**

```bash
curl -fsSL https://raw.githubusercontent.com/vaibhxvvy/agent-init/main/install.sh | bash
```

Idempotent — backs up `AGENTS.md`/`CLAUDE.md`/`init.md` to `*.bak-<ts>` before overwrite. Covers opencode (`~/.config/opencode/`), Claude (`~/.claude/`), Codex (reads project `AGENTS.md` natively — see `docs/AGENTS-CODEX.md`).

## After install — how `/init` changes

- Stock `/init` writes a thin `AGENTS.md`. **Overridden `/init`** instead:
  1. **Ideas discussion** (≤5 Qs) → `docs/ideas.md` (Goal/Personas/Stack/Non-goals/Open Qs, then frozen).
  2. **Scaffold** — `npx agent-init --project .` (name inferred from dir; `--name` overrides. Backs up, copies `templates/project/`, seeds `<PREFIX>-001` where prefix is the 3-letter acronym of the name, verifies NAVIGATION paths).
  3. **Fill** — placeholders → stack/repo/commands, first `<PREFIX>-001-*` + first session log, NAVIGATION links.
  4. **Verify** — formatter/typecheck/tests per stack; zero `{{PLACEHOLDERS}}` required.

Extra commands: `/roadmap` (tracker rollup, never edits roadmap.md), `/design` (append decision row), `/log` (session log stub).

## Repo layout

```text
agent-init/
├── bin/agent-init.mjs            # npx entry (--global/--project/--here/--agent/--dry-run)
├── install.ps1 / install.sh      # no-npm one-click (calls same file list)
├── templates/global/AGENTS.md    # personal global rules
├── templates/global/commands/    # global /init mirror
├── templates/project/
│   ├── AGENTS.md / AGENTRULES.md / roadmap.md / CONTRIBUTING.md
│   ├── docs/{NAVIGATION,ideas,design,AGENTS-CODEX}.md
│   ├── docs/issues/{README,TEMPLATE}.md + solved/.gitkeep
│   ├── docs/agent-logs/{README,CONTRIBUTORS,KNOWN_ISSUES}.md
│   ├── docs/rules/{README,RULE_TEMPLATE}.md + plans/audits .gitkeep
│   ├── .opencode/commands/{init,roadmap,design,log}.md
│   ├── .claude/commands/{init,roadmap,design,log}.md
│   └── .github/{PULL_REQUEST_TEMPLATE,ISSUE_TEMPLATE/{bug,feature}}.md
├── scripts/agent-init.mjs        # scaffolder (zero-deps, name inference, UID-prefix seed, NAVIGATION verify)
└── opencode.json.example         # instructions[] to merge
```

## Extracted segments (why this template)

- Handbook shape (stack/commands/repo map/conventions/env), AGENTRULES §§1-7 (branches/logs/checks/prefix-UID assignment-before-solve), NAVIGATION fresh/frozen + enum law, severity rubric, PR/tester sections.
- Single-source-of-truth + per-file layout, capability-provider trait + scores + isolation, Future-Stages gated table, release flow (never delete), living-state + checkbox tracker + design tokens.

## Skill package (opencode-first)

- `skills/agent-init/SKILL.md` — auto-discovered by the `skill` tool (`~/.config/opencode/skills/`, `~/.claude/skills/`, `~/.agents/skills/`).
- `.opencode/plugins/agent-init.mjs` — plugin entry so `"plugin": ["agent-init"]` loads cleanly (see `opencode.json.example`).
- Claude/Codex template copy (`templates/project/.claude/`, `docs/AGENTS-CODEX.md`) ships as fallback.
