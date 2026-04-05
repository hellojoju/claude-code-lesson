#!/bin/bash
# test-runner.sh - Run tests related to modified files
# Hook: PostToolUse (Write|Edit)
# Receives JSON input via stdin
#
# Features:
# - Detects test framework (pytest, jest, go test)
# - Maps source files to test files
# - Runs only relevant tests (fast feedback)
# - Reports pass/fail with timing

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Skip if not Write/Edit
if [[ "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "Edit" ]]; then
  exit 0
fi

[[ -z "$FILE_PATH" ]] && exit 0

log() {
  echo "[Hook:test] $1" >&2
}

# Skip test files themselves (avoid recursion)
is_test_file() {
  local file="$1"
  [[ "$file" == *"_test.py" || "$file" == *"test_.py" || \
     "$file" == *".test.ts" || "$file" == *".test.js" || \
     "$file" == *"_test.go" || "$file" == *"Test.java" || \
     "$file" == *"spec.ts" || "$file" == *"spec.js" ]]
}

if is_test_file "$FILE_PATH"; then
  log "Skipping test file: $FILE_PATH"
  exit 0
fi

# Find test file for source file
find_test_file() {
  local src="$1"
  local base=$(basename "$src" | sed 's/\.[^.]*$//')
  local dir=$(dirname "$src")

  # Common test file patterns
  local patterns=(
    "test_${base}.py"
    "${base}_test.py"
    "${base}.test.ts"
    "${base}.test.js"
    "${base}.spec.ts"
    "${base}.spec.js"
    "${base}_test.go"
    "${base}Test.java"
    "${base}Test.kt"
  )

  # Check in test directories
  local test_dirs=("tests" "test" "__tests__" "src/__tests__" "test/unit" "test/integration")

  for test_dir in "${test_dirs[@]}"; do
    for pattern in "${patterns[@]}"; do
      local candidate="${test_dir}/${pattern}"
      if [[ -f "$candidate" ]]; then
        echo "$candidate"
        return
      fi
    done
  done

  # Check same directory
  for pattern in "${patterns[@]}"; do
    if [[ -f "${dir}/${pattern}" ]]; then
      echo "${dir}/${pattern}"
      return
    fi
  done

  # Return empty if no test found
  echo ""
}

# Run tests based on framework
run_tests() {
  local test_file="$1"
  local start_time=$(date +%s)
  local result="unknown"

  if [[ "$test_file" == *.py ]]; then
    if command -v pytest &>/dev/null; then
      log "Running pytest on $test_file"
      if pytest "$test_file" -v --tb=short --no-header 2>&1 | tail -10 >&2; then
        result="passed"
      else
        result="failed"
      fi
    elif command -v python &>/dev/null && [[ -f "$test_file" ]]; then
      log "Running python unittest on $test_file"
      if python -m unittest "$test_file" -v 2>&1 | tail -10 >&2; then
        result="passed"
      else
        result="failed"
      fi
    fi
  elif [[ "$test_file" == *.ts ]]; then
    if command -v jest &>/dev/null; then
      log "Running jest on $test_file"
      if jest "$test_file" --passWithNoTests --no-coverage 2>&1 | tail -10 >&2; then
        result="passed"
      else
        result="failed"
      fi
    elif command -v vitest &>/dev/null; then
      log "Running vitest on $test_file"
      if vitest run "$test_file" --reporter=verbose 2>&1 | tail -10 >&2; then
        result="passed"
      else
        result="failed"
      fi
    fi
  elif [[ "$test_file" == *.js ]]; then
    if command -v jest &>/dev/null; then
      log "Running jest on $test_file"
      if jest "$test_file" --passWithNoTests 2>&1 | tail -10 >&2; then
        result="passed"
      else
        result="failed"
      fi
    fi
  elif [[ "$test_file" == *.go ]]; then
    log "Running go test"
    local test_dir=$(dirname "$test_file")
    if go test -v "$test_dir" 2>&1 | tail -10 >&2; then
      result="passed"
    else
      result="failed"
    fi
  elif [[ "$test_file" == *.java ]]; then
    if command -v mvn &>/dev/null; then
      log "Running Maven test"
      if mvn test -Dtest=$(basename "$test_file" .java) 2>&1 | tail -10 >&2; then
        result="passed"
      else
        result="failed"
      fi
    fi
  fi

  local end_time=$(date +%s)
  local duration=$((end_time - start_time))

  log "Test result: $result (${duration}s)"
}

# Main execution
log "Checking tests for: $FILE_PATH"

TEST_FILE=$(find_test_file "$FILE_PATH")

if [[ -n "$TEST_FILE" ]]; then
  log "Found test file: $TEST_FILE"
  run_tests "$TEST_FILE"
else
  log "No test file found for $FILE_PATH"
  # Optionally output suggestion
  jq -n --arg file "$FILE_PATH" \
    '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: "No tests found for \($file). Consider adding tests."}}'
fi

exit 0