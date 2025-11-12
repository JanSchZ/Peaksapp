$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $scriptDir
$mobileDir = Join-Path $root "apps/mobile"

Set-Location $root

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Error "npm is required in PATH"
}

Write-Host "[build-apk] Ensuring dependencies are installed..."
npm install | Out-Null

Set-Location $mobileDir

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
  Write-Error "npx is required"
}

Write-Host "[build-apk] Running expo-doctor (non-blocking)..."
try {
  npx expo-doctor . --skip-dependency-validation
} catch {
  Write-Warning "expo-doctor reported issues: $($_.Exception.Message)"
}

$eas = "eas"
if (-not (Get-Command $eas -ErrorAction SilentlyContinue)) {
  $eas = "npx eas-cli"
}

Write-Host "[build-apk] Building Android APK locally (requires Android SDK + JDK)."
& $eas build --platform android --profile apk --local
