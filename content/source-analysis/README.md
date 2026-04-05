---
title: Claude Code 源码解析
description: 深入理解 Claude Code 内部实现原理
---

# Claude Code 源码解析

> **理解原理，才能用好工具**

## 为什么读源码？

| 原因 | 收益 |
|------|------|
| 理解工具边界 | 知道什么能做、什么不能做 |
| 遇到问题能定位 | 不再是"试试看"的调试方式 |
| 贡献代码改进 | 可以提交 PR 改进工具 |
| 学习架构设计 | 借鉴优秀的系统设计 |

## 解析范围

### 核心架构
- [整体架构概览](./architecture/overview.md) - 系统组件和数据流
- [Agent 循环](./architecture/agent-loop.md) - 核心执行流程
- [上下文管理](./architecture/context-mgmt.md) - Token 限制和优化策略

### 功能模块
- [Slash Commands](./features/slash-commands.md) - 命令解析和执行
- [Hooks 系统](./features/hooks-system.md) - 事件驱动机制
- [MCP 客户端](./features/mcp-client.md) - 外部工具集成
- [子智能体系统](./features/subagent-system.md) - 并行和隔离

### 扩展开发
- [自定义 Hooks](./extending/custom-hooks.md) - 编写自己的钩子
- [MCP 服务器开发](./extending/mcp-servers.md) - 创建自定义工具

## 阅读顺序

```mermaid
flowchart LR
    A[整体架构] --> B[Agent 循环]
    B --> C[上下文管理]
    C --> D[功能模块]
    D --> E[扩展开发]
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style C fill:#e8f5e9
    style D fill:#fce4ec
    style E fill:#f3e5f5
```

### 推荐路径

**快速入门（1-2 小时）：**
1. 整体架构 → 理解大图
2. Agent 循环 → 理解核心

**深入理解（3-4 小时）：**
3. 上下文管理 → 理解限制
4. 按需阅读功能模块

**动手实践（5+ 小时）：**
5. 扩展开发 → 自定义功能

## 核心概念速查

### Agent 循环

```
┌─────────────────────────────────────────┐
│                 Agent Loop               │
│                                         │
│  ┌─────────┐    ┌─────────┐    ┌─────┐ │
│  │  Input  │───▶│ Context │───▶│ API │ │
│  └─────────┘    └─────────┘    └─────┘ │
│       ▲                              │  │
│       │         ┌─────────┐         │  │
│       └─────────│ Response│◀────────┘  │
│                 └─────────┘            │
│                      │                 │
│                      ▼                 │
│                 ┌─────────┐            │
│                 │  Tools  │            │
│                 └─────────┘            │
│                      │                 │
│                      ▼                 │
│                 ┌─────────┐            │
│                 │  Hooks  │            │
│                 └─────────┘            │
└─────────────────────────────────────────┘
```

### 上下文层级

```
┌────────────────────────────────────┐
│          Context Window            │
│  ┌──────────────────────────────┐  │
│  │       System Prompt          │  │
│  │  (CLAUDE.md + Memory)        │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │       Conversation           │  │
│  │  (Messages + Tool Results)   │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │       Working Memory         │  │
│  │  (Current Task Context)      │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

### 工具执行流程

```
User Input
    │
    ▼
┌─────────────┐
│ Parse Input │
└─────────────┘
    │
    ▼
┌─────────────┐     ┌─────────────┐
│ Build Msg   │────▶│ Call API    │
└─────────────┘     └─────────────┘
    │                     │
    │                     ▼
    │              ┌─────────────┐
    │              │ Parse Resp  │
    │              └─────────────┘
    │                     │
    │     ┌───────────────┼───────────────┐
    │     ▼               ▼               ▼
    │ ┌─────────┐   ┌─────────┐   ┌─────────┐
    │ │ Text    │   │ Tool    │   │ Error   │
    │ │ Output  │   │ Call    │   │ Handle  │
    │ └─────────┘   └─────────┘   └─────────┘
    │                     │
    │                     ▼
    │              ┌─────────────┐
    │              │ Exec Tool   │
    │              └─────────────┘
    │                     │
    │                     ▼
    │              ┌─────────────┐
    │              │ Run Hooks   │
    │              └─────────────┘
    │                     │
    └─────────────────────┘
```

## 源码资源

### 官方仓库

```bash
# Claude Code CLI
git clone https://github.com/anthropics/claude-code

# MCP SDK
git clone https://github.com/modelcontextprotocol/sdk
```

### 关键文件

| 文件 | 用途 | 复杂度 |
|------|------|--------|
| `cli.ts` | 命令行入口 | ⭐ |
| `agent.ts` | Agent 主循环 | ⭐⭐⭐ |
| `context.ts` | 上下文管理 | ⭐⭐⭐ |
| `tools/*.ts` | 工具实现 | ⭐⭐ |
| `hooks/*.ts` | Hooks 系统 | ⭐⭐ |

### 调试技巧

```bash
# 启用调试日志
DEBUG=claude:* claude

# 查看详细输出
claude --verbose

# 输出 API 请求
claude --log-level debug
```

## 常见问题

### Q: 为什么 Claude 有时"忘记"之前的对话？

A: 这与上下文窗口管理有关。阅读 [上下文管理](./architecture/context-mgmt.md) 了解详情。

### Q: Hook 执行顺序是怎样的？

A: Hook 按以下顺序执行：
1. PreToolUse（工具执行前）
2. 工具执行
3. PostToolUse（工具执行后）
4. Stop（会话结束时）

详见 [Hooks 系统](./features/hooks-system.md)。

### Q: 如何理解 MCP 的工作原理？

A: MCP 基于 JSON-RPC 协议，通过 stdio 或 HTTP 与服务器通信。详见 [MCP 客户端](./features/mcp-client.md)。

## 贡献源码

### 设置开发环境

```bash
git clone https://github.com/anthropics/claude-code
cd claude-code
npm install
npm run dev
```

### 提交 PR

1. Fork 仓库
2. 创建功能分支
3. 编写代码和测试
4. 提交 PR（参考 CONTRIBUTING.md）

## 相关资源

- [问题诊断库](../../diagnostics/)
- [最佳实践模式](../../patterns/)
- [社区贡献](../../community/)