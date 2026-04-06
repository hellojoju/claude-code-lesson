---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

> 🟢 **初级** | ⏱ 30 分钟
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证：2026-04-06

**你将学会：** 5 分钟体验 Claude Code 的核心价值，知道它能不能帮到你。

# 快速开始

## 为什么需要这个？

你可能在想：Claude Code 到底是什么？它和 ChatGPT 有什么区别？能帮我做什么？

如果你：
- 第一次听说 Claude Code
- 安装了但不知道怎么用
- 想快速判断它是否适合你

这一章就是为你准备的。用 30 分钟，你就能亲身体验它的核心能力。

## Claude Code 是什么

Claude Code 不是 ChatGPT。它是 **AI 编程伙伴**。

| ChatGPT | Claude Code |
|---------|-------------|
| 只能聊文字 | 能读你的代码 |
| 你要复制粘贴代码 | 它直接访问项目文件 |
| 建议要手动执行 | 能直接修改代码 |
| 每次对话重新开始 | 记住你的项目规范 |

简单说：ChatGPT 是顾问，Claude Code 是干活的人。

## 安装（5 分钟）

### macOS

```bash
# 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 登录
claude auth login
```

### Windows

```bash
# 使用 PowerShell
npm install -g @anthropic-ai/claude-code

# 登录
claude auth login
```

### Linux

同 macOS。

### 验证安装

```bash
claude --version
# 输出：Claude Code v2.1.92
```

## 第一次对话

安装完成后，打开终端，进入任意代码项目目录，输入：

```bash
claude
```

你会看到 Claude Code 启动，等待你的输入。

## 实战场景

### 场景 1：让 Claude 解释一段代码

**场景：** 你接手了一个项目，看到一段看不懂的代码。

**操作：**

1. 启动 Claude Code：
```bash
cd your-project
claude
```

2. 输入问题：
```
解释 src/auth.ts 里的 verifyToken 函数做了什么
```

3. Claude 会：
   - 读取 `src/auth.ts` 文件
   - 找到 `verifyToken` 函数
   - 用中文解释它的逻辑

**体验价值：** 不用自己读代码，Claude 帮你理解。节省时间，降低上手难度。

### 场景 2：让 Claude 写代码

**场景：** 你需要一个新功能，但不确定怎么写。

**操作：**

在 Claude Code 里输入：
```
帮我写一个函数，验证邮箱格式是否正确
要求：
- 返回 true/false
- 支持常见邮箱格式
- 放在 src/utils/validators.ts
```

Claude 会：
- 理解你的需求
- 编写代码
- 创建文件（或修改现有文件）
- 显示它做了什么

**体验价值：** 从想法到代码，几秒钟。

### 场景 3：让 Claude 改代码

**场景：** 你发现了一个 Bug，需要修复。

**操作：**

输入：
```
src/api/users.ts 第 45 行有个 bug：
当用户名是空字符串时，会返回错误的用户数据
帮我修复，并添加对应的测试
```

Claude 会：
- 分析代码找到问题
- 提出修复方案
- 执行修复
- 写测试验证

**体验价值：** Bug 修复从"找→改→测"变成"描述→完成"。

## 🎯 Try It Now

### 练习 1：安装并启动

1. 安装 Claude Code
2. 打开任意项目目录
3. 输入 `claude` 启动
4. 输入 "列出这个项目的目录结构"

### 练习 2：体验代码解释

1. 在 Claude Code 里输入：
   ```
   解释这个项目用到了什么技术栈
   ```
2. 观察 Claude 如何分析项目

### 练习 3：体验代码生成

1. 输入：
   ```
   写一个简单的 hello world 程序，用项目的技术栈
   ```
2. 检查 Claude 生成的代码

## 能帮你做什么

Claude Code 的核心能力：

| 能力 | 说明 |
|------|------|
| **代码解释** | 理解复杂代码，用中文解释 |
| **代码生成** | 从需求描述生成代码 |
| **代码修改** | Bug 修复、重构、优化 |
| **代码审查** | 发现问题、提出改进建议 |
| **文档生成** | README、API 文档、注释 |
| **测试编写** | 单元测试、集成测试 |
| **命令执行** | 运行测试、构建、部署 |

## 学习路线图

本教程分为四个阶段：

1. **上手阶段**（你正在学）— 基本使用
2. **定制阶段** — 让 Claude 适应你的项目
3. **自动化阶段** — 构建自动化工作流
4. **精通阶段** — 企业级应用、复杂系统

## 常见问题

### Claude Code 收费吗？

需要 Anthropic API 密钥。按使用量付费。
- Haiku 模型最便宜（适合简单任务）
- Sonnet 模型性价比高（日常开发）
- Opus 模型最贵（复杂任务）

### 安全吗？

Claude 只能访问你当前目录的代码。
不会：
- 访问其他目录
- 发送代码到其他地方
- 自动执行危险命令

所有文件修改都需要你确认（除非开启自动模式）。

### 支持哪些语言？

所有主流编程语言：
- TypeScript/JavaScript
- Python
- Go
- Rust
- Java
- C/C++
- 等等...

## 下一章预告

你已经会用 Claude Code 了。但每次都要输入完整的问题很麻烦。

下一章，我们学习 **交互与对话**：
- 如何高效地和 Claude 沟通
- 如何管理多个对话
- 如何保存和恢复会话

继续 → [交互与对话](../02-interaction/)