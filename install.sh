#!/usr/bin/env bash
# agent-init one-click installer (macOS/Linux). Idempotent, backs up before overwrite.
# Usage: curl -fsSL https://raw.githubusercontent.com/vaibhxvvy/agent-init/main/install.sh | bash
#        bash install.sh [repo-dir] [--whatif]
set -euo pipefail
REPO="${1:-$(cd "$(dirname "$0")" && pwd)}"
WHATIF="${2:-}"
TS="$(date +%Y%m%d-%H%M%S)"
backup() { [ -e "$1" ] && echo "backup: $1 -> $1.bak-$TS" && [ "$WHATIF" != "--whatif" ] && cp "$1" "$1.bak-$TS"; true; }
install_file() { [ -f "$1" ] || { echo "skip (missing): $1"; return; }; echo "installed: $2"; [ "$WHATIF" != "--whatif" ] && { mkdir -p "$(dirname "$2")"; cp "$1" "$2"; }; true; }
pairs=(
  "templates/global/AGENTS.md|$HOME/.config/opencode/AGENTS.md"
  "templates/project/.opencode/commands/init.md|$HOME/.config/opencode/commands/init.md"
  "templates/project/.opencode/commands/roadmap.md|$HOME/.config/opencode/commands/roadmap.md"
  "templates/project/.opencode/commands/design.md|$HOME/.config/opencode/commands/design.md"
  "templates/project/.opencode/commands/log.md|$HOME/.config/opencode/commands/log.md"
  "templates/global/AGENTS.md|$HOME/.claude/CLAUDE.md"
  "templates/project/.claude/commands/init.md|$HOME/.claude/commands/init.md"
  "templates/project/.claude/commands/roadmap.md|$HOME/.claude/commands/roadmap.md"
  "templates/project/.claude/commands/design.md|$HOME/.claude/commands/design.md"
  "templates/project/.claude/commands/log.md|$HOME/.claude/commands/log.md"
)
for p in "${pairs[@]}"; do backup "${p#*|}"; done
for p in "${pairs[@]}"; do install_file "$REPO/${p%%|*}" "${p#*|}"; done
echo "agent-init installed (opencode + claude + codex via AGENTS.md)."
