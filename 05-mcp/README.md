---
cc_version_verified: "2.1.92"
last_verified: "2026-04-05"
---
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

> 🟡 **中级** | ⏱ 50 minutes
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证: 2026-04-05

**你将构建:** 将 Claude 连接到外部工具和实时数据源。

# MCP (Model Context Protocol)

本文件夹包含 MCP server 配置及其在 Claude Code 中使用的全面文档和示例。

## 概述

MCP (Model Context Protocol) 是 Claude 访问外部工具、API 和实时数据源的标准化方式。与 Memory 不同，MCP 提供对变化数据的实时访问。

关键特性：
- 实时访问外部服务
- 实时数据同步
- 可扩展架构
- 安全认证
- 基于 tool 的交互

## MCP 架构

```mermaid
graph TB
    A["Claude"]
    B["MCP Server"]
    C["External Service"]

    A -->|Request: list_issues| B
    B -->|Query| C
    C -->|Data| B
    B -->|Response| A

    A -->|Request: create_issue| B
    B -->|Action| C
    C -->|Result| B
    B -->|Response| A

    style A fill:#e1f5fe,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#e8f5e9,stroke:#333,color:#333
```

## MCP 生态系统

```mermaid
graph TB
    A["Claude"] -->|MCP| B["Filesystem<br/>MCP Server"]
    A -->|MCP| C["GitHub<br/>MCP Server"]
    A -->|MCP| D["Database<br/>MCP Server"]
    A -->|MCP| E["Slack<br/>MCP Server"]
    A -->|MCP| F["Google Docs<br/>MCP Server"]

    B -->|File I/O| G["Local Files"]
    C -->|API| H["GitHub Repos"]
    D -->|Query| I["PostgreSQL/MySQL"]
    E -->|Messages| J["Slack Workspace"]
    F -->|Docs| K["Google Drive"]

    style A fill:#e1f5fe,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#f3e5f5,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#f3e5f5,stroke:#333,color:#333
    style F fill:#f3e5f5,stroke:#333,color:#333
    style G fill:#e8f5e9,stroke:#333,color:#333
    style H fill:#e8f5e9,stroke:#333,color:#333
    style I fill:#e8f5e9,stroke:#333,color:#333
    style J fill:#e8f5e9,stroke:#333,color:#333
    style K fill:#e8f5e9,stroke:#333,color:#333
```

## MCP 安装方式

Claude Code 支持多种传输协议用于 MCP server 连接：

### HTTP 传输（推荐）

```bash
# Basic HTTP connection
claude mcp add --transport http notion https://mcp.notion.com/mcp

# HTTP with authentication header
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### Stdio 传输（本地）

用于本地运行的 MCP server：

```bash
# Local Node.js server
claude mcp add --transport stdio myserver -- npx @myorg/mcp-server

# With environment variables
claude mcp add --transport stdio myserver --env KEY=value -- npx server
```

### SSE 传输（已弃用）

Server-Sent Events 传输已被 `http` 取代，但仍受支持：

```bash
claude mcp add --transport sse legacy-server https://example.com/sse
```

### WebSocket 传输

WebSocket 传输用于持久的双向连接：

```bash
claude mcp add --transport ws realtime-server wss://example.com/mcp
```

### Windows 特别说明

在原生 Windows（非 WSL）上，对 npx 命令使用 `cmd /c`：

```bash
claude mcp add --transport stdio my-server -- cmd /c npx -y @some/package
```

### OAuth 2.0 认证

Claude Code 支持为需要 OAuth 2.0 的 MCP server 进行认证。连接到启用 OAuth 的 server 时，Claude Code 会处理整个认证流程：

```bash
# Connect to an OAuth-enabled MCP server (interactive flow)
claude mcp add --transport http my-service https://my-service.example.com/mcp

# Pre-configure OAuth credentials for non-interactive setup
claude mcp add --transport http my-service https://my-service.example.com/mcp \
  --client-id "your-client-id" \
  --client-secret "your-client-secret" \
  --callback-port 8080
```

| 功能 | 描述 |
|---------|-------------|
| **交互式 OAuth** | 使用 `/mcp` 触发浏览器端的 OAuth 流程 |
| **预配置 OAuth 客户端** | 为常见服务如 Notion、Stripe 等提供内置 OAuth 客户端 (v2.1.30+) |
| **预配置凭据** | `--client-id`、`--client-secret`、`--callback-port` 标志用于自动设置 |
| **Token 存储** | Token 安全存储在系统密钥链中 |
| **Step-up auth** | 支持特权操作的 step-up 认证 |
| **Discovery 缓存** | OAuth discovery 元数据被缓存以加快重连速度 |
| **Metadata override** | `.mcp.json` 中的 `oauth.authServerMetadataUrl` 用于覆盖默认 OAuth 元数据发现 |

#### 覆盖 OAuth Metadata Discovery

如果 MCP server 在标准 OAuth 元数据端点 (`/.well-known/oauth-authorization-server`) 返回错误，但暴露了可用的 OIDC 端点，你可以告诉 Claude Code 从特定 URL 获取 OAuth 元数据。在 server 配置的 `oauth` 对象中设置 `authServerMetadataUrl`：

```json
{
  "mcpServers": {
    "my-server": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "oauth": {
        "authServerMetadataUrl": "https://auth.example.com/.well-known/openid-configuration"
      }
    }
  }
}
```

URL 必须使用 `https://`。此选项需要 Claude Code v2.1.64 或更高版本。

### Claude.ai MCP Connectors

在 Claude.ai 账户中配置的 MCP server 会自动在 Claude Code 中可用。这意味着通过 Claude.ai 网页界面设置的任何 MCP 连接都可直接访问，无需额外配置。

Claude.ai MCP connectors 在 `--print` 模式下也可用 (v2.1.83+)，支持非交互式和脚本化使用。

要禁用 Claude Code 中的 Claude.ai MCP server，将 `ENABLE_CLAUDEAI_MCP_SERVERS` 环境变量设置为 `false`：

```bash
ENABLE_CLAUDEAI_MCP_SERVERS=false claude
```

> **注意:** 此功能仅对使用 Claude.ai 账户登录的用户可用。

## MCP 设置流程

```mermaid
sequenceDiagram
    participant User
    participant Claude as Claude Code
    participant Config as Config File
    participant Service as External Service

    User->>Claude: Type /mcp
    Claude->>Claude: List available MCP servers
    Claude->>User: Show options
    User->>Claude: Select GitHub MCP
    Claude->>Config: Update configuration
    Config->>Claude: Activate connection
    Claude->>Service: Test connection
    Service-->>Claude: Authentication successful
    Claude->>User: ✅ MCP connected!
```

## MCP Tool 搜索

当 MCP tool 描述超过上下文窗口 10% 时，Claude Code 自动启用 tool 搜索，以高效选择正确的 tools，避免模型上下文过载。

| 设置 | 值 | 描述 |
|---------|-------|-------------|
| `ENABLE_TOOL_SEARCH` | `auto` (默认) | tool 描述超过上下文 10% 时自动启用 |
| `ENABLE_TOOL_SEARCH` | `auto:<N>` | 在 `N` 个 tools 的自定义阈值时自动启用 |
| `ENABLE_TOOL_SEARCH` | `true` | 无论 tool 数量如何始终启用 |
| `ENABLE_TOOL_SEARCH` | `false` | 禁用；所有 tool 描述完整发送 |

> **注意:** Tool 搜索需要 Sonnet 4 或更高版本，或 Opus 4 或更高版本。Haiku 模型不支持 tool 搜索。

## 动态 Tool 更新

Claude Code 支持 MCP `list_changed` 通知。当 MCP server 动态添加、删除或修改其可用 tools 时，Claude Code 会收到更新并自动调整 tool 列表 —— 无需重新连接或重启。

## MCP Elicitation

MCP server 可以通过交互式对话框请求用户的结构化输入 (v2.1.49+)。这允许 MCP server 在工作流中途请求额外信息 —— 例如，提示确认、从选项列表中选择或填写必填字段 —— 为 MCP server 交互增加交互性。

## Tool 描述和指令上限

从 v2.1.84 起，Claude Code 对每个 MCP server 的 tool 描述和指令强制执行 **2 KB 上限**。这防止单个 server 用过于冗长的 tool 定义消耗过多上下文，减少上下文膨胀并保持交互高效。

## MCP Prompts 作为 Slash 命令

MCP server 可以暴露在 Claude Code 中作为 slash 命令出现的 prompts。Prompts 可使用命名约定访问：

```
/mcp__<server>__<prompt>
```

例如，名为 `github` 的 server 暴露名为 `review` 的 prompt，可通过 `/mcp__github__review` 调用。

## Server 去重

当同一 MCP server 在多个作用域（local、project、user）中定义时，本地配置优先。这允许你用本地自定义覆盖项目级或用户级 MCP 设置而不产生冲突。

## MCP Resources 通过 @ 引用

你可以使用 `@` 引用语法在 prompts 中直接引用 MCP resources：

```
@server-name:protocol://resource/path
```

例如，引用特定数据库 resource：

```
@database:postgres://mydb/users
```

这允许 Claude 在对话上下文中获取并包含 MCP resource 内容。

## MCP 作用域

MCP 配置可存储在不同作用域，具有不同的共享级别：

| 作用域 | 位置 | 描述 | 共享对象 | 需要批准 |
|-------|----------|-------------|-------------|------------------|
| **Local** (默认) | `~/.claude.json` (project path 下) | 仅当前用户、当前项目私有（旧版本称为 `project`） | 仅你 | 否 |
| **Project** | `.mcp.json` | 检入 git 仓库 | 团队成员 | 是（首次使用） |
| **User** | `~/.claude.json` | 跨所有项目可用（旧版本称为 `global`） | 仅你 | 否 |

### 使用 Project 作用域

将项目特定的 MCP 配置存储在 `.mcp.json`：

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.github.com/mcp"
    }
  }
}
```

团队成员在首次使用 project MCPs 时会看到批准提示。

## MCP 配置管理

### 添加 MCP Server

```bash
# Add HTTP-based server
claude mcp add --transport http github https://api.github.com/mcp

# Add local stdio server
claude mcp add --transport stdio database -- npx @company/db-server

# List all MCP servers
claude mcp list

# Get details on specific server
claude mcp get github

# Remove an MCP server
claude mcp remove github

# Reset project-specific approval choices
claude mcp reset-project-choices

# Import from Claude Desktop
claude mcp add-from-claude-desktop
```

## 可用 MCP Server 表

| MCP Server | 用途 | 常用 Tools | 认证 | 实时 |
|------------|---------|--------------|------|-----------|
| **Filesystem** | 文件操作 | read, write, delete | OS permissions | ✅ Yes |
| **GitHub** | 仓库管理 | list_prs, create_issue, push | OAuth | ✅ Yes |
| **Slack** | 团队沟通 | send_message, list_channels | Token | ✅ Yes |
| **Database** | SQL 查询 | query, insert, update | Credentials | ✅ Yes |
| **Google Docs** | 文档访问 | read, write, share | OAuth | ✅ Yes |
| **Asana** | 项目管理 | create_task, update_status | API Key | ✅ Yes |
| **Stripe** | 支付数据 | list_charges, create_invoice | API Key | ✅ Yes |
| **Memory** | 持久记忆 | store, retrieve, delete | Local | ❌ No |

## 实际示例

### 示例 1: GitHub MCP 配置

**文件:** `.mcp.json` (项目根目录)

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

**可用 GitHub MCP Tools:**

#### Pull Request 管理
- `list_prs` - 列出仓库所有 PR
- `get_pr` - 获取 PR 详情包括 diff
- `create_pr` - 创建新 PR
- `update_pr` - 更新 PR 描述/标题
- `merge_pr` - 合并 PR 到主分支
- `review_pr` - 添加审查评论

**示例请求:**
```
/mcp__github__get_pr 456

# Returns:
Title: Add dark mode support
Author: @alice
Description: Implements dark theme using CSS variables
Status: OPEN
Reviewers: @bob, @charlie
```

#### Issue 管理
- `list_issues` - 列出所有 issues
- `get_issue` - 获取 issue 详情
- `create_issue` - 创建新 issue
- `close_issue` - 关闭 issue
- `add_comment` - 添加 issue 评论

#### 仓库信息
- `get_repo_info` - 仓库详情
- `list_files` - 文件树结构
- `get_file_content` - 读取文件内容
- `search_code` - 搜索代码库

#### Commit 操作
- `list_commits` - Commit 历史
- `get_commit` - 特定 commit 详情
- `create_commit` - 创建新 commit

**设置:**
```bash
export GITHUB_TOKEN="your_github_token"
# Or use the CLI to add directly:
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

### 配置中的环境变量展开

MCP 配置支持带回退默认值的环境变量展开。`${VAR}` 和 `${VAR:-default}` 语法适用于以下字段：`command`、`args`、`env`、`url` 和 `headers`。

```json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}",
        "X-Custom-Header": "${CUSTOM_HEADER:-default-value}"
      }
    },
    "local-server": {
      "command": "${MCP_BIN_PATH:-npx}",
      "args": ["${MCP_PACKAGE:-@company/mcp-server}"],
      "env": {
        "DB_URL": "${DATABASE_URL:-postgresql://localhost/dev}"
      }
    }
  }
}
```

变量在运行时展开：
- `${VAR}` - 使用环境变量，未设置时报错
- `${VAR:-default}` - 使用环境变量，未设置时回退到默认值

### 示例 2: Database MCP 设置

**配置:**

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-database"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

**示例用法:**

```markdown
User: Fetch all users with more than 10 orders

Claude: I'll query your database to find that information.

# Using MCP database tool:
SELECT u.*, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING COUNT(o.id) > 10
ORDER BY order_count DESC;

# Results:
- Alice: 15 orders
- Bob: 12 orders
- Charlie: 11 orders
```

**设置:**
```bash
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
# Or use the CLI to add directly:
claude mcp add --transport stdio database -- npx @modelcontextprotocol/server-database
```

### 示例 3: 多 MCP 工作流

**场景: 日报生成**

```markdown
# Daily Report Workflow using Multiple MCPs

## Setup
1. GitHub MCP - fetch PR metrics
2. Database MCP - query sales data
3. Slack MCP - post report
4. Filesystem MCP - save report

## Workflow

### Step 1: Fetch GitHub Data
/mcp__github__list_prs completed:true last:7days

Output:
- Total PRs: 42
- Average merge time: 2.3 hours
- Review turnaround: 1.1 hours

### Step 2: Query Database
SELECT COUNT(*) as sales, SUM(amount) as revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '1 day'

Output:
- Sales: 247
- Revenue: $12,450

### Step 3: Generate Report
Combine data into HTML report

### Step 4: Save to Filesystem
Write report.html to /reports/

### Step 5: Post to Slack
Send summary to #daily-reports channel

Final Output:
✅ Report generated and posted
📊 47 PRs merged this week
💰 $12,450 in daily sales
```

**设置:**
```bash
export GITHUB_TOKEN="your_github_token"
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
export SLACK_TOKEN="your_slack_token"
# Add each MCP server via the CLI or configure them in .mcp.json
```

### 示例 4: Filesystem MCP 操作

**配置:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}
```

**可用操作:**

| 操作 | 命令 | 用途 |
|-----------|---------|---------|
| List files | `ls ~/projects` | 显示目录内容 |
| Read file | `cat src/main.ts` | 读取文件内容 |
| Write file | `create docs/api.md` | 创建新文件 |
| Edit file | `edit src/app.ts` | 修改文件 |
| Search | `grep "async function"` | 搜索文件 |
| Delete | `rm old-file.js` | 删除文件 |

**设置:**
```bash
# Use the CLI to add directly:
claude mcp add --transport stdio filesystem -- npx @modelcontextprotocol/server-filesystem /home/user/projects
```

## MCP vs Memory: 决策矩阵

```mermaid
graph TD
    A["Need external data?"]
    A -->|No| B["Use Memory"]
    A -->|Yes| C["Does it change frequently?"]
    C -->|No/Rarely| B
    C -->|Yes/Often| D["Use MCP"]

    B -->|Stores| E["Preferences<br/>Context<br/>History"]
    D -->|Accesses| F["Live APIs<br/>Databases<br/>Services"]

    style A fill:#fff3e0,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#fff3e0,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#e8f5e9,stroke:#333,color:#333
    style F fill:#e8f5e9,stroke:#333,color:#333
```

## 请求/响应模式

```mermaid
sequenceDiagram
    participant App as Claude
    participant MCP as MCP Server
    participant DB as Database

    App->>MCP: Request: "SELECT * FROM users WHERE id=1"
    MCP->>DB: Execute query
    DB-->>MCP: Result set
    MCP-->>App: Return parsed data
    App->>App: Process result
    App->>App: Continue task

    Note over MCP,DB: Real-time access<br/>No caching
```

## 环境变量

将敏感凭据存储在环境变量中：

```bash
# ~/.bashrc or ~/.zshrc
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxx"
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
export SLACK_TOKEN="xoxb-xxxxxxxxxxxxx"
```

然后在 MCP 配置中引用：

```json
{
  "env": {
    "GITHUB_TOKEN": "${GITHUB_TOKEN}"
  }
}
```

## Claude 作为 MCP Server (`claude mcp serve`)

Claude Code 本身可以作为 MCP server 为其他应用程序提供服务。这使外部工具、编辑器和自动化系统可以通过标准 MCP 协议利用 Claude 的能力。

```bash
# Start Claude Code as an MCP server on stdio
claude mcp serve
```

其他应用程序可以像连接任何 stdio MCP server 一样连接到此 server。例如，在另一个 Claude Code 实例中添加 Claude Code 作为 MCP server：

```bash
claude mcp add --transport stdio claude-agent -- claude mcp serve
```

这对于构建多智能体工作流很有用，一个 Claude 实例编排另一个。

## 托管 MCP 配置（企业版）

对于企业部署，IT 管理员可以通过 `managed-mcp.json` 配置文件强制执行 MCP server 策略。此文件提供对组织范围内允许或阻止哪些 MCP server 的独占控制。

**位置:**
- macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json`
- Linux: `~/.config/ClaudeCode/managed-mcp.json`
- Windows: `%APPDATA%\ClaudeCode\managed-mcp.json`

**功能:**
- `allowedMcpServers` -- 允许的 server 白名单
- `deniedMcpServers` -- 禁止的 server 黑名单
- 支持按 server 名称、命令和 URL 模式匹配
- 组织范围的 MCP 策略在用户配置之前强制执行
- 防止未授权的 server 连接

**示例配置:**

```json
{
  "allowedMcpServers": [
    {
      "serverName": "github",
      "serverUrl": "https://api.github.com/mcp"
    },
    {
      "serverName": "company-internal",
      "serverCommand": "company-mcp-server"
    }
  ],
  "deniedMcpServers": [
    {
      "serverName": "untrusted-*"
    },
    {
      "serverUrl": "http://*"
    }
  ]
}
```

> **注意:** 当 `allowedMcpServers` 和 `deniedMcpServers` 都匹配某个 server 时，拒绝规则优先。

## Plugin 提供的 MCP Server

Plugins 可以捆绑自己的 MCP server，在 plugin 安装时自动可用。Plugin 提供的 MCP server 可以通过两种方式定义：

1. **独立 `.mcp.json`** -- 在 plugin 根目录放置 `.mcp.json` 文件
2. **内联在 `plugin.json`** -- 在 plugin manifest 中直接定义 MCP server

使用 `${CLAUDE_PLUGIN_ROOT}` 变量引用相对于 plugin 安装目录的路径：

```json
{
  "mcpServers": {
    "plugin-tools": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/dist/mcp-server.js"],
      "env": {
        "CONFIG_PATH": "${CLAUDE_PLUGIN_ROOT}/config.json"
      }
    }
  }
}
```

## Subagent 作用域 MCP

MCP server 可以使用 `mcpServers:` 键在 agent frontmatter 中内联定义，将其作用域限定到特定 subagent 而非整个项目。这适用于 agent 需要访问其他 agent 不需要的特定 MCP server 的场景。

```yaml
---
mcpServers:
  my-tool:
    type: http
    url: https://my-tool.example.com/mcp
---

You are an agent with access to my-tool for specialized operations.
```

Subagent 作用域 MCP server 仅在该 agent 的执行上下文中可用，不与父 agent 或兄弟 agent 共享。

## MCP 输出限制

Claude Code 对 MCP tool 输出强制执行限制以防止上下文溢出：

| 限制 | 阈值 | 行为 |
|-------|-----------|----------|
| **警告** | 10,000 tokens | 显示警告，提示输出过大 |
| **默认上限** | 25,000 tokens | 输出超过此限制时截断 |
| **磁盘持久化** | 50,000 字符 | Tool 结果超过 50K 字符时持久化到磁盘 |

最大输出限制可通过 `MAX_MCP_OUTPUT_TOKENS` 环境变量配置：

```bash
# Increase the max output to 50,000 tokens
export MAX_MCP_OUTPUT_TOKENS=50000
```

## 使用 Code Execution 解决上下文膨胀

随着 MCP 应用规模扩大，连接到数十个 server 和数百或数千个 tools 带来重大挑战：**上下文膨胀**。这可以说是 MCP 规模化的最大问题，Anthropic 工程团队提出了优雅的解决方案 —— 使用 code execution 而非直接 tool 调用。

> **来源**: [Code Execution with MCP: Building More Efficient Agents](https://www.anthropic.com/engineering/code-execution-with-mcp) — Anthropic Engineering Blog

### 问题: Token 浪费的两个来源

**1. Tool 定义过载上下文窗口**

大多数 MCP 客户端预先加载所有 tool 定义。当连接到数千个 tools 时，模型必须在读取用户请求前处理数百数千个 tokens。

**2. 中间结果消耗额外 tokens**

每个中间 tool 结果通过模型上下文。考虑将会议记录从 Google Drive 传输到 Salesforce —— 完整记录流经上下文**两次**：一次读取，一次写入目标。2 小时会议记录可能意味着 50,000+ 额外 tokens。

```mermaid
graph LR
    A["Model"] -->|"Tool Call: getDocument"| B["MCP Server"]
    B -->|"Full transcript (50K tokens)"| A
    A -->|"Tool Call: updateRecord<br/>(re-sends full transcript)"| B
    B -->|"Confirmation"| A

    style A fill:#ffcdd2,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
```

### 解决方案: MCP Tools 作为 Code API

代理不通过上下文窗口传递 tool 定义和结果，而是**编写代码**调用 MCP tools 作为 API。代码在沙箱执行环境中运行，只有最终结果返回给模型。

```mermaid
graph LR
    A["Model"] -->|"Writes code"| B["Code Execution<br/>Environment"]
    B -->|"Calls tools directly"| C["MCP Servers"]
    C -->|"Data stays in<br/>execution env"| B
    B -->|"Only final result<br/>(minimal tokens)"| A

    style A fill:#c8e6c9,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#f3e5f5,stroke:#333,color:#333
```

#### 工作原理

MCP tools 以类型化函数的文件树形式呈现：

```
servers/
├── google-drive/
│   ├── getDocument.ts
│   └── index.ts
├── salesforce/
│   ├── updateRecord.ts
│   └── index.ts
└── ...
```

每个 tool 文件包含类型化包装器：

```typescript
// ./servers/google-drive/getDocument.ts
import { callMCPTool } from "../../../client.js";

interface GetDocumentInput {
  documentId: string;
}

interface GetDocumentResponse {
  content: string;
}

export async function getDocument(
  input: GetDocumentInput
): Promise<GetDocumentResponse> {
  return callMCPTool<GetDocumentResponse>(
    'google_drive__get_document', input
  );
}
```

代理然后编写代码编排 tools：

```typescript
import * as gdrive from './servers/google-drive';
import * as salesforce from './servers/salesforce';

// Data flows directly between tools — never through the model
const transcript = (
  await gdrive.getDocument({ documentId: 'abc123' })
).content;

await salesforce.updateRecord({
  objectType: 'SalesMeeting',
  recordId: '00Q5f000001abcXYZ',
  data: { Notes: transcript }
});
```

**结果: Token 使用从 ~150,000 降至 ~2,000 — 减少 98.7%。**

### 关键收益

| 收益 | 描述 |
|---------|-------------|
| **渐进式披露** | Agent 浏览文件系统仅加载需要的 tool 定义，而非预先加载所有 |
| **上下文高效结果** | 数据在执行环境中过滤/转换后再返回模型 |
| **强大控制流** | 循环、条件和错误处理在代码中运行，无需往返模型 |
| **隐私保护** | 中间数据 (PII、敏感记录) 保留在执行环境；永不进入模型上下文 |
| **状态持久化** | Agents 可以保存中间结果到文件并构建可复用 skill 函数 |

#### 示例: 过滤大数据集

```typescript
// Without code execution — all 10,000 rows flow through context
// TOOL CALL: gdrive.getSheet(sheetId: 'abc123')
//   -> returns 10,000 rows in context

// With code execution — filter in the execution environment
const allRows = await gdrive.getSheet({ sheetId: 'abc123' });
const pendingOrders = allRows.filter(
  row => row["Status"] === 'pending'
);
console.log(`Found ${pendingOrders.length} pending orders`);
console.log(pendingOrders.slice(0, 5)); // Only 5 rows reach the model
```

#### 示例: 无往返循环

```typescript
// Poll for a deployment notification — runs entirely in code
let found = false;
while (!found) {
  const messages = await slack.getChannelHistory({
    channel: 'C123456'
  });
  found = messages.some(
    m => m.text.includes('deployment complete')
  );
  if (!found) await new Promise(r => setTimeout(r, 5000));
}
console.log('Deployment notification received');
```

### 需考虑的权衡

Code execution 引入其自身复杂性。运行代理生成的代码需要：

- **安全沙箱执行环境**，具有适当的资源限制
- 执行代码的**监控和日志记录**
- 与直接 tool 调用相比额外的**基础设施开销**

收益 —— 降低 token 成本、更低延迟、更好的 tool 组合 —— 应权衡这些实现成本。对于只有少量 MCP server 的 agent，直接 tool 调用可能更简单。对于规模化的 agent（数十个 server、数百个 tools），code execution 是显著改进。

### MCPorter: MCP Tool 组合运行时

[MCPorter](https://github.com/steipete/mcporter) 是 TypeScript 运行时和 CLI 工具包，无需样板代码即可调用 MCP server —— 并通过选择性 tool 暴露和类型化包装器帮助减少上下文膨胀。

**解决的问题:** 不预先加载所有 MCP server 的所有 tool 定义，MCPorter 让你按需发现、检查和调用特定 tools —— 保持上下文精简。

**关键功能:**

| 功能 | 描述 |
|---------|-------------|
| **零配置发现** | 自动从 Cursor、Claude、Codex 或本地配置发现 MCP server |
| **类型化 tool 客户端** | `mcporter emit-ts` 生成 `.d.ts` 接口和可运行包装器 |
| **可组合 API** | `createServerProxy()` 暴露 tools 为 camelCase 方法，带 `.text()`、`.json()`、`.markdown()` 辅助方法 |
| **CLI 生成** | `mcporter generate-cli` 将任何 MCP server 转换为独立 CLI，支持 `--include-tools` / `--exclude-tools` 过滤 |
| **参数隐藏** | 可选参数默认隐藏，减少 schema 冗长 |

**安装:**

```bash
npx mcporter list          # No install required — discover servers instantly
pnpm add mcporter          # Add to a project
brew install steipete/tap/mcporter  # macOS via Homebrew
```

**示例 — TypeScript 中组合 tools:**

```typescript
import { createRuntime, createServerProxy } from "mcporter";

const runtime = await createRuntime();
const gdrive = createServerProxy(runtime, "google-drive");
const salesforce = createServerProxy(runtime, "salesforce");

// Data flows between tools without passing through the model context
const doc = await gdrive.getDocument({ documentId: "abc123" });
await salesforce.updateRecord({
  objectType: "SalesMeeting",
  recordId: "00Q5f000001abcXYZ",
  data: { Notes: doc.text() }
});
```

**示例 — CLI tool 调用:**

```bash
# Call a specific tool directly
npx mcporter call linear.create_comment issueId:ENG-123 body:'Looks good!'

# List available servers and tools
npx mcporter list
```

MCPorter 补充了上述 code execution 方法，提供了调用 MCP tools 作为类型化 API 的运行时基础设施 —— 使中间数据不进入模型上下文变得简单。

## 立即尝试

### 🎯 练习 1: 安装你的第一个 MCP Server

安装 GitHub MCP server 用于 PR 管理：

**步骤 1: 添加 GitHub MCP**
```bash
/mcp
# Select "Add MCP server"
# Choose "github" from the list
# Or manually:
/mcp add github
```

**步骤 2: 认证**
```bash
/mcp github auth
# Follow OAuth flow
# Grant necessary permissions
```

**步骤 3: 测试 tools**
```bash
# In Claude Code:
/mcp__github__list_prs
/mcp__github__get_issue 123
```

### 🎯 练习 2: 在工作流中使用 MCP Tools

将 MCP 集成到日常工作流：

```bash
# Morning routine with MCP
/mcp__github__list_prs status:open
# Shows open PRs needing review

/mcp__github__get_issue 456
# Get details on issue you're working on

# After completing work
/mcp__github__pr_review 789
# Review PR with GitHub context
```

### 🎯 练习 3: MCP Prompts 作为命令

MCP server 暴露 prompts 作为 slash 命令：

```bash
# GitHub MCP prompts
/mcp__github__create_pr title="Add auth feature" body="..."
/mcp__github__comment_issue 123 "Fixed in PR #456"

# Jira MCP prompts (if configured)
/mcp__jira__create_issue "Bug in login" priority=high
/mcp__jira__update_status ISSUE-123 "In Progress"
```

### 🎯 练习 4: 自定义 MCP Server（高级）

为你的项目创建简单的 MCP server：

**步骤 1: 创建 server 包**
```bash
mkdir my-mcp-server
cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk
```

**步骤 2: 实现 server**
```typescript
// server.ts
import { Server } from '@modelcontextprotocol/sdk';

const server = new Server({
  name: 'my-project-mcp',
  version: '1.0.0'
});

// Add a custom tool
server.addTool({
  name: 'get-project-stats',
  description: 'Get project statistics',
  inputSchema: { type: 'object', properties: {} },
  handler: async () => {
    // Your custom logic
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          files: await countFiles(),
          tests: await countTests(),
          coverage: await getCoverage()
        })
      }]
    };
  }
});

server.start();
```

**步骤 3: 在 Claude Code 中配置**
```bash
/mcp add custom --command "node my-mcp-server/server.js"
```

**步骤 4: 使用你的 tool**
```bash
/mcp__custom__get-project-stats
```

### 🎯 练习 5: MCP 与 Subagents 结合

结合 MCP tools 与 subagent 委派：

```bash
# In Claude Code:
"Use the github MCP to fetch PR #456, then use the code-reviewer agent to analyze the changes"

# Flow:
# 1. MCP fetches PR data
# 2. Subagent reviews code
# 3. Results combined
```

**更复杂的工作流:**
```bash
"I'm working on issue #123. 
1. Use github MCP to get issue details
2. Use Explore agent to find related code
3. Use Plan agent to design solution
4. Implement the fix
5. Use github MCP to create PR referencing the issue"
```

## 最佳实践

### 安全考虑

#### 应做 ✅
- 对所有凭据使用环境变量
- 定期轮换 token 和 API key（建议每月）
- 尽可能使用只读 token
- 将 MCP server 访问范围限制到最小需求
- 监控 MCP server 使用和访问日志
- 对外部服务尽可能使用 OAuth
- 对 MCP 请求实施速率限制
- 生产使用前测试 MCP 连接
- 记录所有活跃 MCP 连接
- 保持 MCP server 包更新

#### 不应做 ❌
- 不要在配置文件中硬编码凭据
- 不要将 token 或密钥提交到 git
- 不要在团队聊天或邮件中分享 token
- 不要为团队项目使用个人 token
- 不要授予不必要的权限
- 不要忽略认证错误
- 不要公开暴露 MCP 端点
- 不要以 root/admin 权限运行 MCP server
- 不要在日志中缓存敏感数据
- 不要禁用认证机制

### 配置最佳实践

1. **版本控制**: 将 `.mcp.json` 放入 git 但对密钥使用环境变量
2. **最小权限**: 为每个 MCP server 授予最小必要权限
3. **隔离**: 尽可能在不同进程中运行不同 MCP server
4. **监控**: 记录所有 MCP 请求和错误以审计追踪
5. **测试**: 部署到生产前测试所有 MCP 配置

### 性能提示

- 在应用层缓存频繁访问的数据
- 使用特定的 MCP 查询以减少数据传输
- 监控 MCP 操作响应时间
- 对外部 API 考虑速率限制
- 执行多个操作时使用批处理

## 安装说明

### 前置要求
- 安装 Node.js 和 npm
- 安装 Claude Code CLI
- 外部服务的 API token/凭据

### 分步设置

1. **添加你的第一个 MCP server** 使用 CLI（示例：GitHub）：
```bash
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

   或在项目根目录创建 `.mcp.json` 文件：
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

2. **设置环境变量:**
```bash
export GITHUB_TOKEN="your_github_personal_access_token"
```

3. **测试连接:**
```bash
claude /mcp
```

4. **使用 MCP tools:**
```bash
/mcp__github__list_prs
/mcp__github__create_issue "Title" "Description"
```

### 特定服务的安装

**GitHub MCP:**
```bash
npm install -g @modelcontextprotocol/server-github
```

**Database MCP:**
```bash
npm install -g @modelcontextprotocol/server-database
```

**Filesystem MCP:**
```bash
npm install -g @modelcontextprotocol/server-filesystem
```

**Slack MCP:**
```bash
npm install -g @modelcontextprotocol/server-slack
```

## 故障排除

### MCP Server 未找到
```bash
# Verify MCP server is installed
npm list -g @modelcontextprotocol/server-github

# Install if missing
npm install -g @modelcontextprotocol/server-github
```

### 认证失败
```bash
# Verify environment variable is set
echo $GITHUB_TOKEN

# Re-export if needed
export GITHUB_TOKEN="your_token"

# Verify token has correct permissions
# Check GitHub token scopes at: https://github.com/settings/tokens
```

### 连接超时
- 检查网络连接: `ping api.github.com`
- 验证 API 端点可访问
- 检查 API 速率限制
- 尝试在配置中增加超时
- 检查防火墙或代理问题

### MCP Server 崩溃
- 检查 MCP server 日志: `~/.claude/logs/`
- 验证所有环境变量已设置
- 确保正确的文件权限
- 尝试重新安装 MCP server 包
- 检查同端口上的冲突进程

## 相关概念

### Memory vs MCP
- **Memory**: 存储持久、不变数据（偏好、上下文、历史）
- **MCP**: 访问实时、变化数据（API、数据库、实时服务）

###何时使用
- **使用 Memory**: 用户偏好、对话历史、学习到的上下文
- **使用 MCP**: 当前 GitHub issues、实时数据库查询、实时数据

### 与其他 Claude 功能集成
- 结合 MCP 与 Memory 获丰富上下文
- 在 prompts 中使用 MCP tools 获更好推理
- 利用多个 MCP 用于复杂工作流

## 更多资源

- [Official MCP Documentation](https://code.claude.com/docs/en/mcp)
- [MCP Protocol Specification](https://modelcontextprotocol.io/specification)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol/servers)
- [Available MCP Servers](https://github.com/modelcontextprotocol/servers)
- [MCPorter](https://github.com/steipete/mcporter) — TypeScript runtime & CLI for calling MCP servers without boilerplate
- [Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) — Anthropic's engineering blog on solving context bloat
- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Claude API Documentation](https://docs.anthropic.com)