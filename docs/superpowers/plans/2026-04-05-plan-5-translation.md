# 翻译计划：核心模块中文化

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将 10 个核心模块的英文内容翻译成中文，打造全网最好的中文 Claude Code 教程

**架构：** 保持原有 Markdown 结构和代码示例，翻译说明文字、注释和描述性内容。技术术语保留英文（如 slash commands、hooks、MCP）

**技术栈：** Markdown, Node.js 构建脚本

---

## 翻译原则

### 需要翻译的内容
- 标题和副标题
- 说明文字和描述
- 注释和解释
- 表格中的文字
- 列表项说明

### 保留英文的内容
- 代码示例（代码块内的代码）
- 命令名称（`/help`, `/commit` 等）
- 技术术语（slash commands, hooks, MCP, subagents）
- 文件路径
- 环境变量名
- API 名称

### 术语对照表

| 英文 | 中文翻译 | 备注 |
|------|----------|------|
| slash commands | Slash 命令 | 保留 slash |
| hooks | Hooks | 不翻译 |
| memory | Memory / 内存 | 根据上下文 |
| skills | Skills / 技能 | 根据上下文 |
| subagents | 子智能体 | |
| MCP | MCP | 不翻译 |
| plugins | Plugins / 插件 | |
| checkpoints | Checkpoints / 检查点 | 根据上下文 |
| Try It Now | 立即尝试 | |
| Beginner | 初级 | |
| Intermediate | 中级 | |
| Advanced | 高级 | |

---

## 文件结构

需要翻译的文件：
```
01-slash-commands/README.md    # 1023 行
02-memory/README.md            # 1388 行
03-skills/README.md            # 1064 行
04-subagents/README.md         # 1307 行
05-mcp/README.md               # 1261 行
06-hooks/README.md             # 2024 行
07-plugins/README.md           # 1109 行
08-checkpoints/README.md       # 1401 行
09-advanced-features/README.md # 2038 行
10-cli/README.md               # 961 行
```

---

## 任务清单

### 任务 1：翻译 01-slash-commands

**文件：**
- 修改：`01-slash-commands/README.md`

**翻译要点：**
- 保持命令表格格式
- 技术术语 slash commands 保留英文
- 代码示例不修改

- [ ] **步骤 1：翻译头部和概述**

原文：
```markdown
> 🟢 **Beginner** | ⏱ 30 minutes
>
> ✅ Verified against Claude Code **v2.1.92** · Last verified: 2026-04-05

**What you'll build:** Learn to use slash commands for faster workflows.

# Slash Commands

## Overview

Slash commands are shortcuts that control Claude's behavior during an interactive session.
```

译文：
```markdown
> 🟢 **初级** | ⏱ 30 分钟
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证：2026-04-05

**你将学到：** 学习使用 Slash 命令加速工作流程。

# Slash 命令

## 概述

Slash 命令是在交互式会话中控制 Claude 行为的快捷方式。
```

- [ ] **步骤 2：翻译内置命令参考**

保留命令名称和表格格式，翻译说明列：

```markdown
## 内置命令参考

内置命令是常用操作的快捷方式。共有 **55+ 个内置命令** 和 **5 个捆绑技能**。在 Claude Code 中输入 `/` 查看完整列表。

| 命令 | 用途 |
|---------|---------|
| `/add-dir <path>` | 添加工作目录 |
| `/clear` | 清除对话（别名：`/reset`、`/new`） |
| `/compact [instructions]` | 压缩对话，可选聚焦指令 |
| `/commit` | 创建带有上下文的 git 提交 |
| `/cost` | 显示 token 使用统计 |
...
```

- [ ] **步骤 3：翻译 Try It Now 部分**

```markdown
## 立即尝试

### 🎯 练习 1：创建你的第一个 Skill

创建一个简单的 `/hello` 技能来问候你：

```bash
mkdir -p .claude/skills/hello
```

创建 `.claude/skills/hello/SKILL.md`：

```yaml
---
name: hello
description: 问候用户。当用户打招呼或开始会话时使用。
---

# Hello 技能

友好地问候用户，询问他们今天想做什么。

包括：
1. 当前时间和日期
2. 项目快速状态（git 分支、最近活动）
3. 基于最近变更的工作建议
```

测试：`/hello`
```

- [ ] **步骤 4：翻译最佳实践和故障排查**

- [ ] **步骤 5：验证并提交**

```bash
npm run build
# 确认网站正常生成
git add 01-slash-commands/README.md
git commit -m "translate(01-slash-commands): 翻译为中文"
```

---

### 任务 2：翻译 02-memory

**文件：**
- 修改：`02-memory/README.md`

**翻译要点：**
- Memory 作为技术术语保留
- CLAUDE.md 文件名保留

- [ ] **步骤 1：翻译头部和快速开始**

```markdown
> 🟢 **初级** | ⏱ 45 分钟
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证：2026-04-05

**你将学到：** 在 Claude Code 会话间设置持久化上下文。

# Memory 指南

Memory 使 Claude 能够在多个会话和对话间保留上下文。
```

- [ ] **步骤 2：翻译命令参考表**

- [ ] **步骤 3：翻译 Try It Now 练习**

- [ ] **步骤 4：翻译最佳实践**

- [ ] **步骤 5：验证并提交**

---

### 任务 3：翻译 03-skills

**文件：**
- 修改：`03-skills/README.md`

- [ ] **步骤 1：翻译概述和概念**

- [ ] **步骤 2：翻译 Skill 创建指南**

- [ ] **步骤 3：翻译 Try It Now 练习**

- [ ] **步骤 4：验证并提交**

---

### 任务 4：翻译 04-subagents

**文件：**
- 修改：`04-subagents/README.md`

- [ ] **步骤 1：翻译子智能体概念**

- [ ] **步骤 2：翻译内置子智能体列表**

- [ ] **步骤 3：翻译 Try It Now 练习**

- [ ] **步骤 4：验证并提交**

---

### 任务 5：翻译 05-mcp

**文件：**
- 修改：`05-mcp/README.md`

- [ ] **步骤 1：翻译 MCP 概念**

- [ ] **步骤 2：翻译配置指南**

- [ ] **步骤 3：翻译 Try It Now 练习**

- [ ] **步骤 4：验证并提交**

---

### 任务 6：翻译 06-hooks

**文件：**
- 修改：`06-hooks/README.md`

- [ ] **步骤 1：翻译 Hooks 系统概述**

- [ ] **步骤 2：翻译 Hook 类型说明**

- [ ] **步骤 3：翻译示例脚本注释**

- [ ] **步骤 4：翻译 Try It Now 练习**

- [ ] **步骤 5：验证并提交**

---

### 任务 7：翻译 07-plugins

**文件：**
- 修改：`07-plugins/README.md`

- [ ] **步骤 1：翻译插件概念**

- [ ] **步骤 2：翻译安装和使用指南**

- [ ] **步骤 3：翻译 Try It Now 练习**

- [ ] **步骤 4：验证并提交**

---

### 任务 8：翻译 08-checkpoints

**文件：**
- 修改：`08-checkpoints/README.md`

- [ ] **步骤 1：翻译检查点概念**

- [ ] **步骤 2：翻译使用场景**

- [ ] **步骤 3：翻译 Try It Now 练习**

- [ ] **步骤 4：验证并提交**

---

### 任务 9：翻译 09-advanced-features

**文件：**
- 修改：`09-advanced-features/README.md`

- [ ] **步骤 1：翻译规划模式说明**

- [ ] **步骤 2：翻译扩展思考功能**

- [ ] **步骤 3：翻译权限配置**

- [ ] **步骤 4：翻译 Try It Now 练习**

- [ ] **步骤 5：验证并提交**

---

### 任务 10：翻译 10-cli

**文件：**
- 修改：`10-cli/README.md`

- [ ] **步骤 1：翻译 CLI 概述**

- [ ] **步骤 2：翻译命令行选项**

- [ ] **步骤 3：翻译 Try It Now 练习**

- [ ] **步骤 4：验证并提交**

---

### 任务 11：更新网站模板

**文件：**
- 修改：`templates/layout.html`

- [ ] **步骤 1：翻译导航栏**

```html
<nav>
  <div class="container">
    <a href="/" style="font-weight: bold; font-size: 1.25rem;">Claude Code 终极教程</a>
    <ul class="nav-links">
      <li><a href="/content/basics/installation.html">入门指南</a></li>
      <li><a href="/content/modules/">核心模块</a></li>
      <li><a href="/content/cases/intro.html">实战案例</a></li>
      <li><a href="/content/enterprise/README.html">企业应用</a></li>
    </ul>
  </div>
</nav>
```

- [ ] **步骤 2：翻译页脚**

```html
<footer>
  <div class="container">
    <p>© 2026 Claude Code 终极教程 | <a href="https://github.com/anthropics/claude-code" target="_blank">GitHub</a></p>
    <p style="margin-top: 0.5rem; font-size: 0.875rem; opacity: 0.8;">
      本教程由社区维护，与 Anthropic 官方无关联
    </p>
  </div>
</footer>
```

- [ ] **步骤 3：更新难度徽章样式**

- [ ] **步骤 4：重新构建网站**

```bash
npm run build
```

- [ ] **步骤 5：提交变更**

---

## 验收标准

- [ ] 所有 10 个核心模块翻译完成
- [ ] 技术术语使用一致
- [ ] 代码示例保持原样
- [ ] 网站导航和 UI 元素翻译
- [ ] `npm run build` 成功
- [ ] 网站可正常访问

---

## 关键里程碑

| 里程碑 | 完成标志 | 预计时间 |
|--------|----------|----------|
| M1: 基础模块 | 01/02/03 翻译完成 | Day 1 |
| M2: 中级模块 | 04/05/06/07 翻译完成 | Day 2 |
| M3: 高级模块 | 08/09/10 翻译完成 | Day 3 |
| M4: 网站更新 | 模板和 UI 翻译 | Day 3 |

---

## 注意事项

1. **保持格式一致**：Markdown 结构、代码块、表格格式不变
2. **技术术语统一**：参考术语对照表
3. **代码不翻译**：代码块内的代码保持英文
4. **链接检查**：确保内部链接正确
5. **构建验证**：每次翻译后运行 `npm run build`

---

计划已完成并保存到 `docs/superpowers/plans/2026-04-05-plan-5-translation.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？