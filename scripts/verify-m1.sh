#!/bin/bash
# M1 Milestone Verification Script
# Usage: ./scripts/verify-m1.sh

set -e

PASS=0
FAIL=0

echo "=== M1 Milestone Verification ==="
echo ""

# T-001: quickstart.sh
echo "[T-001] Checking quickstart.sh..."
if test -x scripts/quickstart.sh && bash -n scripts/quickstart.sh && test $(wc -l < scripts/quickstart.sh) -ge 80; then
  echo "  ✅ PASS"
  ((PASS++))
else
  echo "  ❌ FAIL"
  ((FAIL++))
fi

# T-002: QUICKSTART.md
echo "[T-002] Checking QUICKSTART.md..."
if test -f QUICKSTART.md && test $(wc -l < QUICKSTART.md) -ge 100 && grep -q "## " QUICKSTART.md; then
  echo "  ✅ PASS"
  ((PASS++))
else
  echo "  ❌ FAIL"
  ((FAIL++))
fi

# T-003: 难度徽章
echo "[T-003] Checking difficulty badges..."
BADGE_COUNT=$(grep -l "🟢\|🟡\|🔴" 01-slash-commands/README.md 02-memory/README.md 03-skills/README.md 04-subagents/README.md 05-mcp/README.md 06-hooks/README.md 07-plugins/README.md 08-checkpoints/README.md 09-advanced-features/README.md 10-cli/README.md 2>/dev/null | wc -l | tr -d ' ')
if test "$BADGE_COUNT" -eq 10; then
  echo "  ✅ PASS ($BADGE_COUNT/10 modules)"
  ((PASS++))
else
  echo "  ❌ FAIL ($BADGE_COUNT/10 modules)"
  ((FAIL++))
fi

# T-004: WHATS-NEW.md
echo "[T-004] Checking WHATS-NEW.md..."
if test -f WHATS-NEW.md && grep -q "## CC v" WHATS-NEW.md; then
  echo "  ✅ PASS"
  ((PASS++))
else
  echo "  ❌ FAIL"
  ((FAIL++))
fi

# T-005: 版本徽章
echo "[T-005] Checking version badges..."
VER_COUNT=$(grep -l "Verified against Claude Code" 01-slash-commands/README.md 02-memory/README.md 03-skills/README.md 04-subagents/README.md 05-mcp/README.md 06-hooks/README.md 07-plugins/README.md 08-checkpoints/README.md 09-advanced-features/README.md 10-cli/README.md 2>/dev/null | wc -l | tr -d ' ')
if test "$VER_COUNT" -eq 10; then
  echo "  ✅ PASS ($VER_COUNT/10 modules)"
  ((PASS++))
else
  echo "  ❌ FAIL ($VER_COUNT/10 modules)"
  ((FAIL++))
fi

# T-006: staleness-check.yml
echo "[T-006] Checking staleness-check.yml..."
if test -f .github/workflows/staleness-check.yml && grep -q "schedule:" .github/workflows/staleness-check.yml; then
  echo "  ✅ PASS"
  ((PASS++))
else
  echo "  ❌ FAIL"
  ((FAIL++))
fi

# T-007: CLAUDE.md
echo "[T-007] Checking CLAUDE.md..."
if test -f CLAUDE.md && test $(wc -l < CLAUDE.md) -ge 150 && grep -q "## Module Structure\|## 模块结构" CLAUDE.md; then
  echo "  ✅ PASS"
  ((PASS++))
else
  echo "  ❌ FAIL"
  ((FAIL++))
fi

# T-008: build-agent-index.py
echo "[T-008] Checking build-agent-index.py..."
if test -f scripts/build-agent-index.py && python3 -m py_compile scripts/build-agent-index.py 2>/dev/null; then
  echo "  ✅ PASS (syntax valid)"
  ((PASS++))
else
  echo "  ❌ FAIL"
  ((FAIL++))
fi

# T-009-T-015: checkpoints 升级
echo "[T-009-T-015] Checking 08-checkpoints upgrade..."
CP_LINES=$(wc -l < 08-checkpoints/README.md | tr -d ' ')
CP_TRYIT=$(grep -c "## Try It Now" 08-checkpoints/README.md 2>/dev/null || echo 0)
CP_MERMAID=$(grep -c '```mermaid' 08-checkpoints/README.md 2>/dev/null || echo 0)
if test "$CP_LINES" -ge 800 && test "$CP_TRYIT" -ge 2 && test "$CP_MERMAID" -ge 1; then
  echo "  ✅ PASS ($CP_LINES lines, $CP_TRYIT TryItNow, $CP_MERMAID mermaid)"
  ((PASS++))
else
  echo "  ❌ FAIL ($CP_LINES lines, $CP_TRYIT TryItNow, $CP_MERMAID mermaid)"
  ((FAIL++))
fi

# T-016-T-020: hooks 升级
echo "[T-016-T-020] Checking 06-hooks upgrade..."
HOOK_TOTAL=$(cat 06-hooks/*.sh 2>/dev/null | wc -l | tr -d ' ')
HOOK_FILES=$(ls 06-hooks/*.sh 2>/dev/null | wc -l | tr -d ' ')
HOOK_MERMAID=$(grep -c '```mermaid' 06-hooks/README.md 2>/dev/null || echo 0)
if test "$HOOK_FILES" -ge 5 && test "$HOOK_TOTAL" -ge 350 && test "$HOOK_MERMAID" -ge 1; then
  echo "  ✅ PASS ($HOOK_FILES scripts, $HOOK_TOTAL total lines, $HOOK_MERMAID mermaid)"
  ((PASS++))
else
  echo "  ❌ FAIL ($HOOK_FILES scripts, $HOOK_TOTAL total lines, $HOOK_MERMAID mermaid)"
  ((FAIL++))
fi

echo ""
echo "=== Summary ==="
echo "PASS: $PASS/10"
echo "FAIL: $FAIL/10"
echo ""

if test "$FAIL" -eq 0; then
  echo "🎉 M1 Milestone COMPLETE"
  exit 0
else
  echo "⚠️  M1 Milestone INCOMPLETE - $FAIL tasks need attention"
  exit 1
fi