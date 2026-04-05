---
cc_version_verified: "2.1.92"
last_verified: "2026-04-05"
---
> 🟢 **初级** | ⏱ 15 分钟浏览

# Claude Code 社区教程汇总

## 精选教程索引

本文汇总网上优质的 Claude Code 教程和资源，帮助你快速找到学习材料。

---

## 官方资源

### 核心文档

| 资源 | 链接 | 说明 |
|------|------|------|
| Claude Code 官方文档 | [docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code) | 最权威的参考 |
| Claude Code Quickstart | [Quickstart](https://docs.anthropic.com/en/docs/claude-code/quickstart) | 5 分钟快速入门 |
| MCP 协议文档 | [modelcontextprotocol.io](https://modelcontextprotocol.io/) | MCP 完整规范 |
| Anthropic Cookbook | [GitHub](https://github.com/anthropics/anthropic-cookbook) | 示例代码集合 |

### GitHub 官方

| 资源 | 链接 | 说明 |
|------|------|------|
| Claude Code Repo | [anthropics/claude-code](https://github.com/anthropics/claude-code) | 官方仓库 |
| Discussions | [Discussions](https://github.com/anthropics/claude-code/discussions) | 社区问答 |
| Issues | [Issues](https://github.com/anthropics/claude-code/issues) | 问题追踪 |

---

## 入门教程

### 安装配置

| 教程 | 来源 | 适合 |
|------|------|------|
| 快速开始 | 本站 [Quickstart](../QUICKSTART.md) | 15 分钟入门 |
| CLI 安装 | 本站 [CLI](../10-cli/) | 命令行基础 |
| 环境配置 | 本站 [Memory](../02-memory/) | CLAUDE.md 配置 |

### 基本使用

| 教程 | 来源 | 内容 |
|------|------|------|
| Slash Commands | 本站 [01-slash-commands](../01-slash-commands/) | 用户命令 |
| 基本对话 | 官方 Quickstart | 交互技巧 |
| 文件操作 | 本站 [09-advanced-features](../09-advanced-features/) | Read/Write/Edit |

---

## 进阶技巧

### Memory 最佳实践

| 教程 | 来源 | 重点 |
|------|------|------|
| Memory 系统 | 本站 [02-memory](../02-memory/) | 完整配置指南 |
| 官方 Memory 文档 | Anthropic Docs | 最新更新 |

### Hooks 自动化

| 教程 | 来源 | 内容 |
|------|------|------|
| Hooks 入门 | 本站 [06-hooks](../06-hooks/) | 事件驱动 |
| 自动格式化 | 官方团队技巧 | PostToolUse |

### MCP 集成

| 教程 | 来源 | 内容 |
|------|------|------|
| MCP 配置 | 本站 [05-mcp](../05-mcp/) | 服务器配置 |
| MCP 协议 | modelcontextprotocol.io | 完整规范 |

---

## 高级主题

### 多 Agent 协作

| 教程 | 来源 | 内容 |
|------|------|------|
| 多 Agent 模式 | 本站 [11-multi-agent](../11-multi-agent/) | 5 种协作模式 |
| Agent 工具 | 官方 Docs | subagent 类型 |

### 后台任务

| 教程 | 来源 | 内容 |
|------|------|------|
| 后台任务 | 本站 [12-background-tasks](../12-background-tasks/) | 异步执行 |
| 任务管理 | 官方 Docs | /tasks 命令 |

### Channels

| 教程 | 来源 | 内容 |
|------|------|------|
| Channels 入门 | 本站 [13-channels](../13-channels/) | Discord/Slack |
| MCP Channels | modelcontextprotocol.io | 协议规范 |

---

## 实战案例

### Web 开发

| 案例 | 说明 |
|------|------|
| 本站构建系统 | Node.js + Markdown 处理 |
| React 项目 | 组件开发 + TypeScript |
| API 开发 | Express + 数据库 |

### 数据分析

| 案例 | 说明 |
|------|------|
| Python 数据处理 | pandas + 可视化 |
| SQL 查询优化 | PostgreSQL 分析 |
| ETL 流程 | 数据清洗 + 转换 |

### DevOps 自动化

| 案例 | 说明 |
|------|------|
| CI/CD 配置 | GitHub Actions |
| Hooks 自动化 | 代码检查 + 格式化 |
| 监控集成 | Channels 通知 |

---

## 分类索引

### 按难度

| 难度 | 模块 | 时间 |
|------|------|------|
| 🟢 初级 | 01, 02, 03, 08, 10 | 2-3 小时 |
| 🟡 中级 | 04, 05, 06, 07, 11, 12, 13 | 5-6 小时 |
| 🔴 高级 | 09 | 2 小时 |

### 按主题

| 主题 | 相关模块 |
|------|----------|
| 基础使用 | 01, 02, 10 |
| 自动化 | 06, 13 |
| 扩展 | 05, 07, 11, 12 |
| 深入 | 04, 09 |

---

## 社区问答精选

来自 GitHub Discussions 的高质量问答：

### 常见问题

| 问题 | 答案要点 |
|------|----------|
| 如何配置 CLAUDE.md？ | 保持简洁，使用 imports |
| 最佳 Hook 配置？ | PostToolUse 格式化 + lint |
| 多 Agent 如何协调？ | 并行独立任务 |
| 如何处理长任务？ | 后台运行 + 通知 |

### 性能优化

| 问题 | 答案要点 |
|------|----------|
| 上下文太大怎么办？ | /compact + 简化 CLAUDE.md |
| 如何选择模型？ | Haiku 轻量，Sonnet 开发 |
| 扩展思考何时用？ | 架构决策 + 复杂调试 |

---

## 学习路径建议

### 新手路径（第一天）

```mermaid
graph LR
    A[安装] --> B[Slash Commands]
    B --> C[Memory 基础]
    C --> D[CLI 基本命令]
    D --> E[实战练习]
```

**时间：** 3 小时

### 进阶路径（第二周）

```mermaid
graph LR
    A[Skills] --> B[Hooks]
    B --> C[MCP]
    C --> D[Subagents]
    D --> E[高级功能]
```

**时间：** 6 小时

### 专家路径（持续）

```mermaid
graph LR
    A[多 Agent] --> B[后台任务]
    B --> C[Channels]
    C --> D[自定义 MCP]
    D --> E[团队协作]
```

---

## 持续更新

本汇总定期更新，新资源来源：
- GitHub Discussions 热门话题
- Anthropic 官方博客
- 社区分享文章
- 本站新增模块

---

## 相关资源

- [官方团队技巧](./official-tips.md)
- [快速开始](../QUICKSTART.md)
- [学习路线图](../LEARNING-ROADMAP.md)