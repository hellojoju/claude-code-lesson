#!/bin/bash
# auto-format.sh - Multi-language code formatter
# Hook: PostToolUse (Write|Edit)
# Receives JSON input via stdin
#
# Features:
# - Detects prettier, black, gofmt, rustfmt automatically
# - Logs formatted files to stderr
# - Handles missing formatters gracefully
# - Config detection for project preferences

set -euo pipefail

# Parse JSON input
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Skip if not Write/Edit
if [[ "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "Edit" ]]; then
  exit 0
fi

# Skip if no file path
[[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]] && exit 0

# Log function
log() {
  echo "[Hook:format] $1" >&2
}

# Check for formatter config
has_prettier_config() {
  [[ -f ".prettierrc" || -f ".prettierrc.json" || -f ".prettierrc.yaml" || -f ".prettierrc.js" || -f "prettier.config.js" ]]
}

has_black_config() {
  [[ -f "pyproject.toml" ]] && grep -q "black" pyproject.toml 2>/dev/null
}

has_rustfmt_config() {
  [[ -f ".rustfmt.toml" || -f "rustfmt.toml" ]]
}

# Format based on file extension
format_file() {
  local ext="${FILE_PATH##*.}"
  local dir=$(dirname "$FILE_PATH")

  case "$ext" in
    js|jsx|ts|tsx)
      if command -v prettier &>/dev/null; then
        if prettier --write "$FILE_PATH" 2>/dev/null; then
          log "Formatted (prettier): $FILE_PATH"
        else
          log "Warning: prettier failed on $FILE_PATH"
        fi
      else
        log "Skipping: prettier not available"
      fi
      ;;
    json|md|yaml|yml|css|scss|html)
      if command -v prettier &>/dev/null; then
        prettier --write "$FILE_PATH" 2>/dev/null && log "Formatted (prettier): $FILE_PATH"
      fi
      ;;
    py)
      if command -v black &>/dev/null; then
        if black "$FILE_PATH" 2>/dev/null; then
          log "Formatted (black): $FILE_PATH"
        else
          log "Warning: black failed on $FILE_PATH"
        fi
      elif command -v autopep8 &>/dev/null; then
        autopep8 --in-place "$FILE_PATH" && log "Formatted (autopep8): $FILE_PATH"
      else
        log "Skipping: no Python formatter available"
      fi
      ;;
    go)
      if command -v gofmt &>/dev/null; then
        gofmt -w "$FILE_PATH" && log "Formatted (gofmt): $FILE_PATH"
      else
        log "Skipping: gofmt not available"
      fi
      ;;
    rs)
      if command -v rustfmt &>/dev/null; then
        if rustfmt "$FILE_PATH" 2>/dev/null; then
          log "Formatted (rustfmt): $FILE_PATH"
        else
          log "Warning: rustfmt failed on $FILE_PATH"
        fi
      else
        log "Skipping: rustfmt not available"
      fi
      ;;
    java)
      if command -v google-java-format &>/dev/null; then
        google-java-format -i "$FILE_PATH" && log "Formatted (google-java-format): $FILE_PATH"
      else
        log "Skipping: google-java-format not available"
      fi
      ;;
    c|cpp|cc|cxx|h|hpp)
      if command -v clang-format &>/dev/null; then
        clang-format -i "$FILE_PATH" && log "Formatted (clang-format): $FILE_PATH"
      else
        log "Skipping: clang-format not available"
      fi
      ;;
    *)
      # Unknown extension, skip silently
      ;;
  esac
}

# Run formatter
format_file

exit 0