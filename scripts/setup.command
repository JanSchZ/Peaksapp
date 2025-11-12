#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

NODE_VERSION_REQUIRED="20.10.0"
CURRENT_NODE="$(node -v | sed 's/v//')"

version_gte() {
  printf '%s\n%s' "$2" "$1" | sort -V | head -n1 | grep -qx "$2"
}

if ! version_gte "$CURRENT_NODE" "$NODE_VERSION_REQUIRED"; then
  echo "[setup] Node $NODE_VERSION_REQUIRED or newer is required (found $CURRENT_NODE)." >&2
  exit 1
fi

command -v npm >/dev/null 2>&1 || { echo "[setup] npm is required." >&2; exit 1; }
command -v npx >/dev/null 2>&1 || { echo "[setup] npx (npm >= 5.2) is required." >&2; exit 1; }

echo "[setup] Installing workspace deps..."
npm install

echo "[setup] Checking Expo workspace dependencies..."
# expo doctor command renamed to expo-doctor. Skip dependency validation because React/Web already shares the root tree.
(cd apps/mobile && npx expo-doctor . --skip-dependency-validation || true)

echo "[setup] Done. Use scripts/start.command to launch web+mobile."
