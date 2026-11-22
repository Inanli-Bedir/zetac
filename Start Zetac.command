#!/bin/bash
# Double-click to start the Zetac website locally (Docker dev server with hot reload)
# and open it in your browser. Safe to run any time, even if it is already running.

URL="http://localhost:5173"
ENGINE_TIMEOUT=180   # seconds to wait for Docker Desktop's engine
SITE_TIMEOUT=180     # seconds to wait for the website to respond

# Double-clicked scripts don't get your shell's PATH; add Docker's usual locations.
export PATH="$HOME/.docker/bin:/Applications/Docker.app/Contents/Resources/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"

fail() {
  echo
  echo "❌  $1"
  [ -n "$2" ] && echo "    $2"
  echo
  read -r -p "Press Return to close this window..." _
  exit 1
}

# Find the repo from this script's own location, not the terminal's directory.
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)" || fail "Could not locate the project folder."
cd "$REPO" || fail "Could not open $REPO"
[ -f compose.yaml ] || fail "compose.yaml not found in $REPO" "Keep this launcher inside the zetac-website folder."

echo "Zetac website — $REPO"
echo

case "$REPO" in
  "$HOME/Desktop"*|"$HOME/Documents"*|"$HOME/Library/Mobile Documents"*)
    echo "⚠️   This folder may be synced by iCloud. If iCloud offloads files, Docker"
    echo "    fails with 'EIO: i/o error'. Keep the project in ~/Developer instead."
    echo ;;
esac

command -v docker >/dev/null 2>&1 || fail "Docker CLI not found." "Install Docker Desktop from https://www.docker.com/products/docker-desktop/"

# 1. Make sure Docker Desktop is running and its engine is ready.
if ! docker info >/dev/null 2>&1; then
  echo "🐳  Starting Docker Desktop..."
  open -a Docker 2>/dev/null || fail "Could not open Docker Desktop." "Is it installed in /Applications?"
  printf "    Waiting for the Docker engine"
  waited=0
  until docker info >/dev/null 2>&1; do
    [ "$waited" -ge "$ENGINE_TIMEOUT" ] && { echo; fail "Docker engine did not start within ${ENGINE_TIMEOUT}s." "Open Docker Desktop, check for errors or pending updates, then run this again."; }
    printf "."; sleep 2; waited=$((waited + 2))
  done
  echo " ready."
else
  echo "🐳  Docker engine is running."
fi

# 2. Start the Compose stack (reuses the existing container; builds the image only if missing).
echo "🚀  Starting the website container..."
if ! docker compose up -d --wait --wait-timeout "$SITE_TIMEOUT"; then
  echo
  echo "---- Last log lines ----"
  docker compose logs --tail 30
  fail "The website container failed to start or is unhealthy." "See the log above. Full logs: docker compose logs -f (run in $REPO)"
fi

# 3. Wait until the site actually answers from the Mac side (port mapping included).
printf "🌐  Waiting for %s" "$URL"
waited=0
until curl -fsS -o /dev/null --max-time 3 "$URL/"; do
  [ "$waited" -ge 60 ] && { echo; fail "$URL is not responding." "Is something else using port 5173? Check: lsof -i :5173"; }
  printf "."; sleep 2; waited=$((waited + 2))
done
echo " up."

# 4. Open it in the default browser.
open "$URL"
echo
echo "✅  Zetac is running at $URL"
echo "    Edits to the project files reload in the browser automatically."
echo "    Stop it in Docker Desktop (Containers → zetac-website-dev → ■) or with: docker compose stop"
echo "    You can close this window."
