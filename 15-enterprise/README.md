---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

> 🔴 **Advanced** | ⏱ 180 minutes
>
> ✅ Verified against Claude Code **v2.1.92** · Last verified: 2026-04-06

**你将构建：** 掌握企业级工作流、部署、监控和 CI/CD 集成。

# 企业部署与集成

在企业环境中部署和管理 Claude Code 的综合指南，涵盖工作流、远程控制、监控、可观测性和 CI/CD 集成。

## 目录

1. [概述](#概述)
2. [核心工作流](#核心工作流)
3. [企业部署](#企业部署)
4. [远程控制与会话](#远程控制与会话)
5. [监控与可观测性](#监控与可观测性)
6. [CI/CD 集成](#cicd-集成)
7. [实践练习](#实践练习)
8. [模式与配方](#模式与配方)
9. [最佳实践](#最佳实践)
10. [资源](#资源)

---

## 概述

Claude Code 的企业部署需要仔细考虑安全性、合规性、团队协作和运营效率。本模块涵盖生产就绪部署的核心模式。

### 核心能力

| 能力 | 描述 |
|------------|-------------|
| **托管设置** | 通过 MDM、注册表或配置文件进行集中配置管理 |
| **远程控制** | 多设备会话管理和远程执行 |
| **可观测性** | 用于生产监控的指标、日志和追踪 |
| **CI/CD 集成** | 自动化代码审查、测试和部署流水线 |

### 架构概览

```
┌──────────────────────────────────────────────────────────────────┐
│                     Enterprise Architecture                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐           │
│  │   MDM/IT    │    │   Config    │    │  Monitoring │           │
│  │   Admin     │───→│  Management │───→│   Platform  │           │
│  └─────────────┘    └─────────────┘    └─────────────┘           │
│         │                  │                  │                   │
│         ▼                  ▼                  ▼                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │                    Claude Code Clients                    │     │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐     │     │
│  │  │ Dev 1   │  │ Dev 2   │  │ CI/CD   │  │ Remote  │     │     │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘     │     │
│  └─────────────────────────────────────────────────────────┘     │
│         │                  │                  │                   │
│         ▼                  ▼                  ▼                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐           │
│  │   Shared    │    │   Audit     │    │   Cloud     │           │
│  │   Skills    │    │   Logs      │    │   Sync      │           │
│  └─────────────┘    └─────────────┘    └─────────────┘           │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 核心工作流

掌握核心工作流可显著提升企业环境中的开发效率。

### 代码审查工作流

#### 标准审查流程

```
User: Review this PR's code changes

Claude:
→ Read changed files
→ Analyze code quality
→ Check potential issues
→ Provide improvement suggestions

Review Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Strengths:
- Clean code structure
- Comprehensive error handling

Needs Improvement:
- src/auth.js:45 - Unhandled Promise rejection
- src/user.ts:120 - Missing input validation

Suggestions:
- Add try-catch wrapper
- Use Zod for schema validation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 自动化审查技能

创建审查技能以标准化流程：

```markdown
# .claude/skills/code-review/instructions.md

## Code Review Checklist

Run these checks:
1. Run linter (`npm run lint`)
2. Run type check (`npm run type-check`)
3. Run tests (`npm test`)
4. Check security issues
5. Generate coverage report

Output format:
- CRITICAL: Blocking issues (must fix)
- WARNING: Improvement suggestions (should fix)
- INFO: Good practices (acknowledge)
```

### 调试工作流

#### 系统化调试

```
User: Help debug this bug: user login failure

Claude:
[Phase 1] Information Gathering
→ View error logs
→ Check related code
→ Understand reproduction steps

[Phase 2] Problem Identification
→ Analyze error stack
→ Check data flow
→ Verify hypothesis

[Phase 3] Fix & Verification
→ Implement fix
→ Add tests
→ Verify fix

Bug Fixed
Cause: Missing secret key during JWT token verification
Location: src/auth.js:78
Fix: Added environment variable check
```

#### 调试最佳实践

**DO - 应该做的：**

1. **提供完整的错误信息**
   ```
   User: Debug this error

   BAD: "It doesn't work"

   GOOD:
   "TypeError: Cannot read property 'map' of undefined
   at UserList.render (src/UserList.ts:45)
   Reproduction: Open user list page"
   ```

2. **隔离问题**
   ```
   User: Help create minimal reproduction

   Claude:
   → Extract core logic
   → Create standalone test file
   → Verify problem
   ```

### 重构工作流

#### 安全重构流程

```
User: Refactor this component to improve performance

Claude:
[Step 1] Understand Code
→ Analyze component structure
→ Identify performance bottlenecks
→ Assess impact scope

[Step 2] Plan
→ Use plan mode
→ List refactoring steps
→ Assess risks

[Step 3] Execute
→ Small iterations
→ Keep tests passing
→ Gradual optimization

[Step 4] Verify
→ Run all tests
→ Performance comparison
→ Code review

Refactoring Complete
Performance improvement: 60%
Tests: All passing
```

#### 重构检查清单

```markdown
## Pre-Refactoring Checklist

- [ ] Backup current code
- [ ] Run test suite
- [ ] Record current performance metrics
- [ ] Identify dependencies

## During Refactoring

- [ ] Small commits
- [ ] Run tests after each step
- [ ] Keep functionality unchanged
- [ ] Update documentation

## Post-Refactoring

- [ ] All tests pass
- [ ] Performance improvement verified
- [ ] Code review completed
- [ ] API documentation updated
```

### 开发工作流

#### 项目启动流程

```
New Project Start
    |
    v
[1] Create CLAUDE.md
→ Project description
→ Tech stack
→ Architecture decisions
→ Code conventions
    |
    v
[2] Setup Dev Environment
→ Initialize project
→ Configure linter
→ Configure testing
→ Setup hooks
    |
    v
[3] Create Base Structure
→ Folder structure
→ Config files
→ Sample code
    |
    v
[4] Start Development
```

#### 功能开发流程

```
Requirement -> Design -> Implement -> Test -> Review -> Deploy

Detailed Flow:

User: Implement user authentication feature

Claude:
[Design Phase]
→ Use plan mode
→ Design data model
→ Design API interface
→ Design error handling

[Implementation Phase]
→ Create data model
→ Implement API endpoints
→ Add validation
→ Add error handling

[Testing Phase]
→ Unit tests
→ Integration tests
→ E2E tests

[Review Phase]
→ Code review
→ Performance check
→ Security check

[Deployment Phase]
→ Deployment script
→ Verify deployment
→ Setup monitoring
```

---

## 企业部署

在企业环境中部署 Claude Code 需要考虑安全性、合规性和团队协作。

### 托管设置

托管设置允许组织通过配置集中管理 Claude Code 行为。

#### 配置文件位置

```bash
# macOS
~/Library/Application Support/Claude Code/managed-settings.json

# Linux
~/.config/Claude Code/managed-settings.json

# Windows
%APPDATA%/Claude Code/managed-settings.json

# Cross-platform (v2.1.83+)
~/.claude/managed-settings.d/
  00-org-defaults.json
  10-team-policies.json
  20-project-overrides.json
```

#### 基础配置示例

```json
{
  "version": "1.0",
  "organization": "ExampleCorp",
  "settings": {
    "permissions": {
      "defaultMode": "auto",
      "autoApprove": {
        "bash": ["npm test", "npm run build", "git status"],
        "fileOperations": {
          "read": ["**/*.ts", "**/*.tsx", "**/*.json"],
          "write": ["src/**/*", "test/**/*"]
        }
      },
      "requireApproval": {
        "bash": ["rm -rf", "sudo", "docker"],
        "fileOperations": {
          "write": [".env", "*.key", "*.pem"]
        }
      }
    },

    "security": {
      "allowedDomains": ["github.com", "gitlab.example.com", "api.example.com"],
      "blockedDomains": ["suspicious-site.com"],
      "dataResidency": "eu",
      "disableTelemetry": true
    },

    "features": {
      "enableRewind": true,
      "enableBackgroundTasks": true,
      "enableMCP": true,
      "enableSkills": true,
      "maxConcurrentTasks": 5
    }
  }
}
```

### MDM / OS 级策略

#### macOS（使用 MDM）

```xml
<!-- com.claude.code.mobileconfig -->
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

#### Windows（使用组策略）

```powershell
# Group Policy Object
# Path: Computer Configuration -> Administrative Templates -> Claude Code

# Disable telemetry
reg add "HKLM\SOFTWARE\Policies\Anthropic\Claude Code" /v DisableTelemetry /t REG_DWORD /d 1

# Set default permission mode
reg add "HKLM\SOFTWARE\Policies\Anthropic\Claude Code" /v DefaultPermissionMode /t REG_SZ /d "auto"

# Configure proxy
reg add "HKLM\SOFTWARE\Policies\Anthropic\Claude Code" /v ProxyServer /t REG_SZ /d "proxy.example.com:8080"
```

### 基于角色的访问控制

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

### 审计日志

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

### 合规配置

#### SOC 2 / ISO 27001

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

---

## 远程控制与会话

Claude Code 支持远程会话管理，实现无缝的多设备工作流。

### 远程控制基础

远程控制让你可以从手机、平板或任何浏览器继续本地运行的 Claude Code 会话。

```
Local Machine                      Cloud/Remote Machine
    |                                    |
    |  Claude Code CLI                   |
    |  (Terminal)                        |
    |         |                          |
    |         | SSH/Remote Protocol      |
    |         v                          |
    |  +------------------+              |
    |  |  Remote Session  |              |
    |  |  Manager         |              |
    |  +------------------+              |
    |         |                          |
    |         v                          |
    |  Execute commands remotely         |
    |  Manage remote sessions            |
```

### 启动远程控制

**从 CLI：**

```bash
# Start with default session name
claude remote-control

# Start with custom name
claude remote-control --name "Auth Refactor"
```

**从会话内：**

```
/remote-control
/remote-control "Auth Refactor"
```

**可用标志：**

| 标志 | 描述 |
|------|-------------|
| `--name "title"` | 自定义会话标题，便于识别 |
| `--verbose` | 显示详细连接日志 |
| `--sandbox` | 启用文件系统和网络隔离 |
| `--no-sandbox` | 禁用沙箱（默认） |

### 连接到会话

从其他设备连接的三种方式：

1. **会话 URL** - 启动时打印到终端；在任意浏览器中打开
2. **二维码** - 启动后按空格键显示可扫描的二维码
3. **按名称查找** - 在 claude.ai/code 或 Claude 移动应用（iOS/Android）中浏览你的会话

### SSH 远程会话

#### 基本 SSH 远程使用

```bash
# SSH connection and use Claude Code
ssh user@remote-server

# On remote server
cd /path/to/project
claude

# Claude Code now runs on remote server
# All operations execute remotely
```

#### SSH 配置优化

```bash
# ~/.ssh/config

Host production
    HostName prod.example.com
    User deploy
    IdentityFile ~/.ssh/prod_key
    ServerAliveInterval 60
    ServerAliveCountMax 3

Host staging
    HostName staging.example.com
    User deploy
    IdentityFile ~/.ssh/staging_key
```

### 会话管理

#### 会话类型

```
+-------------------------------------+
|     Claude Code Session Types       |
+-------------------------------------+
|                                     |
|  [1] Local Session                  |
|      -> Runs directly locally       |
|      -> Data stored locally         |
|                                     |
|  [2] SSH Remote Session             |
|      -> Connect via SSH             |
|      -> Execute on remote           |
|                                     |
|  [3] Cloud Session (Experimental)   |
|      -> Cloud persistence           |
|      -> Multi-device sync           |
|                                     |
+-------------------------------------+
```

#### 恢复会话

```bash
# Continue most recent conversation
claude -c

# Resume named session
claude -r "auth-refactor" "finish this PR"

# Fork session for experimentation
claude --resume auth-refactor --fork-session "try OAuth instead"
```

### 会话检查点

#### 创建检查点

```
User: Create a checkpoint at this critical point

Claude:
→ Save current state
→ Record file snapshot
→ Save context

Checkpoint Created
Name: checkpoint-api-complete
Time: 2026-04-06 14:30:45
Contains:
- 12 modified files
- Complete conversation history
- Task progress records
```

---

## 监控与可观测性

生产环境需要全面的监控和可观测性以确保性能和可靠性。

### 可观测性三支柱

```
                    +-----------------+
                    | Observability   |
                    |    Platform     |
                    +--------+--------+
                             |
        +--------------------+--------------------+
        |                    |                    |
        v                    v                    v
+-----------+         +-----------+         +-----------+
|  Metrics  |         |   Logs    |         |  Traces   |
+-----------+         +-----------+         +-----------+
        |                    |                    |
        v                    v                    v
   [Numerical]          [Events]           [Request Chain]
   - CPU/Memory         - Error logs       - Call chain
   - Response time      - Audit logs       - Dependencies
   - Success rate       - Debug logs       - Bottlenecks
```

### 关键性能指标

| 指标类型 | 具体指标 | 目标 |
|-------------|-----------------|--------|
| **性能** | 平均响应时间 | < 2s |
| **性能** | P95 响应时间 | < 5s |
| **可靠性** | 成功率 | > 99% |
| **可靠性** | 错误率 | < 1% |
| **资源** | Token 消耗 | 监控趋势 |
| **资源** | 内存使用 | < 阈值 |

### OpenTelemetry 集成

#### 安装与配置

```bash
# Install OpenTelemetry
npm install @opentelemetry/api
npm install @opentelemetry/sdk-node
npm install @opentelemetry/exporter-metrics-otlp-grpc
```

#### 配置

```typescript
// telemetry.js
const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { OTLPGrpcMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-grpc');

const metricExporter = new OTLPGrpcMetricExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317',
});

const meterProvider = new MeterProvider({
  exporter: metricExporter,
  interval: 10000, // 10 seconds
});

meterProvider.start();

// Create metrics meter
const meter = meterProvider.getMeter('claude-code-metrics');

module.exports = { meter };
```

### 自定义指标

```typescript
const { meter } = require('./telemetry');

// Command execution counter
const commandCounter = meter.createCounter('claude.commands.total', {
  description: 'Total Claude Code commands executed',
});

// Command execution time
const commandDuration = meter.createHistogram('claude.commands.duration', {
  description: 'Claude Code command execution duration',
  unit: 'ms',
});

// Track command execution
async function trackCommand(command, fn) {
  const startTime = Date.now();

  try {
    await fn();
    commandCounter.add(1, { command, status: 'success' });
  } catch (error) {
    commandCounter.add(1, { command, status: 'error' });
    throw error;
  } finally {
    const duration = Date.now() - startTime;
    commandDuration.record(duration, { command });
  }
}
```

### 结构化日志

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
    new winston.transports.Console({
      format: winston.format.simple()
    }),
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

// Usage
auditLogger.log('file_access', 'user@example.com', {
  filePath: '/path/to/secret.js',
  operation: 'read',
  sessionId: 'session-123'
});
```

### Prometheus 告警规则

```yaml
# alerts.yml
groups:
  - name: claude_code_alerts
    interval: 30s
    rules:
      # High error rate alert
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

      # Response time alert
      - alert: SlowResponseTime
        expr: |
          histogram_quantile(0.95, claude_commands_duration_bucket) > 5000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Claude Code response time is slow"
          description: "P95 response time is {{ $value }}ms"
```

---

## CI/CD 集成

将 Claude Code 集成到 CI/CD 流水线，实现自动化代码审查、测试和部署。

### CI/CD 流水线概览

```
+--------------------------------------------------------------+
|                    CI/CD Pipeline                            |
+--------------------------------------------------------------+

[Push/PR]
    |
    v
+-------------+
| Checkout    |
+------+------+
       |
       v
+-----------------------------------------+
|  Claude Code Automated Checks           |
|  +-- Code format check                  |
|  +-- Type check                         |
|  +-- Linting                            |
|  +-- Security scan                      |
+------------------+----------------------+
                   |
                   v
            +--------------+
            | Run Tests    |
            +------+-------+
                   |
                   v
+-----------------------------------------+
|  Claude Code Review                     |
|  +-- Analyze code changes               |
|  +-- Check best practices               |
|  +-- Identify potential issues          |
|  +-- Generate review report             |
+------------------+----------------------+
                   |
                   v
            +--------------+
            | Build        |
            +------+-------+
                   |
                   v
            +--------------+
            | Deploy       |
            +--------------+
```

### GitHub Actions 集成

#### 基本 CI 流水线

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
          fetch-depth: 0  # Full history for better analysis

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

            const body = `## Claude Code Review

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
    - cron: '0 0 * * 0'  # Weekly run

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

# Claude Code code check
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

# Claude Code review
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

# Security scan
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

                    // Save review results
                    writeFile file: 'review.json', text: review

                    // Add to build info
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
            // Archive reports
            archiveArtifacts artifacts: '*.json,*.xml', allowEmptyArchive: true

            // Publish reports
            publishHTML([
                reportDir: '.claude/reports',
                reportFiles: 'index.html',
                reportName: 'Claude Code Report',
                keepAll: true
            ])
        }

        failure {
            // Send notification
            emailext(
                subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Claude Code checks failed. Please check the report.",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
```

---

## 实践练习

### 练习 1：企业配置设置

设置企业托管设置：

**步骤 1：创建托管设置**

```json
// managed-settings.json
{
  "version": "1.0",
  "organization": "MyCompany",
  "settings": {
    "permissions": {
      "defaultMode": "auto"
    },
    "security": {
      "disableTelemetry": true,
      "allowedDomains": ["github.com", "internal.company.com"]
    },
    "auditLogging": {
      "enabled": true,
      "logLevel": "detailed"
    }
  }
}
```

**步骤 2：部署到配置目录**

```bash
# macOS
cp managed-settings.json ~/Library/Application\ Support/Claude\ Code/

# Linux
cp managed-settings.json ~/.config/Claude\ Code/

# Windows
copy managed-settings.json "%APPDATA%\Claude Code\"
```

**步骤 3：验证配置**

```
User: Show current configuration

Claude:
Configuration loaded from:
- managed-settings.json
- ~/.claude/settings.json

Active settings:
- Permission mode: auto
- Telemetry: disabled
- Allowed domains: github.com, internal.company.com
```

### 练习 2：远程控制设置

设置并测试远程控制：

```bash
# Start remote control with custom name
claude remote-control --name "Feature Development"

# Output shows:
# Session URL: https://claude.ai/code/session/abc123
# Press SPACE to show QR code
```

**在其他设备上：**

1. 在浏览器中打开会话 URL
2. 或用移动设备扫描二维码
3. 会话显示完整上下文

### 练习 3：CI/CD 流水线集成

创建完整的 CI/CD 流水线：

**步骤 1：创建工作流文件**

```yaml
# .github/workflows/claude-pipeline.yml
name: Claude Code Pipeline

on:
  push:
    branches: [main]
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @anthropic-ai/claude-code
      - run: claude -p "Analyze code quality"
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

**步骤 2：运行流水线**

```bash
git add .github/workflows/claude-pipeline.yml
git commit -m "Add Claude Code CI pipeline"
git push
```

### 练习 4：监控设置

设置 OpenTelemetry 监控：

**步骤 1：安装依赖**

```bash
npm install @opentelemetry/api @opentelemetry/sdk-node
```

**步骤 2：创建遥测模块**

```javascript
// telemetry.js
const { MeterProvider } = require('@opentelemetry/sdk-metrics');

const meterProvider = new MeterProvider({
  exporter: new OTLPGrpcMetricExporter({
    url: 'http://localhost:4317',
  }),
  interval: 10000,
});

const meter = meterProvider.getMeter('claude-code');
module.exports = { meter };
```

---

## 模式与配方

### 模式 1：多环境配置

```json
// config/environments.json
{
  "development": {
    "permissions": { "defaultMode": "auto" },
    "features": { "enableDebugLogging": true }
  },
  "staging": {
    "permissions": { "defaultMode": "default" },
    "auditLogging": { "enabled": true }
  },
  "production": {
    "permissions": { "defaultMode": "default" },
    "security": { "strictMode": true },
    "auditLogging": { "enabled": true, "logLevel": "detailed" }
  }
}
```

### 模式 2：团队共享技能

```bash
# Shared skills directory structure
/opt/team-claude-skills/
├── code-review/
│   ├── skill.json
│   └── instructions.md
├── deploy-staging/
├── test-coverage/
└── security-scan/

# Configure in CLAUDE.md
export CLAUDE_TEAM_SKILLS_PATH=/opt/team-claude-skills
```

### 模式 3：自动化 Pre-commit Hooks

```bash
#!/bin/bash
# .claude/hooks/pre-commit

echo "Running team pre-commit checks..."

# 1. Check for sensitive information
if git diff --cached | grep -iE "(password|api_key|secret)"; then
  echo "CRITICAL: Potential sensitive information detected!"
  exit 1
fi

# 2. Run linter
npm run lint -- --quiet
if [ $? -ne 0 ]; then
  echo "Lint failed, please fix before committing"
  exit 1
fi

# 3. Run type check
npm run type-check -- --quiet
if [ $? -ne 0 ]; then
  echo "Type check failed"
  exit 1
fi

# 4. Run fast tests
npm test -- --testPathPattern="unit" --quiet
if [ $? -ne 0 ]; then
  echo "Unit tests failed"
  exit 1
fi

echo "Pre-commit checks passed"
```

### 模式 4：部署工作流

```
[Phase 1] Pilot
→ Select 5% users
→ Deploy new configuration
→ Monitor for 1 week
    |
    v
[Phase 2] Gradual Rollout
→ Expand to 25% users
→ Collect feedback
→ Fix issues
    |
    v
[Phase 3] Full Deployment
→ Roll out to all users
→ Continuous monitoring
```

---

## 最佳实践

### 企业部署

- 对所有配置文件使用版本控制
- 实施渐进式发布策略
- 启用审计日志以满足合规要求
- 定期进行安全审查
- 记录所有自定义配置

### 远程控制

- 使用 SSH 密钥认证进行远程连接
- 在关键节点创建检查点
- 定期监控会话活动
- 保护会话分享链接

### CI/CD 集成

- 在 CI 流水线中缓存依赖
- 并行运行独立作业
- 使用矩阵策略进行多版本测试
- 使用 secrets 保护敏感信息
- 设置适当的超时时间

### 监控

- 适当采样追踪（10-20%）
- 使用适当的日志级别
- 在日志中保护敏感信息
- 定期审查关键指标
- 为关键阈值设置告警

---

## 资源

### 官方文档

- [Enterprise Deployment Guide](https://code.claude.com/docs/en/enterprise)
- [Remote Control Documentation](https://code.claude.com/docs/en/remote-control)
- [Managed Settings Reference](https://code.claude.com/docs/en/managed-settings)
- [Desktop Quickstart](https://code.claude.com/docs/en/desktop-quickstart)

### 相关模块

- [Advanced Features](../09-advanced-features/) - Planning, thinking, permissions
- [Hooks](../06-hooks/) - Event-driven automation
- [MCP](../05-mcp/) - External data access
- [Subagents](../04-subagents/) - Task delegation

### 外部资源

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Prometheus Best Practices](https://prometheus.io/docs/practices/)
- [Grafana Dashboards](https://grafana.com/docs/grafana/latest/dashboards/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)