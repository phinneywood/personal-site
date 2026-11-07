#!/bin/sh
# Install the official pinned Node runtime inside this checkout, then locked deps.
set -eu
cd "$(dirname "$0")/.."
version=$(cat .node-version)
[ "$(uname -s)" = Darwin ] && [ "$(uname -m)" = arm64 ] || {
  echo 'This bootstrap supports Apple Silicon macOS. Elsewhere install the version in .node-version and run npm ci.' >&2
  exit 1
}
[ "$version" = 24.22.2 ] || { echo 'Update the pinned checksum before changing Node.' >&2; exit 1; }
name="node-v${version}-darwin-arm64"
expected=aa9549349e47dffaa42dcf95d6e06ade8c4bdafc980979883b88767670df385a
if [ ! -x ".tools/$name/bin/node" ]; then
  mkdir -p .tools
  temporary=$(mktemp -d .tools/download.XXXXXX)
  trap 'rm -rf "$temporary"' EXIT HUP INT TERM
  curl --fail --show-error --location --proto '=https' --tlsv1.2 --connect-timeout 15 --max-time 180 \
    "https://nodejs.org/dist/v${version}/${name}.tar.gz" -o "$temporary/node.tar.gz"
  actual=$(shasum -a 256 "$temporary/node.tar.gz" | cut -d ' ' -f 1)
  [ "$actual" = "$expected" ] || { echo 'Node checksum mismatch; nothing installed.' >&2; exit 1; }
  tar -xzf "$temporary/node.tar.gz" -C "$temporary"
  mv "$temporary/$name" ".tools/$name"
  rm -rf "$temporary"
  trap - EXIT HUP INT TERM
fi
exec ./scripts/npm-local.sh ci
