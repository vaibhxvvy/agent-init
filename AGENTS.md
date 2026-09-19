# AGENTS.md — agent-init

Zero-deps Node >= 18 package. No test framework: verification is `node --check` + scaffolder dry-run + temp-dir e2e.

## Commands

```bash
npm test                                   # --check bin+scripts+plugin, then scaffolder --dry-run (writes nothing)
node scripts/agent-init.mjs --project <dir> --dry-run   # preview scaffold (name inferred from dir; --name/--prefix override)
node scripts/agent-init.mjs --project "$env:TEMP\e2e" --name demo  # real e2e, then delete the dir
powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1 -WhatIf   # installer dry-run
```

## Architecture

- `bin/agent-init.mjs` — npx entry (`--global/--project/--here/--agent/--name/--prefix/--dry-run`). `--global` shells out to `install.ps1`/`install.sh`.
- `scripts/agent-init.mjs` — the scaffolder: infers name from target dir, derives 3-letter UID prefix (or `--prefix`), backs up `AGENTS.md`, copies `templates/project/`, fills `{{PROJECT_NAME}}`/`{{UID_PREFIX}}`, seeds `<PREFIX>-001`, verifies every `NAVIGATION.md` path (exits 1 on missing).
- `templates/project/` — the payload. `templates/global/` — personal global rules. `skills/agent-init/SKILL.md` + `.opencode/plugins/agent-init.mjs` — opencode-first skill package.
- `install.ps1` / `install.sh` — same 13-file list (opencode AGENTS + 4 commands, Claude CLAUDE + 4 commands, skill x3 locations). **Keep both lists in sync** when adding template files. Piped `irm|iex` has no local repo, so both scripts download the zip/tarball bootstrap when templates are absent.

## Gotchas (all verified the hard way)

- Scaffolder fills only `{{PROJECT_NAME}}` / `{{UID_PREFIX}}` / `{{ONE_PARAGRAPH_OUTCOME}}` / `{{FRAMEWORK}}`. Remaining `{{...}}` in `ideas.md`, `design.md`, `RULE_TEMPLATE.md` are intentional — `/init` Phase 3 fills them via discussion. Do not mass-fill.
- Never run `--here` in this repo root — it dumps the template into the repo. Always scaffold into `$env:TEMP\<dir>`.
- `process.env.HOME` is undefined under Windows Node — use absolute paths or `USERPROFILE` in scripts.
- `.ps1` must stay ASCII-only (an em-dash once broke the parser). `.gitattributes` enforces LF, CRLF for `*.ps1`.
- `install.sh` cannot run on this Windows shell (bash resolves to WSL and chokes on Windows paths) — CI on ubuntu covers it; verify `.sh` by reading only.
- Installed globals live outside the repo (`~/.config/opencode`, `~/.claude`) — repo `templates/` is the source of truth, never edit globals directly to fix template bugs.
- Raw URLs (`README.md`, installer comments) must match `github.com/vaibhxvvy/agent-init`, branch `main`. Releases are never deleted; fixes ship as new versions (`CHANGELOG.md`).

## Conventions

- Conventional Commits (`feat:`/`chore:`), one logical change per commit, `main` branch.
- After template changes: dry-run → temp-dir e2e → confirm NAVIGATION verify passes → commit → push (installer bootstrap serves `main.zip`, so push before telling users to reinstall).
