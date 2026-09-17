#Requires -Version 5.1
# agent-init one-click installer (Windows). Idempotent. Backs up before overwrite.
# Usage:
#   irm https://raw.githubusercontent.com/vaibhxvvy/agent-init/main/install.ps1 | iex
#   & .\install.ps1 [-Repo <path>] [-Npm] [-WhatIf]
param([string]$Repo = "", [switch]$Npm, [switch]$WhatIf)
$ErrorActionPreference = "Stop"
if (-not $Repo) { $Repo = Split-Path -Parent $MyInvocation.MyCommand.Path; if (-not $Repo) { $Repo = "C:\Users\vaibh\Desktop\agent-init" } }
$ts = Get-Date -Format "yyyyMMdd-HHmmss"
function Backup([string]$p) { if (Test-Path -LiteralPath $p) { $b = "$p.bak-$ts"; if (-not $WhatIf) { Copy-Item -LiteralPath $p -Destination $b -Force }; Write-Host "backup: $p -> $b" } }
function Install-File([string]$src, [string]$dst) {
  if (-not (Test-Path -LiteralPath $src)) { Write-Host "skip (missing in package): $src"; return }
  Write-Host "installed: $dst"
  if (-not $WhatIf) { New-Item -ItemType Directory -Force -Path (Split-Path $dst) | Out-Null; Copy-Item -LiteralPath $src -Destination $dst -Force }
}
if ($Npm) { npm i -g agent-init; agent-init --global; exit $LASTEXITCODE }
$files = @(
  @("templates\global\AGENTS.md", (Join-Path $HOME ".config\opencode\AGENTS.md")),
  @("templates\project\.opencode\commands\init.md", (Join-Path $HOME ".config\opencode\commands\init.md")),
  @("templates\project\.opencode\commands\roadmap.md", (Join-Path $HOME ".config\opencode\commands\roadmap.md")),
  @("templates\project\.opencode\commands\design.md", (Join-Path $HOME ".config\opencode\commands\design.md")),
  @("templates\project\.opencode\commands\log.md", (Join-Path $HOME ".config\opencode\commands\log.md")),
  @("templates\global\AGENTS.md", (Join-Path $HOME ".claude\CLAUDE.md")),
  @("templates\project\.claude\commands\init.md", (Join-Path $HOME ".claude\commands\init.md")),
  @("templates\project\.claude\commands\roadmap.md", (Join-Path $HOME ".claude\commands\roadmap.md")),
  @("templates\project\.claude\commands\design.md", (Join-Path $HOME ".claude\commands\design.md")),
  @("templates\project\.claude\commands\log.md", (Join-Path $HOME ".claude\commands\log.md"))
)
foreach ($f in $files) { Backup $f[1] }
foreach ($f in $files) { Install-File (Join-Path $Repo $f[0]) $f[1] }
Write-Host "`nagent-init installed (opencode + claude + codex via AGENTS.md)."
Write-Host "Try: cd <your-project>; npx agent-init --project . --name <name>; opencode ; then /init"
if ($WhatIf) { Write-Host "(WhatIf - no writes made)" }
