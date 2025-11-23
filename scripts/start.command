#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ROOT_DIR_ESCAPED=${ROOT_DIR// /\\ }

run_in_terminal() {
  local title="$1"
  local command="$2"
  /usr/bin/osascript <<EOF
tell application "Terminal"
  activate
  set newTab to do script "cd $ROOT_DIR_ESCAPED && printf '\\n[$title] starting...\\n' && $command ; exec bash"
  delay 0.2
  try
    set custom title of newTab to "$title"
  end try
end tell
EOF
}

if [[ "${OSTYPE:-}" != darwin* ]]; then
  echo "[start] Non-macOS environment detected. Running turbo dev inline."
  cd "$ROOT_DIR"
  npm run dev
  exit 0
fi

run_in_terminal "Web" "npm run dev --workspace=@peaks/web"
run_in_terminal "Expo" "npm run start --workspace=@peaks/mobile"

BACKEND_SCRIPT="cd apps/backend && npm run dev"
if [[ ! -d "$ROOT_DIR/apps/backend" ]]; then
  BACKEND_SCRIPT="printf 'No backend service configured todavía. Actualizá scripts/start.command cuando exista.\\n'" 
fi
run_in_terminal "Backend" "$BACKEND_SCRIPT"

echo "[start] Launch commands dispatched. Revisa las ventanas de Terminal abiertas."
