# Changelog

All notable changes. Format: Keep a Changelog. Never delete/overwrite a release — ship fixes as a new version.

## [Unreleased]

### Added

- npm bin (`npx agent-init --global/--project/--here/--agent/--dry-run`) + hardened scaffolder (backup, placeholder fill, INC-001 seed, NAVIGATION verify).
- Full project template: ideas/design/CONTRIBUTING/PR+issue templates/rules template/plans+audits keeps.
- Three-agent commands: `.opencode/commands/{init,roadmap,design,log}`, `.claude/commands/` mirror, `docs/AGENTS-CODEX.md`.
- Installers cover opencode+claude+codex globals with `*.bak-<ts>` + `--WhatIf`/`--whatif` dry-run.

## [0.1.0] - 2026-09-18

- Initial extraction from incruit + chopsticks: AGENTS/AGENTRULES/NAVIGATION/issues/logs/roadmap + global rules + /init override.
