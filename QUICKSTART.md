# Quick Start: First 15 Minutes with Claude Code

Get up and running with Claude Code in just 15 minutes. This guide walks you through the essential features you'll use every day.

## Prerequisites

- Claude Code installed (`claude --version` to verify)
- A terminal or command prompt
- A project directory to work in

---

## Step 1: Verify Installation

```bash
claude --version
```

**Expected output:**
```
Claude Code v2.1.92
```

If you see a version number, you're ready to go. If not, [install Claude Code](https://docs.anthropic.com/claude-code) first.

---

## Step 2: Initialize Your Project

Navigate to your project directory and start Claude Code:

```bash
cd your-project
claude
```

**Expected output:**
```
Starting Claude Code in /path/to/your-project...
Type your message or use /help for commands.
```

Claude Code automatically detects your project context, reads your `CLAUDE.md` configuration (if present), and is ready to assist.

---

## Step 3: Create Your First Memory Configuration

Memory helps Claude understand your project preferences. Create a `CLAUDE.md` file:

```bash
# Create CLAUDE.md in your project root
cat > CLAUDE.md << 'EOF'
# Project Configuration

## Project Overview
Brief description of your project.

## Coding Conventions
- Use TypeScript strict mode
- Follow ESLint recommended rules
- Write tests for all new functions

## Key Files
- src/index.ts — Main entry point
- src/utils/ — Utility functions
EOF
```

**Expected output:**
```
(File created: CLAUDE.md)
```

Claude Code will read this file on every session start and follow your conventions.

---

## Step 4: Use Your First Slash Command

Slash commands are shortcuts for common tasks. Try the help command:

```
/help
```

**Expected output:**
```
Available commands:
  /help     Show this help message
  /clear    Clear conversation history
  /compact  Compact context to save space
  /commit   Create a git commit
  ...
```

### Try the Commit Command

After making some changes, use:

```
/commit
```

Claude will:
1. Analyze your changes with `git diff`
2. Draft a commit message following conventional commits
3. Ask for your approval before committing

---

## Step 5: Run Your First Task

Ask Claude to perform a real task:

```
Find all TODO comments in the codebase and list them by file
```

**Expected output:**
```
Found 12 TODO comments in 5 files:

src/index.ts:
  L45: TODO: Add error handling for network timeout
  L78: TODO: Implement retry logic

src/utils/parser.ts:
  L23: TODO: Support JSON5 format
...
```

---

## Step 6: Checkpoints and Rewind

Made a mistake? Use checkpoints to go back:

1. Press `Esc` twice (`Esc` + `Esc`)
2. Select a previous checkpoint
3. Choose "Restore code and conversation"

**Keyboard shortcut:** `Esc` + `Esc`

```
User: Actually, let's try a different approach
[Press Esc+Esc, select earlier checkpoint]
Claude: Rewound to checkpoint. Ready to try a different approach.
```

---

## What You've Learned

In just 15 minutes, you now know how to:

| Feature | What it does |
|---------|--------------|
| `/help` | List available commands |
| `/commit` | Create formatted git commits |
| `CLAUDE.md` | Configure project preferences |
| `Esc`+`Esc` | Rewind to previous checkpoint |

---

## Next Steps

1. **[Learning Roadmap](LEARNING-ROADMAP.md)** — Comprehensive learning path
2. **[Slash Commands](01-slash-commands/)** — Master all available commands
3. **[Memory System](02-memory/)** — Deep dive into CLAUDE.md configuration
4. **[Skills](03-skills/)** — Create reusable task templates
5. **[Hooks](06-hooks/)** — Automate with event-driven scripts

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `claude` | Start interactive session |
| `claude -p "task"` | Run in print mode (non-interactive) |
| `/help` | Show available commands |
| `/clear` | Clear conversation history |
| `/compact` | Compact context window |
| `/commit` | Create git commit |
| `Esc`+`Esc` | Open checkpoint browser |
| `Ctrl+C` | Cancel current input |
| `Ctrl+D` | Exit Claude Code |

---

## Getting Help

- **Documentation:** [docs.anthropic.com/claude-code](https://docs.anthropic.com/claude-code)
- **GitHub Issues:** [github.com/anthropics/claude-code/issues](https://github.com/anthropics/claude-code/issues)
- **Community:** [discourse.anthropic.com](https://discourse.anthropic.com)

---

*This quick start guide is part of the claude-howto knowledge base.*