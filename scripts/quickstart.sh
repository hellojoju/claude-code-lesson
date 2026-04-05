#!/bin/bash
# Claude Code Quick Start Setup Script
# One-command setup for new Claude Code users

set -e

CLAUDE_DIR="$HOME/.claude"
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       Claude Code Quick Start Setup                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Check/Create .claude directory
echo -e "${YELLOW}[Step 1/5]${NC} Checking Claude Code configuration directory..."
if [ -d "$CLAUDE_DIR" ]; then
    echo -e "  ${GREEN}✓${NC} Found existing $CLAUDE_DIR"
else
    echo -e "  ${BLUE}→${NC} Creating $CLAUDE_DIR..."
    mkdir -p "$CLAUDE_DIR"
    echo -e "  ${GREEN}✓${NC} Created $CLAUDE_DIR"
fi

# Step 2: Copy CLAUDE.md template (idempotent)
echo -e "${YELLOW}[Step 2/5]${NC} Setting up CLAUDE.md configuration..."
TARGET_CLAUDE_MD="$CLAUDE_DIR/CLAUDE.md"
SOURCE_CLAUDE_MD="$ROOT_DIR/CLAUDE.md"

if [ -f "$TARGET_CLAUDE_MD" ]; then
    echo -e "  ${YELLOW}!${NC} $TARGET_CLAUDE_MD already exists (skipping)"
else
    if [ -f "$SOURCE_CLAUDE_MD" ]; then
        cp "$SOURCE_CLAUDE_MD" "$TARGET_CLAUDE_MD"
        echo -e "  ${GREEN}✓${NC} Copied CLAUDE.md to $TARGET_CLAUDE_MD"
    else
        echo -e "  ${YELLOW}!${NC} Source CLAUDE.md not found (skipping)"
    fi
fi

# Step 3: Copy example slash command (idempotent)
echo -e "${YELLOW}[Step 3/5]${NC} Setting up example slash commands..."
COMMANDS_DIR="$CLAUDE_DIR/commands"
mkdir -p "$COMMANDS_DIR"

# Copy commit.md command
SOURCE_COMMAND="$ROOT_DIR/01-slash-commands/commit.md"
TARGET_COMMAND="$COMMANDS_DIR/commit.md"

if [ -f "$TARGET_COMMAND" ]; then
    echo -e "  ${YELLOW}!${NC} $TARGET_COMMAND already exists (skipping)"
else
    if [ -f "$SOURCE_COMMAND" ]; then
        cp "$SOURCE_COMMAND" "$TARGET_COMMAND"
        echo -e "  ${GREEN}✓${NC} Copied /commit command to $TARGET_COMMAND"
    else
        echo -e "  ${YELLOW}!${NC} Source command not found (skipping)"
    fi
fi

# Step 4: Copy example skill (idempotent)
echo -e "${YELLOW}[Step 4/5]${NC} Setting up example skill..."
SKILLS_DIR="$CLAUDE_DIR/skills"
mkdir -p "$SKILLS_DIR"

# Copy refactor skill
SOURCE_SKILL="$ROOT_DIR/03-skills/refactor"
TARGET_SKILL="$SKILLS_DIR/refactor"

if [ -d "$TARGET_SKILL" ]; then
    echo -e "  ${YELLOW}!${NC} $TARGET_SKILL already exists (skipping)"
else
    if [ -d "$SOURCE_SKILL" ]; then
        cp -r "$SOURCE_SKILL" "$TARGET_SKILL"
        echo -e "  ${GREEN}✓${NC} Copied refactor skill to $TARGET_SKILL"
    else
        echo -e "  ${YELLOW}!${NC} Source skill not found (skipping)"
    fi
fi

# Step 5: Add agent discovery line to CLAUDE.md (if not present)
echo -e "${YELLOW}[Step 5/5]${NC} Configuring agent discovery..."
AGENT_INDEX_PATH="$ROOT_DIR/AGENT-INDEX.md"
AGENT_LINE="> Agent Index: See [AGENT-INDEX.md]($AGENT_INDEX_PATH) for AI agent lookup"

if [ -f "$TARGET_CLAUDE_MD" ]; then
    if grep -q "AGENT-INDEX.md" "$TARGET_CLAUDE_MD" 2>/dev/null; then
        echo -e "  ${YELLOW}!${NC} Agent discovery already configured (skipping)"
    else
        echo "" >> "$TARGET_CLAUDE_MD"
        echo "$AGENT_LINE" >> "$TARGET_CLAUDE_MD"
        echo -e "  ${GREEN}✓${NC} Added agent discovery reference to CLAUDE.md"
    fi
fi

# Summary
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    Setup Complete!                         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Files installed to ${BLUE}$CLAUDE_DIR${NC}:"
echo ""
echo -e "  ${GREEN}✓${NC} CLAUDE.md         — Project configuration"
echo -e "  ${GREEN}✓${NC} commands/commit.md — /commit slash command"
echo -e "  ${GREEN}✓${NC} skills/refactor/   — Refactoring skill"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "  1. Edit ~/.claude/CLAUDE.md to customize for your projects"
echo "  2. Run 'claude' in any project directory to start"
echo "  3. Use /commit to create formatted git commits"
echo "  4. Read QUICKSTART.md for a 15-minute tutorial"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "  - Quick Start: $ROOT_DIR/QUICKSTART.md"
echo "  - Learning Roadmap: $ROOT_DIR/LEARNING-ROADMAP.md"
echo "  - Module List: $ROOT_DIR/INDEX.md"
echo ""