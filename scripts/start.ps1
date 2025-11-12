$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = (Split-Path -Parent $scriptDir)

function Start-Panel {
  param(
    [string]$Title,
    [string]$Command
  )
  $psCommand = "Set-Location `"$root`"; $Command"
  Start-Process powershell -ArgumentList '-NoExit',"-Command",$psCommand -WindowStyle Normal -Verb RunAs:$false | Out-Null
}

function Start-PanelNoAdmin {
  param(
    [string]$Title,
    [string]$Command
  )
  $psCommand = "Set-Location `"$root`"; $Command"
  Start-Process powershell -ArgumentList '-NoExit',"-Command",$psCommand -WindowStyle Normal | Out-Null
}

if ($IsWindows -ne $true) {
  Write-Host "[start] Non-Windows environment detected. Running npm run dev inline."
  Set-Location $root
  npm run dev
  exit 0
}

Start-PanelNoAdmin "Web" "cd apps/web; npm run dev"
Start-PanelNoAdmin "Expo" "cd apps/mobile; npx expo start"

if (Test-Path "$root/apps/backend") {
  Start-PanelNoAdmin "Backend" "cd apps/backend; npm run dev"
} else {
  Write-Warning "[start] apps/backend no existe todavía. Actualiza scripts/start.ps1 cuando haya un backend."
}

Write-Host "[start] Launch commands dispatched. Revisa las ventanas de PowerShell abiertas."
