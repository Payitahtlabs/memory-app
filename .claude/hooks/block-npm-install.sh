#!/bin/bash
# Blockiert npm install – Pakete werden manuell installiert (Projektregel)
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command // ""')
if echo "$cmd" | grep -qE '(^|[;&|[:space:]])npm[[:space:]]+(install|i|ci|add)([[:space:]]|$)'; then
  echo "Blockiert: npm install/i/ci/add wird manuell ausgeführt." >&2
  exit 2
fi
exit 0
