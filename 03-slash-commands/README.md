---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

> 🟢 **初级** | ⏱ 40 分钟
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证：2026-04-06

**你将学会：** 使用 Slash 命令一键触发常用任务，告别重复输入。

# Slash Commands

## 为什么需要这个？

上一章，你学会了如何和 Claude 高效交互。但你可能发现：

- 每次代码审查都要输入完整的指令
- 提交代码时总是忘记某些检查步骤
- 搜索代码时不知道用什么参数
- 一些常用操作，每次都要从头描述

**Slash 命令就是解决方案。** 输入 `/` 加一个简短命令，就能触发预设好的完整任务流程。

```bash
# 不用这样
> 请帮我审查当前分支的所有代码，检查代码风格、安全问题和性能问题...

# 只需这样
> /review
```

这一章，我们学习最实用的 Slash 命令，让你的工作效率翻倍。

## 核心概念：命令即任务模板

Slash 命令是预设的任务模板。每个命令封装了：

- **完整指令**：你不用重复输入长文本
- **上下文收集**：自动获取 git 状态、文件内容等
- **执行流程**：按步骤完成任务

```mermaid
graph LR
    A["输入 /review"] --> B["加载预设模板"]
    B --> C["收集上下文<br>git status<br>git diff"]
    C --> D["执行审查流程"]
    D --> E["输出结果"]
```

**命令类型：**

| 类型 | 来源 | 示例 |
|------|------|------|
| 内置命令 | Claude Code 提供 | `/help`, `/clear`, `/compact` |
| 内置 Skills | Claude Code 提供 | `/debug`, `/simplify`, `/loop` |
| 自定义 Skills | 你自己创建 | `/review`, `/commit`, `/pr` |
| 插件命令 | 安装的插件 | `/frontend-design:design` |
| MCP 命令 | MCP servers | `/mcp__github__list_prs` |

输入 `/` 可以看到所有可用命令，输入 `/` 加字母可以筛选。

## 实战场景

### 场景 1：代码审查 `/review`

**问题：** 你刚完成一个功能，想检查代码质量，但每次审查都要输入一堆检查项。

**解决方案：** 使用 `/review` 命令（需安装 code-review 插件或自定义 skill）。

```bash
# 在 Claude Code 中
> /review

# Claude 会自动：
# 1. 收集当前分支的更改
# 2. 检查代码风格
# 3. 检查安全问题
# 4. 检查性能问题
# 5. 生成审查报告
```

**内置替代方案：** 如果没有安装插件，可以用 `/simplify`：

```bash
> /simplify

# 检查已更改文件的代码质量
```

**安全审查：** 检查安全漏洞：

```bash
> /security-review

# 专门检查：
# - 硬编码密钥
# - SQL 注入风险
# - XSS 漏洞
# - 权限问题
```

**效果：** 一键完成原本需要 5 分钟的手动审查。

### 场景 2：提交代码 `/commit`

**问题：** 提交代码时，你总是忘记检查某些事项，或者 commit message 写得不够规范。

**解决方案：** 使用 `/commit` skill（需配置，见附录）。

```bash
> /commit

# Claude 会自动：
# 1. 检查 git status
# 2. 检查是否有敏感文件
# 3. 分析更改内容
# 4. 生成规范的 commit message
# 5. 等待你确认后提交
```

**一个配置好的 `/commit` skill 示例：**

```yaml
---
name: commit
description: 创建带上下文的 git commit
allowed-tools: Bash(git *)
---

## 上下文

- 当前 git 状态：!`git status`
- 当前 git diff：!`git diff HEAD`
- 当前分支：!`git branch --show-current`
- 最近提交：!`git log --oneline -5`

## 你的任务

基于以上更改，创建一个 git commit。
```

**Try It Now：**

```bash
# 1. 做一些代码更改
# 2. 在 Claude Code 中运行
> /commit

# 3. 观察 Claude 自动收集的上下文
# 4. 检查生成的 commit message
# 5. 确认提交
```

### 场景 3：搜索代码 `/grep`

**问题：** 你想搜索代码中的某个模式，但不知道 `grep` 的各种参数。

**解决方案：** 直接描述你的搜索意图，Claude 会帮你搜索。

```bash
# 不用记住 grep 参数
> 搜索所有使用了 useState 的文件

# Claude 会自动使用 Grep 工具
# 返回所有匹配的文件和行号
```

**更精准的搜索：**

```bash
# 搜索特定模式
> 搜索代码中的所有 API 端点定义

# 搜索特定文件类型
> 在所有 .ts 文件中搜索 "interface User"

# 搜索并分析
> 搜索所有 console.log，帮我判断哪些需要保留
```

**Claude 的搜索能力：**

| 你说 | Claude 做什么 |
|------|---------------|
| "搜索 XXX" | 用 Grep 工具搜索 |
| "找到所有 XXX 文件" | 用 Glob 工具找文件 |
| "查看 XXX 文件" | 用 Read 工具读文件 |

**Tip：** 不需要专门记住搜索命令，直接用自然语言描述即可。

## 🎯 Try It Now

### 练习 1：探索内置命令

```bash
# 1. 启动 Claude Code
claude

# 2. 输入 / 查看所有命令
> /

# 3. 尗试几个常用命令
> /help        # 查看帮助
> /status      # 查看当前状态
> /cost        # 查看 token 使用情况

# 4. 输入 /c 篮选以 c 开头的命令
> /c
# 会显示：/clear, /compact, /config, /copy, /cost...
```

### 练习 2：对话管理

```bash
# 对话太长了？压缩它
> /compact

# 想清空重新开始？
> /clear

# 想回退之前的操作？
> /rewind

# 想导出对话？
> /export my-session.md
```

### 练习 3：诊断问题

```bash
# Claude Code 有问题？运行诊断
> /doctor

# 会检查：
# - 系统环境
# - 安装完整性
# - 网络连接
# - 认证状态
```

### 练习 4：创建你的第一个 Skill

```bash
# 创建 skills 目录
mkdir -p .claude/skills/hello

# 创建 SKILL.md 文件
# 内容如下：
```

```yaml
---
name: hello
description: 问候用户并显示项目状态
---

# Hello!

热情问候用户，并显示：
1. 当前时间和日期
2. 当前 git 分支：!`git branch --show-current`
3. 最近更改：!`git log --oneline -3`

建议用户今天可以做什么。
```

```bash
# 测试你的 skill
> /hello
```

## 常用命令速查

**日常最常用的 10 个命令：**

| 命令 | 作用 | 示例 |
|------|------|------|
| `/help` | 查看帮助 | `/help` |
| `/clear` | 清空对话 | `/clear` |
| `/compact` | 压缩对话历史 | `/compact` |
| `/status` | 显示状态 | `/status` |
| `/cost` | Token 使用统计 | `/cost` |
| `/doctor` | 诊断问题 | `/doctor` |
| `/model` | 切换模型 | `/model` |
| `/config` | 打开设置 | `/config` |
| `/export` | 导出对话 | `/export session.md` |
| `/exit` | 退出 | `/exit` |

完整的命令参考见 [附录：Slash 命令参考手册](#附录slash-命令参考手册)。

## 常见问题

### `/review` 命令找不到？

**原因：** `/review` 已弃用，需要安装 `code-review` 插件或创建自定义 skill。

**解决方案：**

1. 使用内置的 `/simplify` 替代
2. 或创建自己的 `/review` skill（见附录）
3. 或安装 code-review 插件

### 命令和 Skill 有什么区别？

**历史背景：** 旧版用 `.claude/commands/` 存放自定义命令，新版合并到 `.claude/skills/`。

**现在：** 两种方式都可用，但 Skills 更强大：

| 方式 | 位置 | 特点 |
|------|------|------|
| Skills（推荐） | `.claude/skills/<name>/SKILL.md` | 可打包脚本、模板、自动触发 |
| 旧版命令 | `.claude/commands/<name>.md` | 简单，仍可用 |

同名时，**Skill 优先**。

### 如何让 Claude 自动触发命令？

在 Skill 的 frontmatter 中添加触发条件：

```yaml
---
name: review
description: 审查代码质量。当用户请求代码审查或完成功能开发时使用。
---
```

Claude 会根据 `description` 自动判断何时使用这个 Skill。

### `/compact` 会丢失信息吗？

**不会完全丢失。** `/compact` 会压缩对话历史，保留核心信息：
- 关键决策
- 重要上下文
- 任务目标

但详细的对话过程会被压缩。建议在重要节点先 `/export` 导出对话。

### 如何查看所有可用命令？

```bash
# 在 Claude Code 中
> /

# 或筛选特定字母
> /h    # 显示所有 h 开头的命令
```

## 下一章预告

Slash 命令帮你一键触发常用任务。但你可能想：

> "我希望 Claude 记住我的项目规范，不用每次都重新解释..."

下一章，我们学习 **Memory 系统**：
- 创建 `CLAUDE.md` 让 Claude 记住项目背景
- 自动持久化重要上下文
- 团队共享项目知识

继续 → [Memory 系统](../04-memory/)

---

## 附录：Slash 命令参考手册

### 内置命令完整列表

输入 `/` 在 Claude Code 中查看实时列表。以下是常用命令分类：

#### 对话管理

| 命令 | 用途 |
|------|------|
| `/clear` | 清空对话（别名：`/reset`、`/new`） |
| `/compact [instructions]` | 压缩对话，可选聚焦指令 |
| `/export [filename]` | 导出对话到文件或剪贴板 |
| `/rewind [steps]` | 回退对话和代码（别名：`/checkpoint`） |
| `/branch [name]` | 分支对话到新会话（别名：`/fork`） |

#### 会话管理

| 命令 | 用途 |
|------|------|
| `/resume [session]` | 恢复对话（别名：`/continue`） |
| `/rename [name]` | 重命名会话 |
| `/history` | 查看历史会话 |

#### 系统与诊断

| 命令 | 用途 |
|------|------|
| `/status` | 显示版本、模型、账户 |
| `/doctor` | 诊断安装健康状况 |
| `/config` | 打开设置（别名：`/settings`） |
| `/help` | 显示帮助 |

#### 模型与性能

| 命令 | 用途 |
|------|------|
| `/model [model]` | 选择模型（用箭头键调整努力级别） |
| `/effort [level]` | 设置努力级别（`max` 需要 Opus 4.6） |
| `/cost` | 显示 token 使用统计 |
| `/fast [on|off]` | 切换快速模式 |

#### 上下文与权限

| 命令 | 用途 |
|------|------|
| `/memory` | 编辑 `CLAUDE.md` |
| `/permissions` | 查看权限（别名：`/allowed-tools`） |
| `/context` | 可视化上下文使用情况 |

#### Git 与开发

| 命令 | 用途 |
|------|------|
| `/diff` | 未提交更改的交互式 diff |
| `/security-review` | 安全漏洞分析 |
| `/init` | 初始化 `CLAUDE.md` |

#### 集成与扩展

| 命令 | 用途 |
|------|------|
| `/mcp` | 管理 MCP servers |
| `/plugin` | 管理插件 |
| `/skills` | 列出可用 skills |
| `/hooks` | 查看 hook 配置 |
| `/agents` | 管理代理配置 |

#### 实用工具

| 命令 | 用途 |
|------|------|
| `/copy [N]` | 复制响应到剪贴板 |
| `/btw <question>` | 旁注问题（不添加到历史） |
| `/terminal-setup` | 配置终端快捷键 |
| `/theme` | 更改颜色主题 |
| `/vim` | 切换 Vim 模式 |
| `/voice` | 切换语音听写 |

### 内置 Skills

| Skill | 用途 |
|-------|------|
| `/batch <instruction>` | 使用 worktrees 编排并行更改 |
| `/claude-api` | 加载 Claude API 参考 |
| `/debug [description]` | 启用调试日志 |
| `/loop [interval] <prompt>` | 按间隔重复运行 |
| `/simplify [focus]` | 检查已更改文件的代码质量 |

### 已弃用命令

| 命令 | 状态 |
|------|------|
| `/review` | 已弃用 — 使用 `code-review` 插件或 `/simplify` |
| `/fork` | 重命名为 `/branch`（别名仍可用） |

---

## 创建自定义 Skill

### 基本模板

创建 `.claude/skills/<name>/SKILL.md`：

```yaml
---
name: my-command
description: 此命令的功能。当 [触发条件] 时使用。
argument-hint: [可选参数提示]
allowed-tools: Bash(git *), Read, Grep  # 可选：预授权工具
---

# 命令标题

## 上下文

- 当前分支：!`git branch --show-current`
- 相关文件：@package.json

## 指令

1. 第一步
2. 使用参数：$ARGUMENTS
3. 第三步

## 输出格式

如何格式化响应。
```

### Frontmatter 字段

| 字段 | 用途 | 默认值 |
|------|------|--------|
| `name` | 命令名称 | 目录名 |
| `description` | 描述（帮助 Claude 判断何时使用） | 首段 |
| `argument-hint` | 参数提示 | 无 |
| `allowed-tools` | 预授权工具 | 继承会话权限 |
| `disable-model-invocation` | 禁止 Claude 自动调用 | `false` |
| `context` | 设为 `fork` 在隔离上下文运行 | 无 |

### 动态上下文技巧

**Shell 命令（`!`前缀）：**

```yaml
- 当前状态：!`git status --short`
- 最近提交：!`git log --oneline -5`
- 测试结果：!`npm test 2>&1 | tail -10`
```

**文件引用（`@`前缀）：**

```yaml
- 项目配置：@package.json
- 代码规范：@CLAUDE.md
```

**参数（`$ARGUMENTS`）：**

```yaml
# 用法：/fix-issue 123
# $ARGUMENTS = "123"

修复 issue #$ARGUMENTS
```

---

*属于 [Claude How To](../) 指南系列*