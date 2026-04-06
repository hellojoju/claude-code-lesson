---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

> 🔴 **高级** | ⏱ 120 分钟
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证: 2026-04-06

**你将掌握:** 自定义系统提示、权限模式深度配置、性能调优等高级定制能力。

# 高级功能

## 为什么需要这个？

"我想深度定制 Claude 的行为。"

默认的 Claude Code 已经很强大，但在实际项目中，你可能需要：

- **项目特定的上下文** — 让 Claude 理解你的技术栈、编码规范、架构决策
- **精细的权限控制** — 不同场景下不同的操作权限
- **性能优化** — 在长会话中保持响应速度，控制 token 消耗
- **自动化工作流** — 减少重复确认，提升开发效率

当你从"会用 Claude Code"进阶到"驾驭 Claude Code"，就需要了解这些高级定制能力。

---

## 核心概念

Claude Code 的高级定制围绕三个维度展开：

```
┌─────────────────────────────────────────────────────────────┐
│                    高级定制三维模型                           │
└─────────────────────────────────────────────────────────────┘

        ┌───────────┐
        │  上下文   │  ← 项目知识、编码规范、架构决策
        │ Context   │     CLAUDE.md、skills、memory
        └─────┬─────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│    权限        ← 操作边界、自动化程度                 │
│    Permissions    default/acceptEdits/plan/auto              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
              │
              ▼
        ┌───────────┐
        │  性能     │  ← token 预算、上下文压缩、模型选择
        │ Perf     │     extended thinking、effort level
        └───────────┘
```

### 定制层级

| 层级 | 配置位置 | 影响范围 | 示例 |
|------|---------|---------|------|
| **全局** | `~/.claude/settings.json` | 所有项目 | 默认模型、全局 hooks |
| **项目** | `.claude/config.json` | 当前项目 | 项目 MCP、项目 hooks |
| **会话** | Slash commands / 环境变量 | 当前会话 | 权限模式、effort level |
| **临时** | 键盘快捷键 | 即时生效 | 切换扩展思考、权限模式 |

---

## 场景 1：自定义系统提示

### 问题情境

你接手了一个 React + TypeScript 项目，想让 Claude：

- 遵循项目的编码规范（函数式组件、hooks 优先）
- 知道技术栈细节（React 18、Zustand、Tailwind）
- 理解架构决策（为什么选择 monorepo）

默认的 Claude 不了解这些，每次都要重新解释。怎么办？

### 解决方案：CLAUDE.md 深度定制

CLAUDE.md 是 Claude 的"项目记忆"，让它在每次对话都携带项目上下文。

#### Step 1：创建结构化 CLAUDE.md

```markdown
# CLAUDE.md — React Dashboard 项目

## 项目概述
企业级 React 数据仪表盘，用于展示实时业务指标。

## 技术栈
- React 18 + TypeScript 5
- Zustand（状态管理）— 原因：轻量、无 Provider 包裹
- Tailwind CSS — 原因：快速开发、一致性设计
- Vite — 原因：开发服务器快、HMR 稳定
- React Query — 数据获取和缓存

## 编码规范
- 组件命名：PascalCase，文件名 kebab-case
- 每个组件一个文件夹：`components/button/Button.tsx`
- 函数式组件 + hooks，不使用 class
- Props 用 interface 定义，命名以 Props 结尾
- 样式用 Tailwind utility classes，不写 inline style

## 架构决策
- Monorepo 结构：packages/ 下包含 shared、ui、dashboard
- 不使用 Redux：团队规模小，Zustand 足够
- SSR 暂不考虑：性能要求不高

## 常用命令
- `npm run dev` — 开发服务器
- `npm test` — Vitest 测试
- `npm run lint` — ESLint 检查

## 重要约定
- 所有 API 调用放在 `services/` 目录
- 类型定义放在 `types/` 目录
- 不要直接修改 package.json，先讨论
```

#### Step 2：验证 Claude 是否理解

```
User: 我们项目的组件命名规范是什么？

Claude: 根据 CLAUDE.md：
- 组件命名：PascalCase（如 Button、UserCard）
- 文件名：kebab-case（如 button.tsx、user-card.tsx）
- 目录结构：每个组件一个文件夹，如 components/button/Button.tsx

User: 为什么选择 Zustand 而不是 Redux？

Claude: 项目选择了 Zustand 作为状态管理，原因：
- 团队规模小，不需要 Redux 的复杂架构
- Zustand 轻量、无 Provider 包裹，使用简单
- 响应式更新更直观
```

#### Step 3：动态更新 CLAUDE.md

在开发过程中发现新的约定，及时更新：

```markdown
## 新增约定（2026-04-06）
- 使用 React Query 的 useQuery 替代 useEffect + fetch
- 错误处理统一用 toast notification，放在 ErrorBoundary
```

### 进阶：自定义 Skills

Skills 是可复用的任务模板，让 Claude 执行特定工作流。

#### 示例：代码审查 Skill

```markdown
# .claude/skills/code-review/instructions.md

## 代码审查检查清单

每次审查代码时执行：

1. **运行静态检查**
   - `npm run lint` — ESLint
   - `npm run type-check` — TypeScript

2. **检查编码规范**
   - 组件命名是否遵循 PascalCase
   - 是否使用了 hooks 而非 class
   - Props 是否用 interface 定义

3. **检查性能**
   - 是否有不必要的 re-render
   - 是否缺少 memo/useMemo/useCallback

4. **检查安全**
   - 用户输入是否验证
   - API 密钥是否硬编码

## 输出格式

🔴 阻塞问题 (必须修复)
🟡 建议改进 (推荐修复)
🟢 良好实践 (值得肯定)
```

使用 Skill：

```
User: /code-review 审查 src/components/user-list/

Claude: 执行代码审查 skill...

✅ 运行 lint: 通过
✅ 运行 type-check: 通过

🟡 建议改进:
- UserList.tsx:45 — 组件缺少 memo，可能导致不必要的 re-render
- UserList.tsx:78 — onSelect 回调缺少 useCallback

🟢 良好实践:
- Props 定义清晰，interface UserListProps 结构良好
- 错误处理完善，使用 ErrorBoundary 包裹
```

---

## 场景 2：权限模式深度配置

### 问题情境

不同工作场景需要不同的权限级别：

- **代码审查** — 只需要读取文件，不需要修改权限
- **日常开发** — 需要修改文件，但部署命令要确认
- **自动化任务** — 执行批量操作，减少确认次数
- **危险操作** — 强制推送、删除生产数据，必须阻止

默认模式要么太严格（每步确认），要么太宽松（风险高）。怎么办？

### 解决方案：理解并配置权限模式

Claude Code 提供 6 种权限模式：

| 模式 | 适合场景 | Claude 能做什么 |
|------|---------|----------------|
| `default` | 交互开发 | 读取文件自由，其他操作需确认 |
| `acceptEdits` | 结对编程 | 读取+编辑自由，命令需确认 |
| `plan` | 代码审查 | 仅读取，不修改（研究模式） |
| `auto` | 自主工作 | 所有操作 + 后台安全分类器（需 Team Plan） |
| `bypassPermissions` | CI/CD | 全部放行（危险，仅用于自动化） |
| `dontAsk` | 限制模式 | 仅执行预批准工具，其他全部拒绝 |

#### Step 1：切换权限模式

**键盘快捷键**（推荐）：
```
Shift + Tab  # 切换所有 6 种模式
Alt + M      # Windows/Linux
```

**Slash command**：
```
/plan        # 进入规划模式（只读）
```

**CLI 标志**：
```bash
claude --permission-mode plan    # 启动时进入规划模式
claude --permission-mode auto    # 启动时进入 auto mode
```

#### Step 2：实战场景对比

**场景 A：代码审查（Plan Mode）**

```
User: claude --permission-mode plan
User: 审查这个 PR，给出改进建议

Claude: [读取文件]
        [分析代码]
        [输出建议]

✅ 不修改任何文件
✅ 不执行任何命令
→ 适合审查，安全边界明确
```

**场景 B：日常开发（Default Mode）**

```
User: 修复 auth 模块的 bug

Claude: 需要修改 src/auth.ts
        变更内容：添加错误处理

        Approve this change? (yes/no/show)

User: yes

Claude: [修改文件]

User: 运行测试

Claude: 需要执行 npm test
        Approve? (yes/no)

→ 每步确认，适合交互开发
```

**场景 C：批量重构（AcceptEdits Mode）**

```
User: Shift+Tab 切换到 acceptEdits
User: 重构所有组件使用 memo

Claude: [读取所有组件]
        [逐个添加 memo]
        [无需确认每个修改]

        完成：修改了 15 个组件

User: 运行 lint

Claude: 需要执行 npm run lint
        Approve? (yes/no)

→ 编辑自由，命令仍需确认
```

#### Step 3：自定义权限规则

当预设模式不够精细时，用 `allowedTools` 自定义：

```json
// ~/.claude/settings.json
{
  "allowedTools": [
    // 读取操作 — 全部放行
    "Read(*)",
    "Glob(*)",
    "Grep(*)",

    // 文件编辑 — 仅限特定目录
    "Edit(src/components/*)",
    "Edit(src/lib/*)",
    "Write(src/components/*)",
    "Write(src/lib/*)",

    // Git 操作 — 安全命令放行
    "Bash(git status:*)",
    "Bash(git log:*)",
    "Bash(git diff:*)",
    "Bash(git branch:*)",
    "Bash(git checkout:*)",

    // npm 操作 — 常用命令放行
    "Bash(npm run dev:*)",
    "Bash(npm test:*)",
    "Bash(npm run lint:*)",

    // 阻止危险操作 — 不在列表中的默认拒绝
    // Bash(rm -rf:*) → 需确认
    // Bash(git push --force:*) → 需确认
  ]
}
```

#### Step 4：等效 Auto-Mode 配置（无 Team Plan）

Auto Mode 需要 Team Plan 和后台安全分类器。如果没有，可以用权限规则模拟类似效果：

**使用脚本配置保守基线**：

```bash
# 预览将要添加的内容
python3 09-advanced-features/setup-auto-mode-permissions.py --dry-run

# 应用保守基线（只读 + 本地检查）
python3 09-advanced-features/setup-auto-mode-permissions.py

# 添加编辑能力
python3 09-advanced-features/setup-auto-mode-permissions.py --include-edits

# 添加测试能力
python3 09-advanced-features/setup-auto-mode-permissions.py --include-tests

# 添加 git 写入能力
python3 09-advanced-features/setup-auto-mode-permissions.py --include-git-write

# 添加包安装能力
python3 09-advanced-features/setup-auto-mode-permissions.py --include-packages
```

脚本添加的规则类别：

| 类别 | 示例规则 |
|------|---------|
| 核心只读工具 | `Read(*)`, `Glob(*)`, `Grep(*)` |
| 本地检查 | `Bash(git status:*)`, `Bash(git log:*)` |
| 可选编辑 | `Edit(*)`, `Write(*)` |
| 可选测试 | `Bash(pytest:*)`, `Bash(npm test:*)` |
| 可选 git 写入 | `Bash(git add:*)`, `Bash(git commit:*)` |
| 可选包管理 | `Bash(npm install:*)`, `Bash(pip install:*)` |

危险操作（`rm -rf`、`sudo`、强制推送、`DROP TABLE`）被有意排除。

---

## 场景 3：性能调优

### 问题情境

长会话中遇到以下问题：

- **上下文太长** — Claude 说 "context length exceeded"
- **响应变慢** — 每次回复等待时间增加
- **Token 消耗高** — API 费用超出预期
- **推理质量下降** — 复杂问题的答案不如开始时准确

需要优化性能，保持高效工作流。

### 解决方案：上下文管理 + 扩展思考配置

#### Step 1：理解上下文窗口

Claude Code 的上下文窗口有限（约 200K tokens）。当对话内容累积过多：

```
[开始] Context: 10K tokens
[工作 1h] Context: 50K tokens
[工作 2h] Context: 100K tokens
[工作 3h] Context: 180K tokens → 开始压缩
[工作 4h] Context: 195K tokens → 接近上限
```

**压缩策略**：
- 默认：达到 95% 时自动压缩
- 手动：`/compact` 命令触发压缩
- 定焦：`/compact focus: authentication` 保留特定主题上下文

#### Step 2：手动压缩带焦点

```
User: /compact focus: authentication implementation

Claude: 压缩上下文...

保留内容：
- authentication 模块相关讨论
- 最近 20 个工具调用
- 关键决策和结论

移除内容：
-偏离主题的讨论
- 过时的中间状态
- 冗余的描述

压缩后 Context: 80K tokens（从 180K）
```

#### Step 3：调整自动压缩阈值

```bash
# 降低阈值，提前压缩（如 80%）
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80

# 提高阈值，延后压缩（如 98%）
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=98
```

#### Step 4：扩展思考配置

扩展思考让 Claude 进行深度推理，但消耗额外 tokens。

**切换扩展思考**：
```
Option + T (macOS) / Alt + T (Windows/Linux)
Ctrl + O  # 查看推理过程（详细模式）
```

**设置思考预算**：
```bash
# 默认最多 31,999 tokens
# 降低预算以节省 tokens
export MAX_THINKING_TOKENS=10000

# 提高预算以获得更深度推理
export MAX_THINKING_TOKENS=25000
```

**设置努力级别**（仅 Opus 4.6）：
```bash
# low (○), medium (◐), high (●), max
export CLAUDE_CODE_EFFORT_LEVEL=high
```

或在会话中：
```
/effort high    # 深度推理
/effort low     # 快速响应
```

#### Step 5：模型选择策略

根据任务选择合适的模型：

| 模型 | 适合场景 | 特点 |
|------|---------|------|
| **Haiku 4.5** | 快速迭代、简单任务 | 90% Sonnet 能力，3x 成本节省 |
| **Sonnet 4.6** | 日常开发、主要工作 | 最佳编码模型 |
| **Opus 4.6** | 架构决策、复杂问题 | 最深度推理 |

**切换模型**：
```
Option + P / Alt + P    # 切换模型
```

**CLI 指定模型**：
```bash
claude --model claude-sonnet-4-6 "implement feature"
claude --model claude-opus-4-6 "architectural review"
claude --model claude-haiku-4-5 "quick fix"
```

**规划模型别名**（Opus 规划 + Sonnet 执行）：
```bash
claude --model opusplan "design and implement new API"
# → Opus 4.6 用于规划阶段
# → Sonnet 4.6 用于实现阶段
```

#### Step 6：后台任务释放对话

长时间操作放到后台，不阻塞对话：

```
User: Run tests in background

Claude: Started task bg-1234

User: Meanwhile, let's refactor the auth module

Claude: [在测试后台运行时处理 auth 模块]

[10分钟后]

Claude: 📢 Background task bg-1234 completed:
        ✅ 245 tests passed
        ❌ 3 tests failed

User: /task show bg-1234
Claude: [显示测试输出]
```

后台任务管理：
```
/task list           # 显示所有任务
/task status bg-1234 # 检查进度
/task show bg-1234   # 查看输出
/task cancel bg-1234 # 取消任务
```

---

## 🎯 Try It Now

### 练习 1：创建项目 CLAUDE.md

**目标**：让 Claude 理解你的项目

```bash
# 在项目根目录创建 CLAUDE.md
# 内容包括：技术栈、编码规范、架构决策

# 测试 Claude 是否理解
"我们项目的组件命名规范是什么？"
"为什么选择这个技术栈？"
```

### 练习 2：权限模式切换

**目标**：掌握权限模式的实际应用

```bash
# 1. 代码审查场景
claude --permission-mode plan
"审查 src/auth 模块，给出改进建议"

# 2. 批量编辑场景
# Shift+Tab 切换到 acceptEdits
"重构所有组件添加 memo"

# 3. 回到交互开发
# Shift+Tab 切换到 default
```

### 练习 3：上下文压缩

**目标**：长会话中保持性能

```bash
# 开始一个复杂任务
"实现用户认证系统：JWT + 刷新token + 会话管理"

# 工作一段时间后
# 手动压缩
/compact focus: authentication

# 查看压缩结果
# 继续工作
```

### 练习 4：扩展思考控制

**目标**：复杂问题获得深度推理

```bash
# 启用扩展思考（默认开启）
# Option+T 切换

# 提问需要深度推理的问题
"分析我们是否应该迁移到 microservices，
考虑：团队规模、DevOps 资源、未来扩展需求"

# 查看推理过程
Ctrl + O
```

### 练习 5：组合高级功能

**目标**：综合运用多种高级能力

```bash
# 1. 设置只读权限（分析阶段）
claude --permission-mode plan

# 2. 启用扩展思考
# Option+T

# 3. 提交复杂分析任务
"分析代码库架构，识别瓶颈，提出改进方案"

# 4. 审查完成后切换权限（实现阶段）
# Shift+Tab 切换到 acceptEdits

# 5. 执行改进
"根据方案优化性能瓶颈"
```

---

## 常见问题

### Q1: CLAUDE.md 多长合适？

建议控制在 500-2000 字。过长会消耗上下文，过短信息不足。

核心内容：
- 技术栈 + 选择原因
- 编码规范（命名、结构）
- 常用命令
- 重要约定

### Q2: 权限模式如何选择？

**决策树**：

```
开始
  │
  ▼
需要修改文件？
  ├─ No → plan（只读）
  │
  └─ Yes
      │
      ▼
    批量操作？
      ├─ No → default（交互）
      │
      └─ Yes
          │
          ▼
        命令需要确认？
          ├─ Yes → acceptEdits（编辑自由）
          │
          └─ No → auto（自主）
```

### Q3: 上下文压缩后丢失了关键信息？

使用定焦压缩：

```
/compact focus: authentication implementation
```

只保留特定主题的上下文。

或使用 Checkpoints（08-checkpoints 模块）保存会话状态。

### Q4: 扩展思考是否总是需要？

不需要。简单任务关闭扩展思考可以节省 tokens：

```
Option + T 切换
/effort low 快速响应
```

复杂问题才启用：
- 架构决策
- 复杂 bug 分析
- 多方案权衡

### Q5: 如何查看当前配置？

```
/config    # 打开交互配置菜单
```

可以查看和切换：
- 扩展思考开/关
- 权限模式
- 模型选择
- 详细输出

### Q6: 配置文件的优先级？

```
全局 ~/.claude/settings.json
  ↓ 被覆盖
项目 .claude/config.json
  ↓ 被覆盖
会话环境变量
  ↓ 被覆盖
临时快捷键
```

具体覆盖通用。

### Q7: 后台任务失败了怎么办？

查看详细输出：

```
/task show bg-1234
```

任务输出包含错误信息，根据错误类型修复。

### Q8: 如何禁用某个功能？

环境变量控制：

```bash
# 禁用扩展思考（不推荐）
export MAX_THINKING_TOKENS=0

# 禁用自动压缩
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=99

# 禁用提示建议
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false

# 禁用定时任务
export CLAUDE_CODE_DISABLE_CRON=1
```

---

## 快速参考

### 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Shift+Tab` | 切换权限模式 |
| `Option+T` / `Alt+T` | 切换扩展思考 |
| `Option+P` / `Alt+P` | 切换模型 |
| `Ctrl+O` | 查看推理过程 |
| `Ctrl+T` | 切换任务列表 |
| `Ctrl+B` | 后台运行任务 |
| `Ctrl+G` | 外部编辑计划 |
| `Esc+Esc` | 回退操作 |

### Slash Commands

```
/plan           # 进入规划模式（只读）
/compact        # 压缩上下文
/compact focus: # 定焦压缩
/effort high    # 设置努力级别
/config         # 打开配置菜单
/task list      # 显示后台任务
/sandbox        # 启用沙箱
```

### CLI 标志

```bash
claude --permission-mode plan    # 规划模式
claude --permission-mode auto    # 自动模式
claude --model opusplan          # Opus 规划 + Sonnet 执行
claude --sandbox                 # 启用沙箱
claude -p                        # Print mode（非交互）
claude --worktree                # Git worktree 隔离
claude --remote                  # Web 会话
```

### 环境变量

```bash
MAX_THINKING_TOKENS=16000        # 思考预算
CLAUDE_CODE_EFFORT_LEVEL=high    # 努力级别
CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80  # 压缩阈值
CLAUDE_CODE_TASK_LIST_ID=my-project  # 任务列表 ID
```

---

## 下一章预告

> **"我要在生产环境使用"**

掌握了高级定制能力后，下一步是将 Claude Code 部署到生产环境：

- **企业部署** — MDM、托管设置、SSO 集成
- **CI/CD 集成** — GitHub Actions、自动化代码审查
- **安全合规** — SOC2、GDPR、审计日志
- **监控可观测性** — 指标、日志、链路追踪

继续阅读 **14-enterprise** 模块，了解企业级部署最佳实践。

---

## 更多资源

- [官方交互模式文档](https://code.claude.com/docs/en/interactive-mode)
- [官方 Headless Mode 文档](https://code.claude.com/docs/en/headless)
- [CLI 参考](https://code.claude.com/docs/en/cli-reference)
- [Checkpoints 指南](../08-checkpoints/) — 会话管理和回退
- [Memory 指南](../02-memory/) — 持久上下文配置
- [Hooks 指南](../06-hooks/) — 事件驱动自动化
- [官方键绑定文档](https://code.claude.com/docs/en/keybindings)
- [官方定时任务文档](https://code.claude.com/docs/en/scheduled-tasks)