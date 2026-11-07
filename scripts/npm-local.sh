#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
ASTRO_TELEMETRY_DISABLED=1
export ASTRO_TELEMETRY_DISABLED
version=$(cat .node-version)
local_bin="$PWD/.tools/node-v${version}-darwin-arm64/bin"
if [ -x "$local_bin/node" ]; then
  PATH="$local_bin:$PATH"
  export PATH
fi
command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1 || {
  echo 'Run ./scripts/setup-mac.sh first, or install Node from .node-version.' >&2
  exit 1
}
node -e 'if (Number(process.versions.node.split(".")[0]) !== 24) { console.error("Node 24 is required to match CI and Vercel."); process.exit(1); }'
exec npm "$@"
