---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

> 🔴 **高级** | ⏱ 150 分钟
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证: 2026-04-06

**你将构建:** 掌握规划模式、扩展思考和自动化。

# 高级功能

Claude Code 高级功能的综合指南，包括规划模式、扩展思考、auto mode、后台任务、权限模式、print mode（非交互）、会话管理、交互功能、channels、语音输入、远程控制、Web 会话、桌面应用、任务列表、提示建议、Git Worktrees、沙箱、托管设置和配置。

## 目录

1. [概述](#概述)
2. [规划模式](#规划模式)
3. [扩展思考](#扩展思考)
4. [Auto Mode](#auto-mode)
5. [后台任务](#后台任务)
6. [定时任务](#定时任务)
7. [权限模式](#权限模式)
8. [Headless Mode](#headless-mode)
9. [会话管理](#会话管理)
10. [交互功能](#交互功能)
11. [语音输入](#语音输入)
12. [Channels](#channels)
13. [Chrome 集成](#chrome-集成)
14. [远程控制](#远程控制)
15. [Web 会话](#web-会话)
16. [桌面应用](#桌面应用)
17. [任务列表](#任务列表)
18. [提示建议](#提示建议)
19. [Git Worktrees](#git-worktrees)
20. [沙箱](#沙箱)
21. [托管设置（企业）](#托管设置企业)
22. [企业部署](#企业部署)
23. [工作流与最佳实践](#工作流与最佳实践)
24. [监控与可观测性](#监控与可观测性)
25. [CI/CD 集成](#cicd-集成)
26. [配置与设置](#配置与设置)
27. [最佳实践](#最佳实践)
28. [实战 SOP](#实战-sop)
29. [更多资源](#更多资源)

---

## 概述

Claude Code 的高级功能通过规划、推理、自动化和控制机制扩展核心能力。这些功能支持复杂开发任务、代码审查、自动化和多会话管理的精细化工作流。

**核心高级功能包括:**
- **规划模式**: 在编码前创建详细的实现计划
- **扩展思考**: 对复杂问题进行深度推理
- **Auto Mode**: 后台安全分类器在执行前审查每个操作（研究预览）
- **后台任务**: 运行长时间操作而不阻塞对话
- **权限模式**: 控制 Claude 可以执行的操作（`default`、`acceptEdits`、`plan`、`auto`、`dontAsk`、`bypassPermissions`）
- **Print Mode**: 非交互式运行 Claude Code，用于自动化和 CI/CD（`claude -p`）
- **会话管理**: 管理多个工作会话
- **交互功能**: 键盘快捷键、多行输入和命令历史
- **语音输入**: 按键说话的语音输入，支持 20 种语言的语音转文字
- **Channels**: MCP 服务器向运行中的会话推送消息（研究预览）
- **远程控制**: 从 Claude.ai 或 Claude 应用控制 Claude Code
- **Web 会话**: 在浏览器中运行 Claude Code（claude.ai/code）
- **桌面应用**: 独立应用，用于可视化差异审查和多会话管理
- **任务列表**: 跨上下文压缩的持久任务跟踪
- **提示建议**: 基于上下文的智能命令建议
- **Git Worktrees**: 用于并行工作的隔离 worktree 分支
- **沙箱**: 操作系统级别的文件系统和网络隔离
- **托管设置**: 通过 plist、Registry 或托管文件进行企业部署
- **配置**: 使用 JSON 配置文件自定义行为

---

## 规划模式

规划模式允许 Claude 在实现复杂任务之前进行思考，创建一个可以审查和批准的详细计划。

### 什么是规划模式？

规划模式采用两阶段方法:
1. **规划阶段**: Claude 分析任务并创建详细的实现计划
2. **实现阶段**: 批准后，Claude 执行计划

### 何时使用规划模式

✅ 适用于:
- 复杂的多文件重构
- 新功能实现
- 架构变更
- 数据库迁移
- 重大 API 重设计

❌ 不适用于:
- 简单 bug 修复
- 格式化变更
- 单文件编辑
- 快速查询

### 激活规划模式

**Slash command**:
```bash
/plan Implement user authentication system
```

**CLI 标志**:
```bash
claude --permission-mode plan
```

**设置为默认**:
```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

**键盘快捷键**:
- `Shift + Tab` - 切换权限模式（包括 plan）
- `Alt + M` - 切换权限模式（Windows/Linux）

### 规划模式的优势

- **结构化实现方法**: 实现步骤的详细分解
- **审查和批准**: 在执行前批准或调整计划
- **风险识别**: 在实现前识别潜在问题
- **清晰阶段**: 有组织的实现阶段和里程碑

### 示例: 功能实现

```
User: /plan Add a real-time notification system

Claude: I'll create a plan for implementing real-time notifications.

## Implementation Plan

### Phase 1: Infrastructure Setup
1. Install WebSocket libraries (socket.io)
2. Set up WebSocket server
3. Configure connection management

### Phase 2: Backend Implementation
4. Create notification service
5. Implement notification queue
6. Add database schema for notifications
7. Create API endpoints

### Phase 3: Frontend Integration
8. Set up WebSocket client
9. Create notification UI components
10. Implement notification state management
11. Add notification permissions

### Phase 4: Testing & Deployment
12. Write unit tests
13. Write integration tests
14. Update documentation
15. Deploy to staging

Estimated time: 3-4 hours
Files to modify: 12
New files to create: 8

Ready to proceed? (yes/no/modify plan)

User: yes

Claude: [Begins implementation following the plan]
```

### 计划修改

```
User: Modify the plan - skip the queue for now, we'll add it later

Claude: Updated plan:
[Shows modified plan with queue removed]

User: Looks good, proceed

Claude: [Implements modified plan]
```

### 规划模式配置

规划模式通过 CLI 标志或 slash command 激活:

```bash
# 通过 CLI 激活规划模式
claude --permission-mode plan

# 或在 REPL 中使用 /plan slash command
/plan Implement user authentication system
```

**规划模型别名**: 使用 `opusplan` 作为模型别名，让 Opus 用于规划，Sonnet 用于执行:

```bash
claude --model opusplan "design and implement the new API"
```

**外部编辑计划**: 按 `Ctrl+G` 在外部编辑器中打开当前计划进行详细修改。

---

## 扩展思考

扩展思考允许 Claude 在提供解决方案之前花更多时间推理复杂问题。

### 什么是扩展思考？

扩展思考是一种深思熟虑的逐步推理过程，Claude:
- 分解复杂问题
- 考虑多种方法
- 评估权衡
- 推理边缘情况

### 激活扩展思考

**键盘快捷键**:
- `Option + T` (macOS) / `Alt + T` (Windows/Linux) - 切换扩展思考

**自动激活**:
- 默认为所有模型启用（Opus 4.6、Sonnet 4.6、Haiku 4.5）
- Opus 4.6: 自适应推理，支持努力级别: `low` (○)、`medium` (◐)、`high` (●)、`max` (仅 Opus 4.6)
- 其他模型: 固定预算，最多 31,999 tokens

**配置方法**:
- 切换: `Alt+T` / `Option+T`，或通过 `/config`
- 查看推理: `Ctrl+O`（详细模式）
- 设置努力级别: `/effort` 命令或 `--effort` 标志

**自定义预算**:
```bash
export MAX_THINKING_TOKENS=1024
```

**努力级别**（仅 Opus 4.6）:
```bash
export CLAUDE_CODE_EFFORT_LEVEL=high   # low (○), medium (◐), high (●), 或 max (仅 Opus 4.6)
```

**CLI 标志**:
```bash
claude --effort high "complex architectural review"
```

**Slash command**:
```
/effort high
```

> **注意:** 提示中的关键词 "ultrathink" 会激活深度推理模式。努力级别 `low`、`medium`、`high` 和 `max`（仅 Opus 4.6）控制 Claude 执行多少推理。

### 扩展思考的优势

- **深度推理**: 花更多时间思考复杂问题
- **更好的架构决策**: 通过全面评估做出明智选择
- **边缘情况考虑**: 思考潜在问题和场景
- **彻底分析**: 复杂问题的结构化方法

### 示例: 架构决策

```
User: /think Should we use microservices or a monolith for our e-commerce platform?

Claude: Let me think through this architectural decision carefully...

<extended_thinking>
## Context Analysis
- Team size: 5 developers
- Expected traffic: 10k daily users initially
- Need to scale to 100k+ users
- Limited DevOps resources
- 6-month timeline to MVP

## Approach 1: Microservices
Pros:
+ Independent scaling
+ Technology flexibility
+ Team independence
+ Fault isolation

Cons:
- Operational complexity
- Network overhead
- Distributed tracing needed
- Requires DevOps expertise
- Slower initial development

## Approach 2: Monolith
Pros:
+ Simpler deployment
+ Faster initial development
+ Easier debugging
+ Lower operational overhead
+ Single codebase

Cons:
- Scaling challenges later
- All-or-nothing deployments
- Technology lock-in
- Potential for tight coupling

## Decision Factors
1. Team size (5 devs) → Favors monolith
2. DevOps resources (limited) → Favors monolith
3. Timeline (6 months) → Favors monolith
4. Future scale (100k users) → Achievable with monolith + caching
5. Complexity budget → Limited

## Recommendation
Start with a **modular monolith**:
- Single deployment unit
- Clear module boundaries
- Clean interfaces between modules
- Prepare for future extraction to microservices if needed

This gives you:
✓ Fast initial development
✓ Low operational complexity
✓ Option to extract services later
✓ Clear architecture

Migration path: When you reach 50k+ users or specific modules need independent scaling, extract those modules into microservices.
</extended_thinking>

**Recommendation**: Implement a modular monolith with clean module boundaries.

This approach balances your current constraints (team size, timeline, DevOps resources) with future scalability needs. You can migrate specific modules to microservices later when there's a clear business need.
```

### 扩展思考配置

扩展思考通过环境变量、键盘快捷键和 CLI 标志控制:

```bash
# 设置思考 token 预算
export MAX_THINKING_TOKENS=16000

# 设置努力级别（仅 Opus 4.6）: low (○), medium (◐), high (●), 或 max (仅 Opus 4.6)
export CLAUDE_CODE_EFFORT_LEVEL=high
```

在会话中使用 `Alt+T` / `Option+T` 切换，使用 `/effort` 设置努力级别，或通过 `/config` 配置。

---

## Auto Mode

Auto Mode 是一种研究预览权限模式（2026 年 3 月），使用后台安全分类器在执行前审查每个操作。它允许 Claude 自主工作，同时阻止危险操作。

### 要求

- **计划**: 团队计划（企业和 API 正在推出）
- **模型**: Claude Sonnet 4.6 或 Opus 4.6
- **分类器**: 在 Claude Sonnet 4.6 上运行（增加额外 token 成本）

### 启用 Auto Mode

```bash
# 使用 CLI 标志解锁 auto mode
claude --enable-auto-mode

# 然后在 REPL 中使用 Shift+Tab 切换到它
```

或将其设置为默认权限模式:

```bash
claude --permission-mode auto
```

通过配置设置:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### 分类器工作原理

后台分类器使用以下决策顺序评估每个操作:

1. **允许/拒绝规则** -- 首先检查显式权限规则
2. **只读/编辑自动批准** -- 文件读取和编辑自动通过
3. **分类器** -- 后台分类器审查操作
4. **回退** -- 连续 3 次或总共 20 次阻止后回退到提示

### 默认阻止的操作

Auto mode 默认阻止以下操作:

| 阻止的操作 | 示例 |
|-----------|------|
| 管道到 shell 安装 | `curl \| bash` |
| 向外部发送敏感数据 | API 密钥、凭据通过网络传输 |
| 生产部署 | 针对生产环境的部署命令 |
| 大规模删除 | `rm -rf` 大目录 |
| IAM 变更 | 权限和角色修改 |
| 强制推送到 main | `git push --force origin main` |

### 默认允许的操作

| 允许的操作 | 示例 |
|-----------|------|
| 本地文件操作 | 读取、写入、编辑项目文件 |
| 已声明的依赖安装 | 从 manifest 文件执行 `npm install`、`pip install` |
| 只读 HTTP | `curl` 用于获取文档 |
| 推送到当前分支 | `git push origin feature-branch` |

### 配置 Auto Mode

**以 JSON 格式打印默认规则**:
```bash
claude auto-mode defaults
```

**配置可信基础设施** 通过 `autoMode.environment` 托管设置进行企业部署。这允许管理员定义可信的 CI/CD 环境、部署目标和基础设施模式。

### 回退行为

当分类器不确定时，auto mode 回退到提示用户:
- 连续 **3 次**分类器阻止后
- 会话中总共 **20 次**分类器阻止后

这确保当分类器无法自信批准操作时，用户始终保留控制权。

### 配置等效 Auto-Mode 的权限（无需团队计划）

如果您没有团队计划或想要更简单的方法（无需后台分类器），可以在 `~/.claude/settings.json` 中配置保守的安全权限规则基线。脚本从只读和本地检查规则开始，然后让您按需选择启用编辑、测试、本地 git 写入、包安装和 GitHub 写入操作。

**文件:** `09-advanced-features/setup-auto-mode-permissions.py`

```bash
# 预览将要添加的内容（不写入任何更改）
python3 09-advanced-features/setup-auto-mode-permissions.py --dry-run

# 应用保守基线
python3 09-advanced-features/setup-auto-mode-permissions.py

# 仅在需要时添加更多能力
python3 09-advanced-features/setup-auto-mode-permissions.py --include-edits --include-tests
python3 09-advanced-features/setup-auto-mode-permissions.py --include-git-write --include-packages
```

脚本在这些类别中添加规则:

| 类别 | 示例 |
|------|------|
| 核心只读工具 | `Read(*)`, `Glob(*)`, `Grep(*)`, `Agent(*)`, `WebSearch(*)`, `WebFetch(*)` |
| 本地检查 | `Bash(git status:*)`, `Bash(git log:*)`, `Bash(git diff:*)`, `Bash(cat:*)` |
| 可选编辑 | `Edit(*)`, `Write(*)`, `NotebookEdit(*)` |
| 可选测试/构建 | `Bash(pytest:*)`, `Bash(python3 -m pytest:*)`, `Bash(cargo test:*)` |
| 可选 git 写入 | `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git stash:*)` |
| Git（本地写入） | `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git checkout:*)` |
| 包管理器 | `Bash(npm install:*)`, `Bash(pip install:*)`, `Bash(cargo build:*)` |
| 构建和测试 | `Bash(make:*)`, `Bash(pytest:*)`, `Bash(go test:*)` |
| 常用 shell | `Bash(ls:*)`, `Bash(cat:*)`, `Bash(find:*)`, `Bash(cp:*)`, `Bash(mv:*)` |
| GitHub CLI | `Bash(gh pr view:*)`, `Bash(gh pr create:*)`, `Bash(gh issue list:*)` |

危险操作（`rm -rf`、`sudo`、强制推送、`DROP TABLE`、`terraform destroy` 等）被有意排除。脚本是幂等的 — 运行两次不会重复规则。

---

## 后台任务

后台任务允许长时间运行的操作在不阻塞对话的情况下执行。

### 什么是后台任务？

后台任务异步运行，您可以继续工作:
- 长测试套件
- 构建过程
- 数据库迁移
- 部署脚本
- 分析工具

**基本用法**:
```bash
User: Run tests in background

Claude: Started task bg-1234

/task list           # 显示所有任务
/task status bg-1234 # 检查进度
/task show bg-1234   # 查看输出
/task cancel bg-1234 # 取消任务
```

### 启动后台任务

```
User: Run the full test suite in the background

Claude: Starting tests in background (task-id: bg-1234)
You can continue working while tests run.

[你可以继续对话]

User: Meanwhile, let's refactor the auth module

Claude: [在测试后台运行时处理 auth 模块]

[稍后，当测试完成时]

Claude: 📢 Background task bg-1234 completed:
✅ 245 tests passed
❌ 3 tests failed
View results: /task show bg-1234
```

### 管理后台任务

**列出活跃任务**:
```
User: /task list

Active background tasks:
1. [bg-1234] Running tests (50% complete, 2min remaining)
2. [bg-1235] Building Docker image (25% complete, 8min remaining)
3. [bg-1236] Deploying to staging (90% complete, 30sec remaining)
```

**检查任务状态**:
```
User: /task status bg-1234

Task bg-1234: Running tests
Status: In progress
Progress: 120/245 tests (49%)
Started: 2025-11-08 10:30:15
Estimated completion: 2025-11-08 10:34:22
```

**查看任务输出**:
```
User: /task show bg-1234

[显示测试运行的实时输出]
```

**取消任务**:
```
User: /task cancel bg-1234

Cancelled background task bg-1234
```

### 示例: 并行开发

```
User: Run the build in the background

Claude: Starting build... (task-id: bg-5001)

User: Also run the linter in background

Claude: Starting linter... (task-id: bg-5002)

User: While those run, let's implement the new API endpoint

Claude: [在构建和 linter 运行时实现 API 端点]

[10 分钟后]

Claude: 📢 Build completed successfully (bg-5001)
📢 Linter found 12 issues (bg-5002)

User: Show me the linter issues

Claude: [显示 bg-5002 的 linter 输出]
```

### 配置

```json
{
  "backgroundTasks": {
    "enabled": true,
    "maxConcurrentTasks": 5,
    "notifyOnCompletion": true,
    "autoCleanup": true,
    "logOutput": true
  }
}
```

---

## 定时任务

定时任务让您按周期性计划自动运行提示，或作为一次性提醒。任务是会话范围的 — 在 Claude Code 活跃时运行，会话结束时清除。自 v2.1.72+ 起可用。

### `/loop` 命令

```bash
# 显式间隔
/loop 5m check if the deployment finished

# 自然语言
/loop check build status every 30 minutes
```

也支持标准的 5 字段 cron 表达式用于精确调度。

### 一次性提醒

设置在特定时间触发一次的提醒:

```
remind me at 3pm to push the release branch
in 45 minutes, run the integration tests
```

### 管理定时任务

| 工具 | 描述 |
|------|------|
| `CronCreate` | 创建新的定时任务 |
| `CronList` | 列出所有活跃的定时任务 |
| `CronDelete` | 删除定时任务 |

**限制和行为**:
- 每个会话最多 **50 个定时任务**
- 会话范围 — 会话结束时清除
- 周期性任务 **3 天**后自动过期
- 任务仅在 Claude Code 运行时触发 — 不补发错过的触发

### 行为详情

| 方面 | 详情 |
|------|------|
| **周期性抖动** | 最多间隔的 10%（最多 15 分钟） |
| **一次性抖动** | 在 :00/:30 边界上最多 90 秒 |
| **错过触发** | 不补发 — 如果 Claude Code 未运行则跳过 |
| **持久化** | 不跨重启持久化 |

### Cloud 定时任务

使用 `/schedule` 创建在 Anthropic 基础设施上运行的 Cloud 定时任务:

```
/schedule daily at 9am run the test suite and report failures
```

Cloud 定时任务跨重启持久化，不需要本地运行 Claude Code。

### 禁用定时任务

```bash
export CLAUDE_CODE_DISABLE_CRON=1
```

### 示例: 监控部署

```
/loop 5m check the deployment status of the staging environment.
        If the deploy succeeded, notify me and stop looping.
        If it failed, show the error logs.
```

> **提示**: 定时任务是会话范围的。对于跨重启持久化的自动化，请使用 CI/CD 管道、GitHub Actions 或桌面应用定时任务。

---

## 权限模式

权限模式控制 Claude 在无需显式批准的情况下可以执行的操作。

### 可用权限模式

| 模式 | 行为 |
|------|------|
| `default` | 仅读取文件；其他操作需提示 |
| `acceptEdits` | 读取和编辑文件；命令需提示 |
| `plan` | 仅读取文件（研究模式，不编辑） |
| `auto` | 所有操作，配合后台安全分类器检查（研究预览） |
| `bypassPermissions` | 所有操作，无权限检查（危险） |
| `dontAsk` | 仅执行预先批准的工具；其他全部拒绝 |

在 CLI 中使用 `Shift+Tab` 切换模式。使用 `--permission-mode` 标志或 `permissions.defaultMode` 设置设置默认值。

### 激活方法

**键盘快捷键**:
```bash
Shift + Tab  # 切换所有 6 种模式
```

**Slash command**:
```bash
/plan                  # 进入规划模式
```

**CLI 标志**:
```bash
claude --permission-mode plan
claude --permission-mode auto
```

**设置**:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### 权限模式示例

#### Default Mode
Claude 在重要操作上请求确认:

```
User: Fix the bug in auth.ts

Claude: I need to modify src/auth.ts to fix the bug.
The change will update the password validation logic.

Approve this change? (yes/no/show)
```

#### Plan Mode
在执行前审查实现计划:

```
User: /plan Implement user authentication system

Claude: I'll create a plan for implementing authentication.

## Implementation Plan
[包含阶段和步骤的详细计划]

Ready to proceed? (yes/no/modify)
```

#### Accept Edits Mode
自动接受文件修改:

```
User: acceptEdits
User: Fix the bug in auth.ts

Claude: [无需询问直接修改]
```

### 使用场景

**代码审查**:
```
User: claude --permission-mode plan
User: Review this PR and suggest improvements

Claude: [读取代码，提供反馈，但不能修改]
```

**结对编程**:
```
User: claude --permission-mode default
User: Let's implement the feature together

Claude: [每次变更前请求批准]
```

**自动化任务**:
```
User: claude --permission-mode acceptEdits
User: Fix all linting issues in the codebase

Claude: [自动接受文件编辑，无需询问]
```

---

## Headless Mode

Print mode (`claude -p`) 允许 Claude Code 无需交互输入运行，非常适合自动化和 CI/CD。这是非交互模式，取代了旧的 `--headless` 标志。

### 什么是 Print Mode？

Print mode 支持:
- 自动脚本执行
- CI/CD 集成
- 批处理
- 定时任务

### 在 Print Mode 下运行（非交互）

```bash
# 运行特定任务
claude -p "Run all tests"

# 处理管道内容
cat error.log | claude -p "Analyze these errors"

# CI/CD 集成（GitHub Actions）
- name: AI Code Review
  run: claude -p "Review PR"
```

### 更多 Print Mode 使用示例

```bash
# 运行特定任务并捕获输出
claude -p "Run all tests and generate coverage report"

# 结构化输出
claude -p --output-format json "Analyze code quality"

# 从 stdin 输入
echo "Analyze code quality" | claude -p "explain this"
```

### 示例: CI/CD 集成

**GitHub Actions**:
```yaml
# .github/workflows/code-review.yml
name: AI Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Claude Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p --output-format json \
            --max-turns 3 \
            "Review this PR for:
            - Code quality issues
            - Security vulnerabilities
            - Performance concerns
            - Test coverage
            Output results as JSON" > review.json

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = JSON.parse(fs.readFileSync('review.json', 'utf8'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: JSON.stringify(review, null, 2)
            });
```

### Print Mode 配置

Print mode (`claude -p`) 支持多个自动化标志:

```bash
# 限制自主轮次
claude -p --max-turns 5 "refactor this module"

# 结构化 JSON 输出
claude -p --output-format json "analyze this codebase"

# 配合 schema 验证
claude -p --json-schema '{"type":"object","properties":{"issues":{"type":"array"}}}' \
  "find bugs in this code"

# 禁用会话持久化
claude -p --no-session-persistence "one-off analysis"
```

---

## 会话管理

有效管理多个 Claude Code 会话。

### 会话管理命令

| 命令 | 描述 |
|------|------|
| `/resume` | 按 ID 或名称恢复对话 |
| `/rename` | 命名当前会话 |
| `/fork` | 将当前会话分支到新分支 |
| `claude -c` | 继续最近的对话 |
| `claude -r "session"` | 按名称或 ID 恢复会话 |

### 恢复会话

**继续上次对话**:
```bash
claude -c
```

**恢复命名会话**:
```bash
claude -r "auth-refactor" "finish this PR"
```

**重命名当前会话**（在 REPL 中）:
```
/rename auth-refactor
```

### 分叉会话

分叉会话以尝试替代方案而不丢失原始会话:

```
/fork
```

或从 CLI:
```bash
claude --resume auth-refactor --fork-session "try OAuth instead"
```

### 会话持久化

会话自动保存并可恢复:

```bash
# 继续上次对话
claude -c

# 按名称或 ID 恢复特定会话
claude -r "auth-refactor"

# 恢复并分叉用于实验
claude --resume auth-refactor --fork-session "alternative approach"
```

---

## 交互功能

### 键盘快捷键

Claude Code 支持键盘快捷键以提高效率。以下是官方文档的完整参考:

| 快捷键 | 描述 |
|--------|------|
| `Ctrl+C` | 取消当前输入/生成 |
| `Ctrl+D` | 退出 Claude Code |
| `Ctrl+G` | 在外部编辑器中编辑计划 |
| `Ctrl+L` | 清除终端屏幕 |
| `Ctrl+O` | 切换详细输出（查看推理） |
| `Ctrl+R` | 反向搜索历史 |
| `Ctrl+T` | 切换任务列表视图 |
| `Ctrl+B` | 后台运行任务 |
| `Esc+Esc` | 回退代码/对话 |
| `Shift+Tab` / `Alt+M` | 切换权限模式 |
| `Option+P` / `Alt+P` | 切换模型 |
| `Option+T` / `Alt+T` | 切换扩展思考 |

**行编辑（标准 readline 快捷键）:**

| 快捷键 | 操作 |
|--------|------|
| `Ctrl + A` | 移动到行首 |
| `Ctrl + E` | 移动到行尾 |
| `Ctrl + K` | 剪切到行尾 |
| `Ctrl + U` | 剪切到行首 |
| `Ctrl + W` | 向后删除单词 |
| `Ctrl + Y` | 粘贴（yank） |
| `Tab` | 自动补全 |
| `↑ / ↓` | 命令历史 |

### 自定义键绑定

运行 `/keybindings` 创建自定义键盘快捷键，它会打开 `~/.claude/keybindings.json` 进行编辑（v2.1.18+）。

**配置格式**:

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null,
        "ctrl+k ctrl+s": "chat:stash"
      }
    },
    {
      "context": "Confirmation",
      "bindings": {
        "ctrl+a": "confirmation:yes"
      }
    }
  ]
}
```

将绑定设置为 `null` 可取消默认快捷键。

### 可用上下文

键绑定作用于特定 UI 上下文:

| 上下文 | 关键操作 |
|--------|----------|
| **Chat** | `submit`, `cancel`, `cycleMode`, `modelPicker`, `thinkingToggle`, `undo`, `externalEditor`, `stash`, `imagePaste` |
| **Confirmation** | `yes`, `no`, `previous`, `next`, `nextField`, `cycleMode`, `toggleExplanation` |
| **Global** | `interrupt`, `exit`, `toggleTodos`, `toggleTranscript` |
| **Autocomplete** | `accept`, `dismiss`, `next`, `previous` |
| **HistorySearch** | `search`, `previous`, `next` |
| **Settings** | 上下文特定设置导航 |
| **Tabs** | 标签切换和管理 |
| **Help** | 帮助面板导航 |

共有 18 个上下文，包括 `Transcript`、`Task`、`ThemePicker`、`Attachments`、`Footer`、`MessageSelector`、`DiffDialog`、`ModelPicker` 和 `Select`。

### 组合键支持

键绑定支持组合序列（多键组合）:

```
"ctrl+k ctrl+s"   → 双键序列: 按 ctrl+k，然后 ctrl+s
"ctrl+shift+p"    → 同时按下修饰键
```

**按键语法**:
- **修饰键**: `ctrl`, `alt`（或 `opt`）, `shift`, `meta`（或 `cmd`）
- **大写隐含 Shift**: `K` 等同于 `shift+k`
- **特殊键**: `escape`, `enter`, `return`, `tab`, `space`, `backspace`, `delete`, 方向键

### 保留和冲突键

| 键 | 状态 | 说明 |
|----|------|------|
| `Ctrl+C` | 保留 | 无法重绑定（中断） |
| `Ctrl+D` | 保留 | 无法重绑定（退出） |
| `Ctrl+B` | 终端冲突 | tmux 前缀键 |
| `Ctrl+A` | 终端冲突 | GNU Screen 前缀键 |
| `Ctrl+Z` | 终端冲突 | 进程挂起 |

> **提示**: 如果快捷键不工作，请检查终端模拟器或复用器的冲突。

### Tab 补全

Claude Code 提供智能 tab 补全:

```
User: /rew<TAB>
→ /rewind

User: /plu<TAB>
→ /plugin

User: /plugin <TAB>
→ /plugin install
→ /plugin enable
→ /plugin disable
```

### 命令历史

访问之前的命令:

```
User: <↑>  # 上一个命令
User: <↓>  # 下一个命令
User: Ctrl+R  # 搜索历史

(reverse-i-search)`test': run all tests
```

### 多行输入

对于复杂查询，使用多行模式:

```bash
User: \
> Long complex prompt
> spanning multiple lines
> \end
```

**示例**:

```
User: \
> Implement a user authentication system
> with the following requirements:
> - JWT tokens
> - Email verification
> - Password reset
> - 2FA support
> \end

Claude: [处理多行请求]
```

### 内联编辑

在发送前编辑命令:

```
User: Deploy to prodcution<Backspace><Backspace>uction

[发送前原地编辑]
```

### Vim Mode

启用 Vi/Vim 键绑定进行文本编辑:

**激活**:
- 使用 `/vim` 命令或 `/config` 启用
- 使用 `Esc` 切换到 NORMAL，`i/a/o` 切换到 INSERT

**导航键**:
- `h` / `l` - 左/右移动
- `j` / `k` - 下/上移动
- `w` / `b` / `e` - 按单词移动
- `0` / `$` - 移动到行首/行尾
- `gg` / `G` - 跳转到文本开头/结尾

**文本对象**:
- `iw` / `aw` - 单词内部/周围
- `i"` / `a"` - 引号字符串内部/周围
- `i(` / `a(` - 括号内部/周围

### Bash Mode

使用 `!` 前缀直接执行 shell 命令:

```bash
! npm test
! git status
! cat src/index.js
```

使用此功能可快速执行命令而无需切换上下文。

---

## 语音输入

语音输入为 Claude Code 提供按键说话的语音输入，让您说话而不是打字。

### 激活语音输入

```
/voice
```

### 功能

| 功能 | 描述 |
|------|------|
| **按键说话** | 按住键录音，松开发送 |
| **20 种语言** | 语音转文字支持 20 种语言 |
| **自定义键绑定** | 通过 `/keybindings` 配置按键说话键 |
| **账户要求** | 需要 Claude.ai 账户进行 STT 处理 |

### 配置

在键绑定文件（`/keybindings`）中自定义按键说话键绑定。语音输入使用您的 Claude.ai 账户进行语音转文字处理。

---

## Channels

Channels（研究预览）允许 MCP 服务器向运行中的 Claude Code 会话推送消息，实现与外部服务的实时集成。

###订阅 Channels

```bash
# 启动时订阅 channel plugins
claude --channels discord,telegram
```

### 支持的集成

| 集成 | 描述 |
|------|------|
| **Discord** | 在会话中接收和响应 Discord 消息 |
| **Telegram** | 在会话中接收和响应 Telegram 消息 |

### 配置

**托管设置**用于企业部署:

```json
{
  "allowedChannelPlugins": ["discord", "telegram"]
}
```

`allowedChannelPlugins` 托管设置控制整个组织允许哪些 channel plugins。

### 工作原理

1. MCP 服务器作为 channel plugins 连接到外部服务
2. 传入消息被推送到活跃的 Claude Code 会话
3. Claude 可以在会话上下文中读取和响应消息
4. Channel plugins 必须通过 `allowedChannelPlugins` 托管设置批准

---

## Chrome 集成

Chrome 集成将 Claude Code 连接到您的 Chrome 或 Microsoft Edge 浏览器，用于实时 Web 自动化和调试。这是一个自 v2.0.73+ 起可用的 beta 功能（Edge 支持在 v1.0.36+ 添加）。

### 启用 Chrome 集成

**启动时**:

```bash
claude --chrome      # 启用 Chrome 连接
claude --no-chrome   # 禁用 Chrome 连接
```

**在会话中**:

```
/chrome
```

选择 "Enabled by default" 为所有未来会话激活 Chrome 集成。Claude Code 共享您的浏览器登录状态，因此可以与需要认证的 Web 应用交互。

### 能力

| 能力 | 描述 |
|------|------|
| **实时调试** | 读取控制台日志、检查 DOM 元素、实时调试 JavaScript |
| **设计验证** | 将渲染页面与设计稿对比 |
| **表单验证** | 测试表单提交、输入验证和错误处理 |
| **Web 应用测试** | 与认证应用交互（Gmail、Google Docs、Notion 等） |
| **数据提取** | 从网页抓取和处理内容 |
| **会话录制** | 将浏览器交互录制为 GIF 文件 |

### 站点级权限

Chrome 扩展管理每站点访问权限。您可以随时通过扩展弹出窗口授予或撤销特定站点的访问权限。Claude Code 仅与您明确允许的站点交互。

### 工作原理

Claude Code 在可见窗口中控制浏览器 — 您可以实时观看操作发生。当浏览器遇到登录页面或 CAPTCHA 时，Claude 暂停并等待您手动处理后再继续。

### 已知限制

- **浏览器支持**: 仅 Chrome 和 Edge — 不支持 Brave、Arc 和其他 Chromium 浏览器
- **WSL**: 在 Windows Subsystem for Linux 中不可用
- **第三方提供商**: 不支持 Bedrock、Vertex 或 Foundry API 提供商
- **Service worker 空闲**: Chrome 扩展 service worker 在长时间会话中可能进入空闲状态

> **提示**: Chrome 集成是 beta 功能。浏览器支持可能在未来版本中扩展。

---

## 远程控制

远程控制让您从手机、平板或任何浏览器继续本地运行的 Claude Code 会话。本地会话在您的机器上持续运行 — 不转移到云端。适用于 Pro、Max、Team 和 Enterprise 计划（v2.1.51+）。

### 启动远程控制

**从 CLI**:

```bash
# 以默认会话名称启动
claude remote-control

# 以自定义名称启动
claude remote-control --name "Auth Refactor"
```

**从会话内**:

```
/remote-control
/remote-control "Auth Refactor"
```

**可用标志**:

| 标志 | 描述 |
|------|------|
| `--name "title"` | 自定义会话标题便于识别 |
| `--verbose` | 显示详细连接日志 |
| `--sandbox` | 启用文件系统和网络隔离 |
| `--no-sandbox` | 禁用沙箱（默认） |

### 连接到会话

从其他设备连接的三种方式:

1. **会话 URL** — 会话启动时打印到终端；在任意浏览器中打开
2. **QR 码** — 启动后按空格键显示可扫描的 QR 码
3. **按名称查找** — 在 claude.ai/code 或 Claude 移动应用（iOS/Android）中浏览您的会话

### 安全

- **无入站端口**在您的机器上开放
- **仅出站 HTTPS**通过 TLS
- **范围凭证** — 多个短期、窄范围的 token
- **会话隔离** — 每个远程会话独立

### 远程控制 vs Claude Code on Web

| 方面 | 远程控制 | Claude Code on Web |
|------|----------|-------------------|
| **执行** | 在您的机器上运行 | 在 Anthropic 云上运行 |
| **本地工具** | 完全访问本地 MCP 服务器、文件和 CLI | 无本地依赖 |
| **使用场景** | 从其他设备继续本地工作 | 从任意浏览器开始新会话 |

### 限制

- 每个 Claude Code 实例一个远程会话
- 主机机器上终端必须保持打开
- 网络不可达时会话约 10 分钟后超时

### 使用场景

- 离开桌面时从移动设备或平板控制 Claude Code
- 保持本地工具执行的同时使用更丰富的 claude.ai UI
- 随时使用完整本地开发环境进行快速代码审查

---

## Web 会话

Web 会话让您直接在浏览器中运行 Claude Code（claude.ai/code），或从 CLI 创建 Web 会话。

### 创建 Web 会话

```bash
# 从 CLI 创建新的 Web 会话
claude --remote "implement the new API endpoints"
```

这会在 claude.ai 上启动 Claude Code 会话，您可以从任意浏览器访问。

### 本地恢复 Web 会话

如果您在 Web 上启动会话并想在本地继续:

```bash
# 在本地终端恢复 Web 会话
claude --teleport
```

或从交互 REPL 中:
```
/teleport
```

### 使用场景

- 在一台机器上开始工作，在另一台机器上继续
- 与团队成员分享会话 URL
- 使用 Web UI 进行可视化差异审查，然后切换到终端执行

---

## 桌面应用

Claude Code 桌面应用提供独立应用，具有可视化差异审查、并行会话和集成连接器。适用于 macOS 和 Windows（Pro、Max、Team 和 Enterprise 计划）。

### 安装

从 [claude.ai](https://claude.ai) 下载适用于您平台的版本:
- **macOS**: Universal build（Apple Silicon 和 Intel）
- **Windows**: x64 和 ARM64 安装程序可用

参见 [Desktop Quickstart](https://code.claude.com/docs/en/desktop-quickstart) 获取设置说明。

### 从 CLI 移交

将当前 CLI 会话转移到桌面应用:

```
/desktop
```

### 核心功能

| 功能 | 描述 |
|------|------|
| **差异视图** | 文件级可视化审查，带内联评论；Claude 读取评论并修订 |
| **应用预览** | 自动启动开发服务器，带嵌入式浏览器用于实时验证 |
| **PR 监控** | GitHub CLI 集成，自动修复 CI 失败，检查通过时自动合并 |
| **并行会话** | 侧边栏多会话，自动 Git worktree 隔离 |
| **定时任务** | 周期性任务（每小时、每天、工作日、每周），应用打开时运行 |
| **丰富渲染** | 代码、markdown 和图表渲染，带语法高亮 |

### 应用预览配置

在 `.claude/launch.json` 中配置开发服务器行为:

```json
{
  "command": "npm run dev",
  "port": 3000,
  "readyPattern": "ready on",
  "persistCookies": true
}
```

### 连接器

连接外部服务获取更丰富的上下文:

| 连接器 | 能力 |
|--------|------|
| **GitHub** | PR 监控、issue 跟踪、代码审查 |
| **Slack** | 通知、频道上下文 |
| **Linear** | Issue 跟踪、sprint 管理 |
| **Notion** | 文档、知识库访问 |
| **Asana** | 任务管理、项目跟踪 |
| **Calendar** | 日程感知、会议上下文 |

> **注意**: 连接器不适用于远程（云）会话。

### 远程和 SSH 会话

- **远程会话**: 在 Anthropic 云基础设施上运行；即使应用关闭也继续。可从 claude.ai/code 或 Claude 移动应用访问
- **SSH 会话**: 通过 SSH 连接到远程机器，完全访问远程文件系统和工具。Claude Code 必须安装在远程机器上

### 桌面应用中的权限模式

桌面应用支持与 CLI 相同的 4 种权限模式:

| 模式 | 行为 |
|------|------|
| **请求权限**（默认） | 审查并批准每个编辑和命令 |
| **自动接受编辑** | 文件编辑自动批准；命令需手动批准 |
| **规划模式** | 任何变更前先审查方案 |
| **绕过权限** | 自动执行（仅沙箱，管理员控制） |

### 企业功能

- **管理控制台**: 控制组织的 Code 标签页访问和权限设置
- **MDM 部署**: 通过 macOS MDM 或 Windows MSIX 部署
- **SSO 集成**: 要求组织成员单点登录
- **托管设置**: 集中管理团队配置和模型可用性

---

## 任务列表

任务列表功能提供跨上下文压缩的持久任务跟踪（当对话历史被修剪以适应上下文窗口时）。

### 切换任务列表

在会话中按 `Ctrl+T` 打开或关闭任务列表视图。

### 持久任务

任务跨上下文压缩持久化，确保在对话上下文被修剪时不会丢失长时间工作项。这对复杂的多步骤实现特别有用。

### 命名任务目录

使用 `CLAUDE_CODE_TASK_LIST_ID` 环境变量创建跨会话共享的命名任务目录:

```bash
export CLAUDE_CODE_TASK_LIST_ID=my-project-sprint-3
```

这允许多个会话共享同一任务列表，适用于团队工作流或多会话项目。

---

## 提示建议

提示建议基于您的 git 历史和当前对话上下文显示灰色的示例命令。

### 工作原理

- 建议以灰色文本显示在输入提示下方
- 按 `Tab` 接受建议
- 按 `Enter` 接受并立即提交
- 建议是上下文感知的，来自 git 历史和对话状态

### 禁用提示建议

```bash
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
```

---

## Git Worktrees

Git Worktrees 让您在隔离的 worktree 中启动 Claude Code，在不同分支上并行工作无需暂存或切换。

### 在 Worktree 中启动

```bash
# 在隔离的 worktree 中启动 Claude Code
claude --worktree
# 或
claude -w
```

### Worktree 位置

Worktrees 创建于:
```
<repo>/.claude/worktrees/<name>
```

### Monorepo 稀疏检出

使用 `worktree.sparsePaths` 设置在 monorepo 中执行稀疏检出，减少磁盘使用和克隆时间:

```json
{
  "worktree": {
    "sparsePaths": ["packages/my-package", "shared/"]
  }
}
```

### Worktree 工具和 Hooks

| 项目 | 描述 |
|------|------|
| `ExitWorktree` | 退出并清理当前 worktree 的工具 |
| `WorktreeCreate` | 创建 worktree 时触发的 hook 事件 |
| `WorktreeRemove` | 删除 worktree 时触发的 hook 事件 |

### 自动清理

如果在 worktree 中未进行任何更改，会话结束时自动清理。

### 使用场景

- 在功能分支上工作，同时保持 main 分支不变
- 在隔离环境中运行测试，不影响工作目录
- 在可丢弃环境中尝试实验性更改
- 在 monorepo 中稀疏检出特定包以加快启动

---

## 沙箱

沙箱为 Claude Code 执行的 Bash 命令提供操作系统级别的文件系统和网络隔离。这与权限规则互补，提供额外的安全层。

### 启用沙箱

**Slash command**:
```
/sandbox
```

**CLI 标志**:
```bash
claude --sandbox       # 启用沙箱
claude --no-sandbox    # 禁用沙箱
```

### 配置设置

| 设置 | 描述 |
|------|------|
| `sandbox.enabled` | 启用或禁用沙箱 |
| `sandbox.failIfUnavailable` | 如果无法激活沙箱则失败 |
| `sandbox.filesystem.allowWrite` | 允许写入访问的路径 |
| `sandbox.filesystem.allowRead` | 允许读取访问的路径 |
| `sandbox.filesystem.denyRead` | 拒绝读取访问的路径 |
| `sandbox.enableWeakerNetworkIsolation` | 在 macOS 上启用较弱的网络隔离 |

### 示例配置

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "filesystem": {
      "allowWrite": ["/Users/me/project"],
      "allowRead": ["/Users/me/project", "/usr/local/lib"],
      "denyRead": ["/Users/me/.ssh", "/Users/me/.aws"]
    },
    "enableWeakerNetworkIsolation": true
  }
}
```

### 工作原理

- Bash 命令在限制文件系统访问的沙箱环境中运行
- 网络访问可以隔离以防止意外外部连接
- 与权限规则配合使用实现深度防御
- 在 macOS 上，使用 `sandbox.enableWeakerNetworkIsolation` 进行网络限制（macOS 上不支持完全网络隔离）

### 使用场景

- 安全运行不可信或生成的代码
- 防止意外修改项目外的文件
- 自动化任务期间限制网络访问

---

## 托管设置（企业）

托管设置让企业管理员使用平台原生管理工具在整个组织部署 Claude Code 配置。

### 部署方法

| 平台 | 方法 | 起始版本 |
|------|------|----------|
| macOS | 托管 plist 文件（MDM） | v2.1.51+ |
| Windows | Windows Registry | v2.1.51+ |
| 跨平台 | 托管配置文件 | v2.1.51+ |
| 跨平台 | 托管 drop-ins（`managed-settings.d/` 目录） | v2.1.83+ |

### 托管 Drop-ins

自 v2.1.83 起，管理员可以将多个托管设置文件部署到 `managed-settings.d/` 目录。文件按字母顺序合并，允许跨团队的模块化配置:

```
~/.claude/managed-settings.d/
  00-org-defaults.json
  10-team-policies.json
  20-project-overrides.json
```

### 可用托管设置

| 设置 | 描述 |
|------|------|
| `disableBypassPermissionsMode` | 阻止用户启用绕过权限 |
| `availableModels` | 限制用户可选的模型 |
| `allowedChannelPlugins` | 控制允许哪些 channel plugins |
| `autoMode.environment` | 配置 auto mode 的可信基础设施 |
| 自定义策略 | 组织特定的权限和工具策略 |

### 示例: macOS Plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>disableBypassPermissionsMode</key>
  <true/>
  <key>availableModels</key>
  <array>
    <string>claude-sonnet-4-6</string>
    <string>claude-haiku-4-5</string>
  </array>
</dict>
</plist>
```

---

## 企业部署

在企业环境中部署 Claude Code 需要考虑安全、合规、团队协作等多个方面。

### 企业级配置

#### 基于角色的权限配置

```json
{
  "roles": {
    "junior-developer": {
      "permissions": {
        "defaultMode": "default",
        "autoApprove": {
          "bash": ["npm test", "npm run lint"]
        }
      },
      "restrictions": {
        "blockDestructiveCommands": true,
        "requireCodeReview": true
      }
    },
    "senior-developer": {
      "permissions": {
        "defaultMode": "auto",
        "autoApprove": {
          "bash": ["npm *", "git *", "docker *"]
        }
      }
    },
    "devops": {
      "permissions": {
        "defaultMode": "auto",
        "autoApprove": {
          "bash": ["*"]
        }
      },
      "features": {
        "enableDeployment": true
      }
    }
  }
}
```

#### 审计日志配置

```json
{
  "auditLogging": {
    "enabled": true,
    "logLevel": "detailed",
    "events": [
      "command.execution",
      "file.access",
      "permission.grant",
      "permission.deny",
      "skill.execution",
      "error"
    ],
    "output": {
      "type": "syslog",
      "server": "logserver.example.com:514",
      "format": "json"
    }
  }
}
```

### MDM / 操作系统级策略

#### macOS (使用 MDM)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>ManagedSettings</key>
    <dict>
        <key>Permissions</key>
        <dict>
            <key>DefaultMode</key>
            <string>auto</string>
        </dict>
        <key>Security</key>
        <dict>
            <key>DisableTelemetry</key>
            <true/>
            <key>AllowedDomains</key>
            <array>
                <string>github.com</string>
                <string>example.com</string>
            </array>
        </dict>
    </dict>
</dict>
</plist>
```

#### Windows (使用 Group Policy)

```powershell
# Group Policy Object
# Path: Computer Configuration -> Administrative Templates -> Claude Code

# 禁用遥测
reg add "HKLM\SOFTWARE\Policies\Anthropic\Claude Code" /v DisableTelemetry /t REG_DWORD /d 1

# 设置默认权限模式
reg add "HKLM\SOFTWARE\Policies\Anthropic\Claude Code" /v DefaultPermissionMode /t REG_SZ /d "auto"

# 配置代理
reg add "HKLM\SOFTWARE\Policies\Anthropic\Claude Code" /v ProxyServer /t REG_SZ /d "proxy.example.com:8080"
```

### 合规性管理

#### SOC 2 / ISO 27001 配置

```json
{
  "compliance": {
    "framework": "SOC2",
    "controls": {
      "accessControl": {
        "requireAuthentication": true,
        "sessionTimeout": 30,
        "mfaRequired": true
      },
      "dataEncryption": {
        "inTransit": true,
        "atRest": true
      },
      "changeManagement": {
        "requireApproval": true,
        "auditTrail": true,
        "versionControl": true
      }
    }
  }
}
```

#### GDPR 合规

```json
{
  "gdpr": {
    "dataResidency": "eu",
    "rightToErasure": {
      "enabled": true,
      "retentionDays": 30
    },
    "consent": {
      "required": true,
      "version": "2.0"
    },
    "dataProcessing": {
      "purpose": "development-tools",
      "legalBasis": "legitimate-interest"
    }
  }
}
```

### 部署策略

#### 滚动部署

```
[阶段 1] 试点
→ 选择 5% 用户
→ 部署新配置
→ 监控 1 周
    ↓
[阶段 2] 逐步推广
→ 扩展到 25% 用户
→ 收集反馈
→ 修复问题
    ↓
[阶段 3] 全量部署
→ 推广到所有用户
→ 持续监控
```

#### 配置版本控制

```bash
# Git 仓库管理配置
claude-enterprise-configs/
├── production/
│   ├── managed-settings.json
│   ├── mobileconfig/
│   └── policies/
├── staging/
│   └── managed-settings.json
└── development/
    └── managed-settings.json

# 部署流程
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
# CI/CD 自动推送到 MDM
```

---

## 工作流与最佳实践

掌握 Claude Code 的核心工作模式，将极大提升开发效率。

### 代码审查工作流

#### 标准审查流程

```
User: 审查这个 PR 的代码变更

Claude:
→ 读取变更文件
→ 分析代码质量
→ 检查潜在问题
→ 提供改进建议

📋 审查报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 优点:
- 代码结构清晰
- 错误处理完善

⚠️ 需要改进:
- src/auth.js:45 - 未处理的 Promise rejection
- src/user.ts:120 - 缺少输入验证

💡 建议:
- 添加 try-catch 包装
- 使用 Zod 进行 schema 验证

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 自动化审查 Skill

创建审查 Skill 以标准化流程:

```markdown
# .claude/skills/code-review/instructions.md

## 代码审查检查清单

运行以下检查:
1. 运行 linter (`npm run lint`)
2. 运行类型检查 (`npm run type-check`)
3. 运行测试 (`npm test`)
4. 检查安全问题
5. 生成覆盖率报告

输出格式:
- 🔴 阻塞问题 (必须修复)
- 🟡 建议改进 (推荐修复)
- 🟢 良好实践 (值得肯定)
```

### 调试工作流

#### 系统化调试

```
User: 帮我调试这个 bug：用户登录失败

Claude:
[阶段 1] 信息收集
→ 查看错误日志
→ 检查相关代码
→ 了解复现步骤

[阶段 2] 问题定位
→ 分析错误堆栈
→ 检查数据流
→ 验证假设

[阶段 3] 修复验证
→ 实施修复
→ 添加测试
→ 验证修复

✓ Bug 已修复
原因: JWT token 验证时缺少 secret key
位置: src/auth.js:78
修复: 添加了环境变量检查
```

#### 调试最佳实践

**DO - 应该做的:**

1. **提供完整的错误信息**
   ```
   User: 调试这个错误

   ❌ 不好："不工作了"

   ✅ 好：
   "TypeError: Cannot read property 'map' of undefined
   at UserList.render (src/UserList.ts:45)
   复现步骤：打开用户列表页面"
   ```

2. **隔离问题**
   ```
   User: 帮我创建最小复现示例

   Claude:
   → 提取核心逻辑
   → 创建独立测试文件
   → 验证问题
   ```

### 重构工作流

#### 安全重构流程

```
User: 重构这个组件，提升性能

Claude:
[步骤 1] 理解代码
→ 分析组件结构
→ 识别性能瓶颈
→ 评估影响范围

[步骤 2] 制定计划
→ 使用规划模式
→ 列出重构步骤
→ 评估风险

[步骤 3] 执行重构
→ 小步迭代
→ 保持测试通过
→ 逐步优化

[步骤 4] 验证
→ 运行所有测试
→ 性能对比
→ 代码审查

✓ 重构完成
性能提升: 60%
测试: 全部通过
```

#### 重构检查清单

```markdown
## 重构前检查

- [ ] 备份当前代码
- [ ] 运行测试套件
- [ ] 记录当前性能指标
- [ ] 识别依赖关系

## 重构中检查

- [ ] 小步提交
- [ ] 每步运行测试
- [ ] 保持功能不变
- [ ] 更新文档

## 重构后检查

- [ ] 所有测试通过
- [ ] 性能提升验证
- [ ] 代码审查
- [ ] 更新 API 文档
```

### 项目开发流程

#### 项目启动流程

```
新项目开始
    ↓
[1] 创建 CLAUDE.md
→ 项目描述
→ 技术栈
→ 架构决策
→ 代码规范
    ↓
[2] 设置开发环境
→ 初始化项目
→ 配置 linter
→ 配置 testing
→ 设置 hooks
    ↓
[3] 创建基础结构
→ 文件夹结构
→ 配置文件
→ 示例代码
    ↓
[4] 开始开发
```

#### 功能开发流程

```
需求 → 设计 → 实现 → 测试 → 审查 → 部署

详细流程:

User: 实现用户认证功能

Claude:
[设计阶段]
→ 使用规划模式
→ 设计数据模型
→ 设计 API 接口
→ 设计错误处理

[实现阶段]
→ 创建数据模型
→ 实现 API 端点
→ 添加验证
→ 添加错误处理

[测试阶段]
→ 单元测试
→ 集成测试
→ E2E 测试

[审查阶段]
→ 代码审查
→ 性能检查
→ 安全检查

[部署阶段]
→ 部署脚本
→ 验证部署
→ 监控设置
```

### 安全实践

#### 安全检查清单

```
User: 进行安全审查

Claude:
→ 检查依赖漏洞
→ 检查输入验证
→ 检查认证授权
→ 检查数据加密
→ 检查 CORS 配置
→ 检查敏感信息泄露

安全报告：

🔴 高危问题:
- SQL 注入风险: src/user/query.js:45
- 硬编码密钥: .env.example:3

🟡 中危问题:
- 缺少 CSRF 保护
- 跨域配置过于宽松

💡 修复建议:
[详细修复步骤...]
```

#### 敏感信息保护

```bash
# 使用 .env.example 模板
cat > .env.example << EOF
# 敏感配置示例 - 不要提交真实密钥
DATABASE_URL=postgresql://user:password@localhost/db
API_SECRET_KEY=your-secret-key-here
JWT_SECRET=your-jwt-secret
EOF

# Git hooks 防止提交敏感信息
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# 检查是否有敏感信息
if git diff --cached | grep -q "password\|secret\|api_key"; then
  echo "警告：可能包含敏感信息！"
  exit 1
fi
EOF
```

---

## 监控与可观测性

在生产环境中使用 Claude Code，需要完善的监控和可观测性来确保性能和可靠性。

### 可观测性三大支柱

```
                    ┌─────────────────┐
                    │  可观测性平台    │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ↓                    ↓                    ↓
┌───────────┐         ┌───────────┐         ┌───────────┐
│  Metrics  │         │   Logs    │         │  Traces   │
│  指标     │         │   日志    │         │  链路追踪  │
└───────────┘         └───────────┘         └───────────┘
        │                    │                    │
        ↓                    ↓                    ↓
   [数值监控]          [事件记录]          [请求追踪]
   - CPU/内存          - 错误日志          - 调用链
   - 响应时间          - 审计日志          - 依赖关系
   - 成功率            - 调试日志          - 性能瓶颈
```

### 指标监控 (Metrics)

#### 关键性能指标

| 指标类型 | 具体指标 | 目标值 |
|---------|---------|--------|
| **性能** | 平均响应时间 | < 2s |
| **性能** | P95 响应时间 | < 5s |
| **可靠性** | 成功率 | > 99% |
| **可靠性** | 错误率 | < 1% |
| **资源** | Token 消耗 | 监控趋势 |
| **资源** | 内存使用 | < 阈值 |

#### 自定义指标追踪

```typescript
// Claude Code 使用指标
const metrics = {
  // 命令执行指标
  commands: {
    total: 'claude.commands.total',
    duration: 'claude.commands.duration',
    success: 'claude.commands.success'
  },

  // Token 使用指标
  tokens: {
    input: 'claude.tokens.input',
    output: 'claude.tokens.output',
    cost: 'claude.tokens.cost'
  },

  // 文件操作指标
  files: {
    read: 'claude.files.read',
    write: 'claude.files.write',
    size: 'claude.files.size'
  }
};
```

### 日志管理 (Logging)

#### 结构化日志配置

```javascript
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // 控制台输出
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    // 文件输出
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

module.exports = logger;
```

#### 事件日志记录

```javascript
// 记录命令执行
function logCommandExecution(command, result) {
  logger.info({
    event: 'command_execution',
    command: command.name,
    args: command.args,
    duration: result.duration,
    status: result.status,
    timestamp: new Date().toISOString()
  });
}

// 记录文件操作
function logFileOperation(operation, filePath, result) {
  logger.info({
    event: 'file_operation',
    operation, // 'read', 'write', 'delete'
    path: filePath,
    size: result.size,
    status: result.status,
    timestamp: new Date().toISOString()
  });
}
```

### 审计日志

```javascript
// audit-logger.js
class AuditLogger {
  constructor(logDir = 'logs/audit') {
    this.logDir = logDir;
  }

  log(action, user, details) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      user: user || 'system',
      details,
      sessionId: details.sessionId || 'N/A'
    };

    const logFile = path.join(
      this.logDir,
      `audit-${new Date().toISOString().split('T')[0]}.log`
    );

    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  }
}

// 使用示例
auditLogger.log('file_access', 'user@example.com', {
  filePath: '/path/to/secret.js',
  operation: 'read',
  sessionId: 'session-123'
});
```

### 告警配置

#### Prometheus 告警规则

```yaml
# alerts.yml
groups:
  - name: claude_code_alerts
    interval: 30s
    rules:
      # 高错误率告警
      - alert: HighErrorRate
        expr: |
          rate(claude_commands_total{status="error"}[5m])
          / rate(claude_commands_total[5m]) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Claude Code error rate is high"
          description: "Error rate is {{ $value | humanizePercentage }}"

      # 响应时间告警
      - alert: SlowResponseTime
        expr: |
          histogram_quantile(0.95, claude_commands_duration_bucket) > 5000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Claude Code response time is slow"
          description: "P95 response time is {{ $value }}ms"

      # Token 使用异常
      - alert: HighTokenUsage
        expr: |
          rate(claude_tokens_total[1h]) > 10000
        for: 10m
        labels:
          severity: info
        annotations:
          summary: "High token usage detected"
          description: "Consuming {{ $value }} tokens/hour"
```

### 会话分析

#### 使用统计

```
User: 显示会话统计

Claude:
📊 会话使用统计
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

时间范围: 最近 7 天

总会话数: 45
总时长: 12h 30m
平均时长: 16m/会话

最常用功能:
- 代码审查: 35%
- Bug 修复: 25%
- 新功能开发: 20%
- 文档编写: 10%
- 其他: 10%

设备分布:
- MacBook Pro: 60%
- iMac: 25%
- Windows: 15%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## CI/CD 集成

将 Claude Code 集成到 CI/CD 流水线，实现自动化代码审查、测试和部署。

### CI/CD 概览

```
┌──────────────────────────────────────────────────────┐
│                    CI/CD 流水线                        │
└──────────────────────────────────────────────────────┘

[Push/PR]
    ↓
┌─────────────┐
│  检出代码    │
└──────┬──────┘
       ↓
┌─────────────────────────────────────┐
│  Claude Code 自动化检查              │
│  ├─ 代码格式检查                     │
│  ├─ 类型检查                         │
│  ├─ Linting                         │
│  └─ 安全扫描                         │
└──────────────┬──────────────────────┘
               ↓
        ┌──────────────┐
        │  运行测试     │
        └──────┬───────┘
               ↓
┌─────────────────────────────────────┐
│  Claude Code 代码审查                │
│  ├─ 分析代码变更                     │
│  ├─ 检查最佳实践                     │
│  ├─ 识别潜在问题                     │
│  └─ 生成审查报告                     │
└──────────────┬──────────────────────┘
               ↓
        ┌──────────────┐
        │   构建       │
        └──────┬───────┘
               ↓
        ┌──────────────┐
        │   部署       │
        └──────────────┘
```

### GitHub Actions 集成

#### 基础 CI 流水线

```yaml
# .github/workflows/claude-ci.yml
name: Claude Code CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  claude-check:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 完整历史，用于更好的分析

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Claude Code
        run: |
          npm install -g @anthropic-ai/claude-code
          claude --version

      - name: Install dependencies
        run: npm ci

      - name: Run Claude Code checks
        run: |
          claude -p "Review this codebase for:
          - Code quality issues
          - Security vulnerabilities
          - Performance concerns
          Output a concise summary."
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: claude-results
          path: .claude/reports/
```

#### 代码审查工作流

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  pull-requests: write
  contents: read

jobs:
  code-review:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout PR
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Code Review
        id: review
        run: |
          claude -p --output-format json \
            "Review the changes in this PR. Focus on:
            - Code quality and readability
            - Potential bugs or edge cases
            - Security considerations
            - Test coverage
            
            Output as JSON with keys: summary, issues, suggestions" > review.json
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = JSON.parse(fs.readFileSync('review.json', 'utf8'));
            
            const body = `## 🤖 Claude Code Review
            
            ### Summary
            ${review.summary}
            
            ### Issues Found
            ${review.issues.map(i => `- **${i.severity}**: ${i.message}`).join('\n')}
            
            ### Suggestions
            ${review.suggestions.map(s => `- ${s}`).join('\n')}`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: body
            });
```

#### 安全扫描集成

```yaml
# .github/workflows/security-scan.yml
name: Claude Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # 每周日运行

jobs:
  security-scan:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run security scan
        run: |
          claude -p "Perform a security audit of this codebase:
          - Check for hardcoded secrets
          - Identify potential injection vulnerabilities
          - Review authentication/authorization patterns
          - Check for insecure dependencies
          
          Output findings as JSON." > security-report.json
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

      - name: Upload to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: security-report.json
```

### GitLab CI 集成

```yaml
# .gitlab-ci.yml
stages:
  - check
  - review
  - test
  - deploy

variables:
  CLAUDE_VERSION: "latest"

# Claude Code 代码检查
claude:check:
  stage: check
  image: node:20
  before_script:
    - npm install -g @anthropic-ai/claude-code
    - claude --version
  script:
    - npm ci
    - claude -p "Run code quality checks and output JSON report" > claude-report.json
  artifacts:
    reports:
      codequality: claude-report.json
    paths:
      - claude-report.json
    expire_in: 1 week

# Claude Code 审查
claude:review:
  stage: review
  image: node:20
  before_script:
    - npm install -g @anthropic-ai/claude-code
  script:
    - claude -p "Review merge request changes" > review.md
  artifacts:
    paths:
      - review.md
    expire_in: 1 week
  only:
    - merge_requests

# 安全扫描
claude:security:
  stage: check
  image: node:20
  before_script:
    - npm install -g @anthropic-ai/claude-code
  script:
    - claude -p "Security scan this codebase" > security-report.json
  artifacts:
    reports:
      sast: security-report.json
    paths:
      - security-report.json
  allow_failure: true
```

### Jenkins 集成

```groovy
// Jenkinsfile
pipeline {
    agent any

    environment {
        CLAUDE_HOME = tool 'claude-code'
        PATH = "${CLAUDE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Claude Check') {
            steps {
                sh 'npm ci'
                sh 'claude -p "Check code quality" > check-report.json'
            }
        }

        stage('Claude Review') {
            when {
                changeRequest()
            }
            steps {
                script {
                    def review = sh(
                        script: 'claude -p "Review changes" --output-format json',
                        returnStdout: true
                    )

                    // 保存审查结果
                    writeFile file: 'review.json', text: review

                    // 添加到构建信息
                    def reviewData = readJSON file: 'review.json'
                    currentBuild.displayName = "${currentBuild.displayName} (${reviewData.issues.size} issues)"
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            // 归档报告
            archiveArtifacts artifacts: '*.json,*.xml', allowEmptyArchive: true

            // 发布报告
            publishHTML([
                reportDir: '.claude/reports',
                reportFiles: 'index.html',
                reportName: 'Claude Code Report',
                keepAll: true
            ])
        }

        failure {
            // 发送通知
            emailext(
                subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Claude Code checks failed. Please check the report.",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
```

### CI/CD 最佳实践

#### DO - 应该做的

1. **缓存依赖**
   ```yaml
   - name: Cache dependencies
     uses: actions/cache@v4
     with:
       path: ~/.npm
       key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
   ```

2. **并行运行任务**
   ```yaml
   jobs:
     lint:
       runs-on: ubuntu-latest
     test:
       runs-on: ubuntu-latest
     type-check:
       runs-on: ubuntu-latest
   # 三个任务并行运行
   ```

3. **使用矩阵策略**
   ```yaml
   strategy:
     matrix:
       node-version: [18, 20, 22]
       os: [ubuntu-latest, windows-latest, macos-latest]
   ```

4. **保护敏感信息**
   ```yaml
   env:
     ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
   ```

#### DON'T - 避免做的

1. ❌ 在 CI 中运行交互式命令
2. ❌ 忽略失败的检查
3. ❌ 不设置超时
4. ❌ 浪费 API 配额

---

## 配置与设置

### 配置文件位置

1. **全局配置**: `~/.claude/config.json`
2. **项目配置**: `./.claude/config.json`
3. **用户配置**: `~/.config/claude-code/settings.json`

### 完整配置示例

**核心高级功能配置**:

```json
{
  "permissions": {
    "mode": "default"
  },
  "hooks": {
    "PreToolUse:Edit": "eslint --fix ${file_path}",
    "PostToolUse:Write": "~/.claude/hooks/security-scan.sh"
  },
  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      }
    }
  }
}
```

**扩展配置示例**:

```json
{
  "permissions": {
    "mode": "default",
    "allowedTools": ["Bash(git log:*)", "Read"],
    "disallowedTools": ["Bash(rm -rf:*)"]
  },

  "hooks": {
    "PreToolUse": [{ "matcher": "Edit", "hooks": ["eslint --fix ${file_path}"] }],
    "PostToolUse": [{ "matcher": "Write", "hooks": ["~/.claude/hooks/security-scan.sh"] }],
    "Stop": [{ "hooks": ["~/.claude/hooks/notify.sh"] }]
  },

  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_TOKEN": "${GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

### 环境变量

使用环境变量覆盖配置:

```bash
# 模型选择
export ANTHROPIC_MODEL=claude-opus-4-6
export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-6
export ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
export ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5

# API 配置
export ANTHROPIC_API_KEY=sk-ant-...

# 思考配置
export MAX_THINKING_TOKENS=16000
export CLAUDE_CODE_EFFORT_LEVEL=high

# 功能开关
export CLAUDE_CODE_DISABLE_AUTO_MEMORY=true
export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=true
export CLAUDE_CODE_DISABLE_CRON=1
export CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=true
export CLAUDE_CODE_DISABLE_TERMINAL_TITLE=true
export CLAUDE_CODE_DISABLE_1M_CONTEXT=true
export CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=true
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
export CLAUDE_CODE_ENABLE_TASKS=true
export CLAUDE_CODE_SIMPLE=true              # 由 --bare 标志设置

# MCP 配置
export MAX_MCP_OUTPUT_TOKENS=50000
export ENABLE_TOOL_SEARCH=true

# 任务管理
export CLAUDE_CODE_TASK_LIST_ID=my-project-tasks

# Agent teams（实验性）
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=true

# Subagent 和 plugin 配置
export CLAUDE_CODE_SUBAGENT_MODEL=sonnet
export CLAUDE_CODE_PLUGIN_SEED_DIR=./my-plugins
export CLAUDE_CODE_NEW_INIT=true

# 子进程和流式
export CLAUDE_CODE_SUBPROCESS_ENV_SCRUB="SECRET_KEY,DB_PASSWORD"
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80
export CLAUDE_STREAM_IDLE_TIMEOUT_MS=30000
export ANTHROPIC_CUSTOM_MODEL_OPTION=my-custom-model
export SLASH_COMMAND_TOOL_CHAR_BUDGET=50000
```

### 配置管理命令

```
User: /config
[打开交互配置菜单]
```

`/config` 命令提供交互菜单以切换设置，如:
- 扩展思考开/关
- 详细输出
- 权限模式
- 模型选择

### 每项目配置

在项目中创建 `.claude/config.json`:

```json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", "hooks": ["npm test && npm run lint"] }]
  },
  "permissions": {
    "mode": "default"
  },
  "mcp": {
    "servers": {
      "project-db": {
        "command": "mcp-postgres",
        "env": {
          "DATABASE_URL": "${PROJECT_DB_URL}"
        }
      }
    }
  }
}
```

## 立即尝试

### 🎯 练习 1: 规划模式实践

使用规划模式处理复杂功能:

```bash
# 进入规划模式
/plan

# 描述任务
"I need to implement user authentication with:
- JWT token generation
- Refresh token rotation
- Session management
- Rate limiting

Create a detailed implementation plan."

# Claude 创建计划文件
# 审查并修改计划

# 准备好后批准
# Claude 逐步执行
```

### 🎯 练习 2: 扩展思考用于复杂分析

切换扩展思考进行深度推理:

```bash
# 启用扩展思考（默认: 开）
# Option+T (macOS) 或 Alt+T (Windows/Linux)

# 需要深度推理的复杂任务
"Analyze whether we should adopt a microservices architecture. 
Consider:
- Current monolith complexity
- Team size and expertise
- Deployment frequency
- Performance requirements
- Long-term maintenance

Provide a thorough analysis with trade-offs."

# 扩展思考分配最多 32K tokens 用于推理
# 结果显示比标准响应更深入的分析
```

### 🎯 练习 3: 自定义权限基线

设置权限配置:

**步骤 1: 创建权限配置**
```json
// ~/.claude/settings.json
{
  "allowedTools": {
    "readOnly": [
      "Read", "Glob", "Grep", "Bash(git status)", "Bash(git log)"
    ],
    "development": [
      "Read", "Glob", "Grep", "Edit", "Write",
      "Bash(npm *)", "Bash(git *)", "Bash(node *)"
    ],
    "fullAccess": [
      "Read", "Glob", "Grep", "Edit", "Write", "Bash",
      "Agent", "TaskCreate", "WebFetch"
    ]
  }
}
```

**步骤 2: 切换配置**
```bash
# 在 Claude Code 中:
/permissions
# 选择配置: readOnly, development, 或 fullAccess
```

### 🎯 练习 4: Auto-Compact 用于长会话

在长会话中管理上下文窗口:

```bash
# 开始长分析会话
# 大量工作后:

# 手动压缩带焦点
/compact focus: authentication implementation

# Claude 总结:
# - 保留认证相关上下文
# - 移除偏离主题的讨论
# - 保留最近的工具调用

# 使用保留的上下文继续工作
```

### 🎯 练习 5: 组合高级功能

组合规划模式 + 扩展思考 + 权限:

```bash
# 首先设置严格权限
/permissions
# 选择: readOnly（用于分析阶段）

# 启用扩展思考
# Option+T

# 进入规划模式
/plan

# 复杂分析任务
"Analyze our codebase architecture and propose improvements.
I want:
1. Current architecture assessment
2. Identified bottlenecks
3. Improvement recommendations with priorities
4. Implementation roadmap

Use extended thinking for thorough analysis."

# 审查计划
# 准备好实现时切换权限
/permissions
# 选择: development

# 执行计划
```

### 🎯 练习 6: Auto-Mode 配置

设置自动模式切换:

**在 CLAUDE.md 中**:
```markdown
## Auto-Mode Rules

When I say "analyze" → use readOnly permissions
When I say "implement" → use development permissions  
When I say "experiment" → use fullAccess permissions

Auto-switch based on task type.
```

**测试**:
```bash
# 在 Claude Code 中:
"Analyze the authentication module"
# → 自动使用 readOnly 配置

"Implement rate limiting"
# → 自动使用 development 配置
```

---

## 最佳实践

### 规划模式
- ✅ 用于复杂多步骤任务
- ✅ 批准前审查计划
- ✅ 按需修改计划
- ❌ 不用于简单任务

### 扩展思考
- ✅ 用于架构决策
- ✅ 用于复杂问题解决
- ✅ 审查思考过程
- ❌ 不用于简单查询

### 后台任务
- ✅ 用于长时间运行操作
- ✅ 监控任务进度
- ✅ 妥善处理任务失败
- ❌ 不启动过多并发任务

### 权限
- ✅ 使用 `plan` 进行代码审查（只读）
- ✅ 使用 `default` 进行交互开发
- ✅ 使用 `acceptEdits` 进行自动化工作流
- ✅ 使用 `auto` 进行带安全护栏的自主工作
- ❌ 除非绝对必要，不使用 `bypassPermissions`

### 会话
- ✅ 为不同任务使用独立会话
- ✅ 保存重要会话状态
- ✅ 清理旧会话
- ❌ 不在同一会话中混合无关工作

---

## 实战 SOP

以下是从真实项目中总结的工作流程，帮助你在不同场景下高效使用 Claude Code。

### 老项目重构 SOP

当你接手一个历史悠久的代码库，需要重构但不敢轻易改动时：

**第一步：建立认知基线**
```
1. 让 Claude 通读 CLAUDE.md（如果有）
2. 运行 /init 生成项目文档
3. 让 Claude 阅读关键文件：package.json、tsconfig.json、README.md
4. 使用 Explore agent 摸清项目结构
```

**第二步：理解现状**
```
"这个项目的技术栈是什么？有哪些主要模块？"
"帮我理解 src/ 目录的结构和每个文件夹的作用"
"分析一下项目的依赖关系，哪些是核心依赖？"
```

**第三步：识别问题**
```
"找出代码中的技术债务，按优先级排序"
"哪些地方最需要重构？为什么？"
"有没有明显的性能瓶颈或安全隐患？"
```

**第四步：制定重构计划**
```
/plan 对 src/auth 模块进行重构
```

**第五步：开启 Worktree 保护**
```bash
claude --worktree
# 在独立分支上进行重构，不影响主分支
```

**第六步：增量重构**
```
"先写测试，覆盖 auth 模块的核心逻辑"
"现在开始重构，每次只改一个文件，跑一次测试"
"提交这次修改，然后继续下一个文件"
```

**成功要点：**
- 每次改动都要跑测试
- 频繁提交，小步快跑
- 使用 worktree 隔离
- 保留回退路径

### 快速迭代 SOP

适用于创业团队、PoC 项目、黑客马拉松：

**原则：速度 > 完美**

**配置 CLAUDE.md（极简版）：**
```markdown
# 快速迭代项目

## 技术栈
- Next.js 14 + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL

## 规则
- 速度优先，不要过度设计
- 临时方案可以接受，但要在代码里标注 TODO
- UI 使用 shadcn/ui，不要手写
- 测试只写关键路径
- 使用 acceptEdits 模式减少确认

## 命令
- npm run dev - 开发服务器
- npm test - 运行测试
- npx prisma studio - 数据库 GUI
```

**工作流程：**

1. **切换到 acceptEdits 模式**
```bash
# Shift+Tab 或直接设置
/permissions acceptEdits
```

2. **明确需求，一次性给足上下文**
```
实现用户注册功能：
- 邮箱 + 密码注册
- 邮箱验证码
- 密码强度校验
- 使用 resend.com 发邮件
参考 Figma 设计：https://figma.com/...
```

3. **一次性把文件读完**
```
"先读 src/auth/ 下的所有文件，理解现有实现"
```

4. **避免来回澄清，自己先想清楚**

**常见错误：**
- ❌ "帮我实现一个功能"（太模糊）
- ❌ "做一个登录页面"（缺少上下文）
- ✅ "实现邮箱登录，参考设计稿 https://... 使用 Prisma 存储，发送邮件用 resend"

### 新项目研发 SOP

从零开始构建一个新项目：

**第一步：创建 CLAUDE.md**
```bash
/init
```

**第二步：完善项目配置**
```markdown
# 项目名称

## 项目概述
- 一句话描述项目目标
- 目标用户是谁
- 核心价值是什么

## 技术决策
- 框架：Next.js 14（原因：SSR、App Router、性能好）
- 数据库：PostgreSQL（原因：关系型、成熟、Prisma 支持好）
- 样式：Tailwind CSS（原因：快速开发）
- 部署：Vercel（原因：一键部署、免费额度）

## 开发规范
- 文件命名：kebab-case
- 组件命名：PascalCase
- 每个组件一个文件夹
- 测试覆盖率要求：70%

## API 设计规范
- RESTful
- 统一响应格式：{ success, data, error }
- 错误码定义在 docs/error-codes.md

## Git 工作流
- 分支命名：feature/xxx, fix/xxx
- 提交信息：feat/fix/refactor/docs: xxx
- PR 需要 1 个 approve
```

**第三步：搭建项目骨架**
```
"初始化 Next.js 项目，配置 TypeScript、Tailwind、ESLint、Prettier"
"安装并配置 Prisma"
"创建基础目录结构：src/app, src/components, src/lib, src/types"
"配置 CI/CD（GitHub Actions）"
```

**第四步：先写类型定义**
```
"根据产品需求，定义核心类型（User、Product、Order 等）放在 src/types/"
```

**第五步：规划模式实现核心功能**
```bash
/plan 实现用户系统
# 审查计划
# 执行
```

**第六步：提交记忆**
```
# 项目使用 Server Actions，不要写 API Routes
# 用户头像使用 Cloudinary 存储
# 所有日期使用 dayjs 处理
```

### 常见报错与解决

**1. 上下文太长**

症状：
```
Context length exceeded
Rate limited
```

解决方案：
```bash
# 手动压缩
/compact focus: 核心任务

# 或者开启自动压缩（默认 95% 触发）
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80
```

**2. 工具调用失败**

症状：
```
Tool execution failed
Permission denied
```

解决方案：
```bash
# 检查权限模式
/permissions

# 切换到合适的模式
# default - 每次操作都需要确认
# acceptEdits - 自动接受文件修改
# plan - 只读，用于分析
```

**3. 找不到文件**

症状：
```
File not found
No such file or directory
```

解决方案：
```
# 让 Claude 先用 Glob 查找
"用 Glob 找一下 auth 相关的文件"

# 或者直接告诉它路径
"文件在 src/services/auth.service.ts"
```

**4. 测试不通过**

症状：
```
Tests failed
AssertionError
```

解决方案：
```
# 让 Claude 自己调试
"运行测试，找出失败原因，修复它"

# 使用 debugger agent
"用 debugger agent 分析测试失败原因"
```

**5. 依赖安装失败**

症状：
```
npm ERR!
peer dependency
```

解决方案：
```
"检查 package.json 的依赖版本兼容性"
"清理 node_modules 和 lock 文件，重新安装"
```

**6. Git 操作问题**

症状：
```
Merge conflict
Detached HEAD
```

解决方案：
```
# 让 Claude 帮你解决
"帮我解决合并冲突"

# 或者回到干净状态
"放弃当前修改，回到上一个提交"
```

**7. 内存不足**

症状：
```
JavaScript heap out of memory
FATAL ERROR
```

解决方案：
```bash
# 增加 Node 内存
export NODE_OPTIONS="--max-old-space-size=4096"

# 或者分批处理
"分批读取这个大文件，每次 100 行"
```

---

## 更多资源

了解更多关于 Claude Code 和相关功能:

- [官方交互模式文档](https://code.claude.com/docs/en/interactive-mode)
- [官方 Headless Mode 文档](https://code.claude.com/docs/en/headless)
- [CLI 参考](https://code.claude.com/docs/en/cli-reference)
- [Checkpoints 指南](../08-checkpoints/) - 会话管理和回退
- [Slash Commands](../01-slash-commands/) - 命令参考
- [Memory 指南](../02-memory/) - 持久上下文
- [Skills 指南](../03-skills/) - 自主能力
- [Subagents 指南](../04-subagents/) - 委托任务执行
- [MCP 指南](../05-mcp/) - 外部数据访问
- [Hooks 指南](../06-hooks/) - 事件驱动自动化
- [Plugins 指南](../07-plugins/) - 打包扩展
- [官方定时任务文档](https://code.claude.com/docs/en/scheduled-tasks)
- [官方 Chrome 集成文档](https://code.claude.com/docs/en/chrome)
- [官方远程控制文档](https://code.claude.com/docs/en/remote-control)
- [官方键绑定文档](https://code.claude.com/docs/en/keybindings)
- [官方桌面应用文档](https://code.claude.com/docs/en/desktop)