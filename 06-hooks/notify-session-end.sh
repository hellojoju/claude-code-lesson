#!/bin/bash
# notify-session-end.sh - Send notifications when session ends
# Hook: SessionEnd or Stop
# Receives JSON input via stdin
#
# Features:
# - Desktop notifications (macOS/Linux)
# - Slack webhook support
# - Email notifications
# - Session summary with transcript stats

set -euo pipefail

INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty')
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')
REASON=$(echo "$INPUT" | jq -r '.reason // empty')
EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // empty')
TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // empty')

log() {
  echo "[Hook:notify] $1" >&2
}

# Get project name
PROJECT_NAME=$(basename "$CWD" 2>/dev/null || echo "unknown")

# Desktop notification (macOS/Linux)
desktop_notify() {
  local title="Claude Code Session"
  local message=""

  if [[ "$EVENT" == "SessionEnd" ]]; then
    message="Session ended in ${PROJECT_NAME}"
  else
    message="Session stopping in ${PROJECT_NAME}"
  fi

  # macOS
  if [[ "$(uname)" == "Darwin" ]]; then
    osascript -e 'display notification "'"$message"'" with title "'"$title"'" sound name "Submarine"' 2>/dev/null || true
    log "Desktop notification sent (macOS)"
  # Linux with notify-send
  elif [[ "$(uname)" == "Linux" ]]; then
    if command -v notify-send &>/dev/null; then
      notify-send "$title" "$message" --icon=dialog-information 2>/dev/null || true
      log "Desktop notification sent (Linux)"
    fi
  fi
}

# Slack notification via webhook
slack_notify() {
  local webhook="${SLACK_WEBHOOK_URL:-}"
  [[ -z "$webhook" ]] && return

  local color="good"
  local status="completed"

  if [[ "$REASON" == "error" || "$REASON" == "failure" ]]; then
    color="danger"
    status="ended with error"
  fi

  # Build payload
  local payload=$(jq -n \
    --arg project "$PROJECT_NAME" \
    --arg reason "$REASON" \
    --arg status "$status" \
    --arg session "$SESSION_ID" \
    '{
      text: "Claude Code session ended",
      attachments: [{
        color: "good",
        fields: [
          {title: "Project", value: $project, short: true},
          {title: "Status", value: $status, short: true},
          {title: "Reason", value: $reason, short: false}
        ]
      }]
    }')

  curl -X POST "$webhook" \
    -H 'Content-Type: application/json' \
    -d "$payload" \
    --silent --max-time 10 2>/dev/null || true

  log "Slack notification sent"
}

# Discord notification via webhook
discord_notify() {
  local webhook="${DISCORD_WEBHOOK_URL:-}"
  [[ -z "$webhook" ]] && return

  local payload=$(jq -n \
    --arg project "$PROJECT_NAME" \
    --arg reason "$REASON" \
    '{
      content: "Claude Code session ended in **'"$project"'**",
      embeds: [{
        title: "Session Summary",
        color: 3066993,
        fields: [
          {name: "Project", value: $project, inline: true},
          {name: "Reason", value: $reason, inline: true}
        ]
      }]
    }')

  curl -X POST "$webhook" \
    -H 'Content-Type: application/json' \
    -d "$payload" \
    --silent --max-time 10 2>/dev/null || true

  log "Discord notification sent"
}

# Email notification
email_notify() {
  local to="${SESSION_EMAIL:-}"
  [[ -z "$to" ]] && return

  local subject="Claude Code Session: ${PROJECT_NAME}"
  local body="Session ended in ${CWD}\nReason: ${REASON}\nSession ID: ${SESSION_ID}"

  if command -v mail &>/dev/null; then
    echo "$body" | mail -s "$subject" "$to" 2>/dev/null || true
    log "Email notification sent"
  fi
}

# Generate session summary from transcript
generate_summary() {
  if [[ -n "$TRANSCRIPT_PATH" && -f "$TRANSCRIPT_PATH" ]]; then
    local lines=$(wc -l < "$TRANSCRIPT_PATH" 2>/dev/null || echo "0")
    local messages=$(grep -c '"message"' "$TRANSCRIPT_PATH" 2>/dev/null || echo "0")

    log "Session summary:"
    log "  - Transcript lines: $lines"
    log "  - Messages: $messages"

    # Count tool uses if jq available
    if command -v jq &>/dev/null; then
      local tool_uses=$(jq -s '[.[] | select(.tool_use)] | length' "$TRANSCRIPT_PATH" 2>/dev/null || echo "0")
      log "  - Tool uses: $tool_uses"
    fi
  fi
}

# Write session log file
write_session_log() {
  local log_dir="${CWD}/.claude/logs"
  local log_file="${log_dir}/session-${SESSION_ID}.log"

  mkdir -p "$log_dir" 2>/dev/null || return

  {
    echo "=== Session Log ==="
    echo "Timestamp: $(date -Iseconds)"
    echo "Session ID: $SESSION_ID"
    echo "Project: $PROJECT_NAME"
    echo "Working Directory: $CWD"
    echo "End Reason: $REASON"
    echo "Event: $EVENT"
    generate_summary
    echo "=== End ==="
  } >> "$log_file" 2>/dev/null || true

  log "Session log written to: $log_file"
}

# Main execution
log "Session ending: $REASON"
log "Project: $PROJECT_NAME"

generate_summary
desktop_notify
slack_notify
discord_notify
email_notify
write_session_log

exit 0