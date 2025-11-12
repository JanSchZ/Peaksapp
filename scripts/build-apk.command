#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/apps/mobile"

if ! command -v npx >/dev/null 2>&1; then
  echo "[build-apk] npx is required." >&2
  exit 1
fi

echo "[build-apk] Ensuring dependencies are installed..."
cd "$ROOT_DIR"
npm install >/dev/null 2>&1 || true

cd "$APP_DIR"

echo "[build-apk] Running Expo preflight..."
npx expo doctor --fix-dependencies || true

if ! command -v eas >/dev/null 2>&1; then
  EAS_BIN="npx eas-cli"
else
  EAS_BIN="eas"
fi

echo "[build-apk] Building Android APK locally (requires Android SDK + JDK installed)..."
$EAS_BIN build --platform android --profile apk --local
