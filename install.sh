#!/usr/bin/env bash
# agent-init one-click installer (macOS/Linux). Idempotent, backs up before overwrite.
# Usage: curl -fsSL https://raw.githubusercontent.com/vaibhxvvy/agent-init/main/install.sh | bash
#        bash install.sh [repo-dir] [--whatif]
set -euo pipefail
REPO_URL="https://github.com/vaibhxvvy/agent-init"
REPO="${1:-$(cd "$(dirname "$0")" && pwd)}"
WHATIF="${2:-}"
if [ ! -f "$REPO/templates/global/AGENTS.md" ]; then
  echo "downloading: $REPO_URL"
  TMP="$(mktemp -d)/agent-init"; mkdir -p "$TMP"
  curl -fsSL "$REPO_URL/archive/refs/heads/main.tar.gz" | tar -xz -C "$TMP" --strip-components=1
  REPO="$TMP"
fi
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
  "skills/agent-init/SKILL.md|$HOME/.config/opencode/skills/agent-init/SKILL.md"
  "skills/agent-init/SKILL.md|$HOME/.claude/skills/agent-init/SKILL.md"
  "skills/agent-init/SKILL.md|$HOME/.agents/skills/agent-init/SKILL.md"
)
for p in "${pairs[@]}"; do backup "${p#*|}"; done
for p in "${pairs[@]}"; do install_file "$REPO/${p%%|*}" "${p#*|}"; done
echo "agent-init installed (opencode + claude + codex via AGENTS.md)."
