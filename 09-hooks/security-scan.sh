#!/bin/bash
# security-scan.sh - Security scanner for secrets and vulnerabilities
# Hook: PostToolUse (Write|Edit)
# Receives JSON input via stdin
#
# Features:
# - Regex patterns for common secrets
# - Trufflehog integration for verified secrets
# - Semgrep for vulnerability patterns
# - Generates JSON report for Claude

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // .tool_input.new_string // empty')

# Skip if not Write/Edit
if [[ "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "Edit" ]]; then
  exit 0
fi

[[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]] && exit 0

log() {
  echo "[Hook:security] $1" >&2
}

# Collect warnings in array
declare -a WARNINGS

# Regex patterns for secrets
check_secrets() {
  # Hardcoded passwords (minimum 8 chars to avoid false positives)
  if grep -qE "(password|passwd|pwd)\s*=\s*['\"][^'\"]{8,}['\"]" "$FILE_PATH" 2>/dev/null; then
    WARNINGS+=("Potential hardcoded password")
  fi

  # API keys (minimum 16 chars)
  if grep -qE "(api[_-]?key|apikey|access[_-]?token)\s*=\s*['\"][^'\"]{16,}['\"]" "$FILE_PATH" 2>/dev/null; then
    WARNINGS+=("Potential hardcoded API key")
  fi

  # AWS access keys (AKIA pattern)
  if grep -qE "AKIA[0-9A-Z]{16}" "$FILE_PATH" 2>/dev/null; then
    WARNINGS+=("AWS access key detected")
  fi

  # AWS secret keys (40 char base64-like)
  if grep -qE "[A-Za-z0-9/+=]{40}" "$FILE_PATH" 2>/dev/null; then
    # More specific check for AWS secret pattern
    if grep -qE "(aws_secret|secret_access_key|SecretAccessKey)" "$FILE_PATH" 2>/dev/null; then
      WARNINGS+=("Potential AWS secret key")
    fi
  fi

  # Private keys (PEM format)
  if grep -q "BEGIN.*PRIVATE KEY" "$FILE_PATH" 2>/dev/null; then
    WARNINGS+=("Private key detected")
  fi

  # Generic secrets (minimum 16 chars)
  if grep -qE "(secret|token|auth[_-]?token)\s*=\s*['\"][^'\"]{16,}['\"]" "$FILE_PATH" 2>/dev/null; then
    WARNINGS+=("Potential hardcoded secret")
  fi

  # Database URLs with credentials
  if grep -qE "(postgres|mysql|mongodb)://[^:]+:[^@]+@" "$FILE_PATH" 2>/dev/null; then
    WARNINGS+=("Database URL with credentials")
  fi

  # JWT secrets
  if grep -qE "(jwt[_-]?secret|JWT_SECRET)\s*=\s*['\"][^'\"]{16,}['\"]" "$FILE_PATH" 2>/dev/null; then
    WARNINGS+=("JWT secret detected")
  fi
}

# Run external scanners if available
run_external_scanners() {
  # Trufflehog - verified secrets only
  if command -v trufflehog &>/dev/null; then
    local trufflehog_output
    trufflehog_output=$(trufflehog filesystem "$FILE_PATH" --only-verified --json 2>/dev/null || true)

    if [[ -n "$trufflehog_output" ]]; then
      echo "$trufflehog_output" | jq -r '.DetectorName // empty' 2>/dev/null | while read -r detector; do
        if [[ -n "$detector" ]]; then
          WARNINGS+=("Trufflehog: $detector")
        fi
      done
    fi
  fi

  # Semgrep - vulnerability patterns
  if command -v semgrep &>/dev/null; then
    local semgrep_output
    semgrep_output=$(semgrep --config=auto "$FILE_PATH" --json --quiet 2>/dev/null || true)

    if [[ -n "$semgrep_output" ]]; then
      echo "$semgrep_output" | jq -r '.results[].check_id // empty' 2>/dev/null | while read -r check; do
        if [[ -n "$check" ]]; then
          WARNINGS+=("Semgrep: $check")
        fi
      done
    fi
  fi

  # Bandit - Python security linter
  if [[ "$FILE_PATH" == *.py ]] && command -v bandit &>/dev/null; then
    local bandit_output
    bandit_output=$(bandit "$FILE_PATH" --format json 2>/dev/null || true)

    if [[ -n "$bandit_output" ]]; then
      echo "$bandit_output" | jq -r '.results[].test_id // empty' 2>/dev/null | while read -r test; do
        if [[ -n "$test" ]]; then
          WARNINGS+=("Bandit: $test")
        fi
      done
    fi
  fi
}

# Main execution
check_secrets
run_external_scanners

# Report warnings
if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  log "Security warnings for $FILE_PATH:"
  for warning in "${WARNINGS[@]}"; do
    log "  - $warning"
  done

  # Build warning string
  local warning_str=""
  for warning in "${WARNINGS[@]}"; do
    warning_str="${warning_str}${warning}; "
  done

  # Output JSON for Claude to see
  jq -n --arg file "$FILE_PATH" --arg warnings "$warning_str" \
    '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: "Security scan found issues in \($file): \($warnings)"}}'
fi

exit 0