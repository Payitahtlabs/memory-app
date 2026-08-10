#!/bin/bash
# Blockiert npm install – Paketinstallation macht Mustafa selbst (Lernregel).
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command // ""')
if echo "$cmd" | grep -qE '(^|[;&|[:space:]])npm[[:space:]]+(install|i|ci|add)([[:space:]]|$)'; then
  echo "Blockiert: npm install/i/ci/add führt Mustafa manuell aus." >&2
  exit 2
fi
exit 0
