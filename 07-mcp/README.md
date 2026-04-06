---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

> 🟡 **中级** | ⏱ 50 分钟
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证: 2026-04-06

**你将构建:** 将 Claude 连接到外部工具和实时数据源。

# MCP (Model Context Protocol)

## 为什么需要这个？

> "我想让 Claude 访问外部数据和工具"

你正在开发一个项目，需要：
- 查看当前的 GitHub PR 状态
- 从数据库查询最新的用户数据
- 读取 Notion 中的项目规格文档

每次都要手动复制粘贴？太繁琐了。

MCP (Model Context Protocol) 解决这个问题 —— 让 Claude **直接访问**外部服务和实时数据，无需你手动搬运信息。

```mermaid
graph LR
    A["你的请求"] --> B["Claude"]
    B -->|MCP| C["GitHub"]
    B -->|MCP| D["数据库"]
    B -->|MCP| E["Notion"]
    C -->|"PR 数据"| B
    D -->|"用户列表"| B
    E -->|"规格文档"| B
    B -->|"整合后的答案"| A

    style A fill:#fff3e0,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#f3e5f5,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#f3e5f5,stroke:#333,color:#333
```

**一句话理解:** MCP 是 Claude 的 "外部世界接口"，就像 USB 接口让电脑连接打印机、键盘一样。

---

## 核心概念

### MCP 是什么？

**Model Context Protocol (MCP)** 是 Claude Code 访问外部工具、API 和实时数据源的标准化协议。

| 特性 | 描述 |
|------|------|
| **实时访问** | 获取当前数据，不是缓存 |
| **双向交互** | 读取数据 + 执行操作 |
| **安全认证** | OAuth、Token 等标准认证 |
| **可扩展** | 支持自定义 MCP Server |

### MCP 架构

```mermaid
graph TB
    A["Claude Code"]
    B["MCP Server<br/>(翻译层)"]
    C["External Service<br/>(数据源)"]

    A -->|"Tool 请求"| B
    B -->|"API 调用"| C
    C -->|"原始数据"| B
    B -->|"格式化结果"| A

    style A fill:#e1f5fe,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#e8f5e9,stroke:#333,color:#333
```

**MCP Server** 是关键组件 —— 它充当 Claude 和外部服务之间的 "翻译官"：
- 将 Claude 的请求转换为外部 API 调用
- 将外部数据转换为 Claude 可理解的格式

### MCP vs Memory

| 对比项 | MCP | Memory |
|--------|-----|--------|
| **数据类型** | 实时变化的数据 | 持久不变的偏好 |
| **数据来源** | 外部服务、API | 用户设定、学习历史 |
| **访问方式** | Tool 调用 | 自动加载 |
| **典型内容** | GitHub PR、数据库查询 | 代码风格偏好、项目约定 |

**决策图:**

```mermaid
graph TD
    A["需要外部数据?"]
    A -->|"是"| B["数据会变化?"]
    A -->|"否"| C["用 Memory"]
    B -->|"经常变化"| D["用 MCP"]
    B -->|"很少变化"| C

    D -->|"示例"| E["GitHub issues<br/>数据库记录<br/>实时状态"]
    C -->|"示例"| F["编码风格<br/>项目偏好<br/>团队约定"]

    style A fill:#fff3e0,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#e1f5fe,stroke:#333,color:#333
```

### MCP 传输方式

| 方式 | 用途 | 示例 |
|------|------|------|
| **HTTP** | 云端服务 | GitHub API、Notion |
| **Stdio** | 本地服务 | 本地数据库、文件系统 |
| **WebSocket** | 实时双向 | 实时协作服务 |

### MCP 作用域

配置可以存储在不同位置：

| 作用域 | 位置 | 共享对象 | 需要批准 |
|--------|------|----------|----------|
| **Local** | `~/.claude.json` (project 路径下) | 仅你 | 否 |
| **Project** | `.mcp.json` | 团队成员 | 首次使用时 |
| **User** | `~/.claude.json` | 仅你（跨项目） | 否 |

---

## 场景 1：连接 GitHub

> "我想让 Claude 查看仓库状态、管理 PR"

### 为什么选择 GitHub MCP？

日常工作流中，你需要：
- 查看待审查的 PR
- 创建 Issue 报告 bug
- 合并已通过的 PR

手动打开浏览器、导航到仓库、查找 PR... 每次重复这些步骤。

**GitHub MCP 让 Claude 直接操作 GitHub** —— 一个命令搞定。

### 配置步骤

**步骤 1: 获取 GitHub Token**

1. 访问 GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. 选择权限：`repo`（完整仓库）、`pull_requests`、`issues`
4. 复制生成的 Token

**步骤 2: 添加 GitHub MCP**

```bash
# 设置环境变量
export GITHUB_TOKEN="ghp_your_token_here"

# 添加 MCP Server
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

或使用 `.mcp.json` 配置文件（推荐团队共享）:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**步骤 3: 测试连接**

```bash
claude mcp list
# 输出应显示: github ✓ connected
```

### 可用 Tools

| Tool | 功能 | 用途 |
|------|------|------|
| `list_prs` | 列出所有 PR | 查看待审查 PR |
| `get_pr` | 获取 PR 详情 | 深入了解某个 PR |
| `create_pr` | 创建新 PR | 提交代码变更 |
| `merge_pr` | 合并 PR | 完成代码审查 |
| `list_issues` | 列出 Issues | 查看 bug 报告 |
| `create_issue` | 创建 Issue | 报告新问题 |

### 实际使用示例

**查看待审查的 PR:**

```bash
# 在 Claude Code 中输入:
"显示当前仓库所有待审查的 PR，按创建时间排序"

# Claude 会:
# → 调用 github MCP 的 list_prs tool
# → 返回格式化的 PR 列表
```

**审查特定 PR:**

```bash
"审查 PR #123，总结主要变更和潜在问题"

# Claude 会:
# → 调用 get_pr tool 获取详情和 diff
# → 分析代码变更
# → 给出审查意见
```

**创建 Issue:**

```bash
"为新发现的 bug 创建 Issue：
标题: '登录页面加载缓慢'
描述: 用户反馈登录页面加载超过 5 秒..."

# Claude 会:
# → 调用 create_issue tool
# → 自动创建 Issue
# → 返回 Issue URL
```

### 进阶技巧：PR 完整工作流

```bash
# 完整的 PR 审查流程
"我完成了 feature/auth 分支的开发。
1. 查看这个分支和 main 的差异
2. 创建 PR 到 main
3. PR 标题: 'Auth: JWT token refresh'
4. 在描述中总结这次会话的所有变更
5. 添加 reviewer: @alice, @bob"

# Claude 会依次执行:
# → 获取分支差异
# → 创建 PR
# → 设置 reviewer
# → 返回 PR URL
```

---

## 场景 2：连接数据库

> "我想让 Claude 直接查询数据库"

### 为什么连接数据库？

开发时常见需求：
- 查询用户数据验证功能
- 分析数据趋势
- 检查数据完整性

每次都要打开数据库客户端、写 SQL、复制结果... MCP 直接连接数据库，Claude 执行查询并解释结果。

### 配置步骤

**步骤 1: 设置数据库连接**

```bash
# PostgreSQL 示例
export DATABASE_URL="postgresql://user:password@localhost/mydb"

# MySQL 示例
export DATABASE_URL="mysql://user:password@localhost/mydb"
```

**步骤 2: 添加 Database MCP**

```bash
claude mcp add --transport stdio database -- npx @modelcontextprotocol/server-database
```

或 `.mcp.json`:

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-database"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

### 实际使用示例

**查询数据:**

```bash
# 自然语言请求
"查询订单超过 10 个的所有用户，按订单数降序排列"

# Claude 会生成并执行:
SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING COUNT(o.id) > 10
ORDER BY order_count DESC;

# 返回格式化结果:
# - Alice: 15 orders
# - Bob: 12 orders
# - Charlie: 11 orders
```

**数据分析:**

```bash
"分析过去 7 天的销售数据，给出趋势摘要"

# Claude 会:
# → 执行查询获取数据
# → 计算趋势指标
# → 给出业务解读
```

**数据验证:**

```bash
"检查 users 表中是否有重复的邮箱地址"

# Claude 会生成:
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

# 并解释结果含义
```

### 安全提示

数据库 MCP 涉及敏感数据：
- 使用只读连接用于查询分析
- 写入操作需要额外审批
- 生产数据库建议只读权限

---

## 场景 3：创建自定义 MCP Server

> "我的项目有特殊需求，现有 MCP 不够用"

### 什么时候需要自定义 MCP？

现有 MCP Server 涵盖常见服务，但你的项目可能需要：
- 公司内部的 API
- 特定业务逻辑的工具
- 自定义数据处理

**自定义 MCP Server 让你扩展 Claude 的能力**。

### 开发流程

**步骤 1: 创建项目**

```bash
mkdir my-mcp-server
cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk
```

**步骤 2: 实现 MCP Server**

```typescript
// src/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  { name: 'my-custom-server', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// 定义你的 Tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_project_stats',
      description: '获取项目统计：文件数、代码行数',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: '项目路径' }
        },
        required: ['path']
      }
    }
  ]
}));

// 处理 Tool 调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_project_stats') {
    // 实现你的逻辑
    const stats = await calculateStats(args.path);
    return {
      content: [{ type: 'text', text: JSON.stringify(stats, null, 2) }]
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// 启动 Server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

**步骤 3: 编译和测试**

```bash
npx tsc
node dist/index.js  # 本地测试
```

**步骤 4: 配置到 Claude Code**

```bash
claude mcp add --transport stdio my-custom -- node /path/to/dist/index.js
```

**步骤 5: 使用自定义 Tool**

```bash
# 在 Claude Code 中:
/mcp__my-custom__get_project_stats path="/home/user/my-project"
```

### MCP Server 组件

一个完整的 MCP Server 可以包含：

| 组件 | 功能 | 必需? |
|------|------|--------|
| **Tools** | 执行操作、返回结果 | 推荐 |
| **Resources** | 提供数据源 | 可选 |
| **Prompts** | 预定义的 prompt 模板 | 可选 |

### 最佳实践

**Tool 命名:**
- 使用 `snake_case`
- 名称反映功能：`get_user_stats`、`validate_config`

**描述要详细:**
```typescript
{
  name: 'validate_config',
  description: '验证项目配置文件格式和内容',
  inputSchema: {
    // 清晰的参数定义
  }
}
```

**错误处理:**
```typescript
if (name === 'get_stats') {
  try {
    const stats = await calculateStats(args.path);
    return { content: [{ type: 'text', text: JSON.stringify(stats) }] };
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
      isError: true
    };
  }
}
```

---

## 🎯 Try It Now

### 练习 1: 添加第一个 MCP

5 分钟快速上手：

```bash
# 1. 设置 Token（如果有 GitHub Token）
export GITHUB_TOKEN="your_token"

# 2. 添加 GitHub MCP
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github

# 3. 验证连接
claude mcp list

# 4. 在 Claude Code 中测试
"显示当前仓库的最近 5 个 PR"
```

### 练习 2: 使用 MCP Prompts

MCP Server 可以暴露 Prompts 作为 slash 命令：

```bash
# GitHub MCP 的 prompt 命令
/mcp__github__create_pr title="Add feature" body="..."

# 格式: /mcp__<server>__<prompt>
```

### 练习 3: MCP Resources 引用

使用 `@` 引用 MCP Resources：

```bash
# 引用数据库资源
@database:postgres://mydb/users

# 引用特定数据
@github:repo://anthropics/claude-code/issues
```

### 练习 4: 多 MCP 工作流

组合多个 MCP 完成复杂任务：

```bash
# 在 Claude Code 中:
"从 GitHub 获取本周完成的 PR 数量，
从数据库查询本周销售额，
生成报告发送到 Slack #reports 频道"

# Claude 会:
# → GitHub MCP: 获取 PR 数据
# → Database MCP: 查询销售数据
# → Slack MCP: 发送报告
```

---

## 常见问题

### Q: MCP Server 无法连接?

**症状:** `claude mcp list` 显示 server 未连接

**解决方案:**

```bash
# 1. 检查环境变量
echo $GITHUB_TOKEN

# 2. 手动测试 MCP Server
npx @modelcontextprotocol/server-github

# 3. 查看日志
cat ~/.claude/logs/mcp-github.log

# 4. 重置连接
claude mcp remove github
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

### Q: Token 权限不足?

**症状:** Tool 调用返回权限错误

**解决方案:**

```bash
# GitHub: 检查 token scopes
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# 确保 token 包含必要权限:
# - repo (仓库访问)
# - pull_requests (PR 管理)
# - issues (Issue 管理)
```

### Q: Tool 输出过大?

**症状:** Claude 显示 "Tool output exceeds 10,000 tokens"

**解决方案:**

```bash
# 增加输出限制
export MAX_MCP_OUTPUT_TOKENS=50000

# 或请求精简输出
"获取 PR 列表，但只返回前 5 条的摘要"
```

### Q: OAuth 认证卡住?

**症状:** OAuth 流程不完成

**解决方案:**

```bash
# 手动复制 URL 到浏览器
# 检查回调端口是否被占用

# 尝试不同端口
claude mcp add --transport http notion https://mcp.notion.com/mcp \
  --callback-port 8081
```

### Q: 配置文件格式错误?

**症状:** MCP 配置不生效

**检查步骤:**

```bash
# 1. 验证 JSON 格式
cat .mcp.json | jq .

# 2. 检查环境变量引用
echo "GITHUB_TOKEN: $GITHUB_TOKEN"

# 3. 常见错误:
# - JSON 缺少逗号
# - 环境变量未设置
# - command 路径错误
```

### Q: Windows 特殊问题?

Windows 上使用 npx 需要 `cmd /c`:

```bash
claude mcp add --transport stdio my-server -- cmd /c npx -y @some/package
```

---

## 进阶主题

### OAuth 2.0 认证

对于需要 OAuth 的服务（Notion、Google）:

```bash
# 交互式添加（推荐）
claude mcp add --transport http notion https://mcp.notion.com/mcp
# 按提示完成浏览器认证

# 预配置 OAuth
claude mcp add --transport http notion https://mcp.notion.com/mcp \
  --client-id "your-client-id" \
  --client-secret "your-client-secret"
```

### Claude.ai MCP Connectors

在 Claude.ai 网页界面配置的 MCP 会自动在 Claude Code 可用:

```bash
# 禁用 Claude.ai MCP（如果需要）
ENABLE_CLAUDEAI_MCP_SERVERS=false claude
```

### Tool 搜索优化

当 MCP Tools 过多时，启用自动搜索:

```bash
# 自动启用（超过 10% 上下文时）
ENABLE_TOOL_SEARCH=auto

# 始终启用
ENABLE_TOOL_SEARCH=true
```

### Code Execution 解决上下文膨胀

大规模 MCP 应用可能遇到上下文膨胀问题。解决方案：使用 Code Execution 让 MCP Tools 作为 API 调用，数据不通过模型上下文。

参考 Anthropic Engineering Blog: [Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)

### 企业托管 MCP

企业环境可通过 `managed-mcp.json` 控制 MCP 策略:

```json
{
  "allowedMcpServers": [
    { "serverName": "github", "serverUrl": "https://api.github.com/mcp" }
  ],
  "deniedMcpServers": [
    { "serverName": "untrusted-*" }
  ]
}
```

---

## MCP 生态系统速查

| MCP Server | 用途 | 认证 | 常用 Tools |
|------------|------|------|------------|
| **GitHub** | 仓库管理 | Token | list_prs, create_issue |
| **Notion** | 项目文档 | OAuth | list_pages, get_page |
| **Slack** | 团队沟通 | Token | send_message |
| **Database** | SQL 查询 | URL | query |
| **Filesystem** | 文件操作 | OS | read, write |
| **Google Workspace** | 文档协作 | OAuth | docs_read, gmail_send |

---

## 下一章预告

> "我希望某些操作能自动执行"

MCP 让 Claude **访问**外部工具。但有些操作你希望 **自动触发**：
- 每次保存文件时自动格式化
- 提交代码前自动运行检查
- 检测到敏感信息时自动警告

下一章 **08-hooks** 介绍事件驱动的自动化系统，让 Claude Code 在特定事件发生时自动执行操作。

---

## 更多资源

- [Official MCP Documentation](https://code.claude.com/docs/en/mcp)
- [MCP Protocol Specification](https://modelcontextprotocol.io/specification)
- [MCP Server Collection](https://github.com/modelcontextprotocol/servers)
- [MCPorter](https://github.com/steipete/mcporter) — MCP 调用运行时