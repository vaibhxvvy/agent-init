# Changelog

All notable changes. Format: Keep a Changelog. Never delete/overwrite a release — ship fixes as a new version.

## [Unreleased]

### Added

- Skill package (opencode-first, ponytail-style): `skills/agent-init/SKILL.md` + `.opencode/plugins/agent-init.mjs` + `package.json` (`opencode-plugin` keyword, `pi.skills`, plugin entry). Installers cover `~/.config/opencode/skills/`, `~/.claude/skills/`, `~/.agents/skills/`; `opencode.json.example` shows `"plugin": ["agent-init"]`.
- Independent init: `--name` omitted infers basename of target dir; reserved lineage names refused; `--prefix` override (2-5 uppercase alphanumerics).
- Project-derived issue UIDs: 3-letter acronym of project name (`my-cool-app` → `MCA-001`) via `{{UID_PREFIX}}` in every template; scaffolder seeds `<PREFIX>-001-project-bootstrap.md`.

### Changed

- De-branded: no proper-noun lineage in generated output, README, or CHANGELOG history. Architecture kept, attributions removed.
- npm bin (`npx agent-init --global/--project/--here/--agent/--dry-run`) + hardened scaffolder (backup, placeholder fill, `<PREFIX>-001` seed, NAVIGATION verify).
- Full project template: ideas/design/CONTRIBUTING/PR+issue templates/rules template/plans+audits keeps.
- Three-agent commands: `.opencode/commands/{init,roadmap,design,log}`, `.claude/commands/` mirror, `docs/AGENTS-CODEX.md`.
- Installers cover opencode+claude+codex globals with `*.bak-<ts>` + `--WhatIf`/`--whatif` dry-run.

## [0.1.0] - 2026-09-18

- Initial extraction: AGENTS/AGENTRULES/NAVIGATION/issues/logs/roadmap + global rules + /init override.
