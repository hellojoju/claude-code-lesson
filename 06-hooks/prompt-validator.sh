#!/bin/bash
# prompt-validator.sh - Validate bash commands and user prompts
# Hook: PreToolUse (Bash) or UserPromptSubmit
# Receives JSON input via stdin
#
# Features:
# - Blocks destructive commands (rm -rf, force push, etc.)
# - Warns on risky operations
# - Safe mode detection
# - Customizable block/warn lists

set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // empty')

log() {
  echo "[Hook:validator] $1" >&2
}

# Get command or prompt based on event
get_target() {
  if [[ "$EVENT" == "PreToolUse" ]]; then
    echo "$INPUT" | jq -r '.tool_input.command // empty'
  elif [[ "$EVENT" == "UserPromptSubmit" ]]; then
    echo "$INPUT" | jq -r '.user_prompt // .prompt // empty'
  else
    echo ""
  fi
}

TARGET=$(get_target)
[[ -z "$TARGET" ]] && exit 0

# Patterns that BLOCK execution (return decision:block)
# These are dangerous operations that should never run without explicit user awareness
BLOCKED_PATTERNS=(
  'rm -rf /'
  'rm -rf ~'
  'rm -rf /*'
  'rm -rf /home'
  'rm -rf /Users'
  'sudo rm -rf'
  'sudo rm'
  'dd if=/dev/zero'
  'dd if=/dev/urandom'
  ':(){ :|:& };:'        # Fork bomb
  'chmod -R 777 /'
  'chown -R'
  'mkfs'
  '> /dev/sda'
  'git push --force main'
  'git push --force master'
  'git push --force origin main'
  'git push --force origin master'
  'git push -f main'
  'git push -f master'
  'DROP DATABASE'
  'TRUNCATE TABLE'
  'DELETE FROM'
  'kubectl delete namespace'
  'kubectl delete all --all'
  'kubectl delete pod --all'
  'terraform destroy'
  'helm uninstall'
  'docker system prune -a --volumes'
  'npm publish --access public'
  'yarn publish'
)

# Patterns that WARN but allow (Claude sees warning in stderr)
WARN_PATTERNS=(
  'git reset --hard'
  'git clean -fd'
  'npm publish'
  'docker system prune'
  'kubectl delete'
  'helm delete'
  'pkill'
  'kill -9'
  'truncate'
  'shred'
)

# Safe mode: extra cautious patterns
SAFE_MODE_PATTERNS=(
  'rm -rf'
  'git push --force'
  'npm install -g'
  'curl | bash'
  'curl | sh'
  'wget | bash'
  'wget | sh'
)

# Check if safe mode is enabled
is_safe_mode() {
  [[ "${SAFE_MODE:-}" == "true" || "${CLAUDE_SAFE_MODE:-}" == "true" ]]
}

# Check blocked patterns - these always block
for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if [[ "$TARGET" == *"$pattern"* ]]; then
    log "BLOCKED: Dangerous pattern detected"
    log "Pattern: $pattern"
    log "Target: $TARGET"

    # Return JSON block decision
    jq -n --arg reason "Blocked dangerous operation: $pattern" \
      '{decision: "block", reason: $reason}'
    exit 0
  fi
done

# In safe mode, also block extra patterns
if is_safe_mode; then
  for pattern in "${SAFE_MODE_PATTERNS[@]}"; do
    if [[ "$TARGET" == *"$pattern"* ]]; then
      log "BLOCKED (safe mode): $pattern"

      jq -n --arg reason "Blocked in safe mode: $pattern" \
        '{decision: "block", reason: $reason}'
      exit 0
    fi
  done
fi

# Check warn patterns - log warning but continue
for pattern in "${WARN_PATTERNS[@]}"; do
  if [[ "$TARGET" == *"$pattern"* ]]; then
    log "WARNING: Risky operation detected: $pattern"
    log "Target: $TARGET"
    # Continue execution, Claude sees warning in stderr
  fi
done

# Log passed validation
log "Validation passed"

exit 0