# What's New in Claude Code

Track the latest features and changes in Claude Code.

## CC v2.1.92 — 2026-04-05

### New Features

- **HTTP Hooks** (v2.1.63) — POST JSON to remote webhook endpoints for external integrations
- **Agent Hook Type** — Subagent evaluations for complex validation and multi-step checks
- **Extended Thinking Effort Levels** — Control reasoning depth with `low`, `medium`, `high` settings
- **Background Task Execution** — Run long operations without blocking the conversation
- **Scheduled Tasks (Cron)** — Recurring and one-shot reminders via `CronCreate` tool
- **Print Mode** — Non-interactive mode for automation and CI/CD (`claude -p`)

### Improvements

- **Auto Mode** — Background safety classifier reviews each action before execution
- **Permission Modes Expanded** — `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`
- **Sandbox Improvements** — OS-level filesystem and network isolation
- **Managed Settings for Enterprise** — Deploy via plist, Registry, or managed files
- **Git Worktrees** — Isolated worktree branches for parallel work
- **Task List** — Persistent task tracking across context compactions
- **Prompt Suggestions** — Smart command suggestions based on context

### Hook Events Added

25 total events now supported:
- `PreToolUse`, `PostToolUse` — Tool execution lifecycle
- `UserPromptSubmit` — User input processing
- `Stop` — Session end
- `Notification` — Background task notifications
- `PreCompact`, `PostCompact` — Context compaction
- And more...

## CC v2.1.90 — 2026-03-15

### New Features

- **Channels** — MCP servers can push messages into running sessions (Research Preview)
- **Voice Dictation** — Push-to-talk voice input with 20-language STT support
- **Chrome Integration** — Browser context for web-aware assistance

### Improvements

- **Desktop App** — Visual diff review and multiple sessions support
- **Web Sessions** — Run Claude Code in browser at claude.ai/code
- **Remote Control** — Control Claude Code from Claude.ai or Claude app

## CC v2.1.85 — 2026-02-20

### New Features

- **Planning Mode** — Create detailed implementation plans before coding
- **Extended Thinking** — Deep reasoning with reserved context (up to 31,999 tokens)

### Improvements

- **MCP Transports** — HTTP, stdio, SSE, WebSocket support
- **Plugin System** — Bundled extension packages with commands and agents

---

## Version Verification

All modules in this knowledge base are verified against Claude Code versions. Check each module's README for the version badge:

```markdown
> ✅ Verified against Claude Code **vX.X.X** · Last verified: YYYY-MM-DD
```

## Staying Updated

- Run `/docs-sync-claude-code` skill after every Claude Code release
- Check `.github/workflows/staleness-check.yml` for weekly module verification
- Review `QUICKSTART.md` for setup changes