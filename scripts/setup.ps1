$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $scriptDir
Set-Location $root

Write-Host "[setup] Installing workspace deps..."
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Error "npm is required in PATH"
}
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
  Write-Error "npx (npm >= 5.2) is required"
}

npm install --legacy-peer-deps

Write-Host "[setup] Fixing ajv version conflict for Expo..."
npm install ajv@^8.17.1 --save-dev --legacy-peer-deps

Write-Host "[setup] Checking Expo workspace dependencies..."
try {
  Push-Location "$root/apps/mobile"
  npx expo-doctor . --skip-dependency-validation
} catch {
  Write-Warning "expo-doctor reported issues: $($_.Exception.Message)"
} finally {
  Pop-Location
}

Write-Host "[setup] Done. Use scripts/start.ps1 to launch web + mobile."
