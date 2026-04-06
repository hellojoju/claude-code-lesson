---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---
> 🟡 **中级** | ⏱ 45 分钟

# 后台任务与消息通道

## 为什么需要这个？

有些任务要跑很长时间。

想象这样一个场景：你让 Claude 运行完整测试套件，需要 15 分钟。在此期间，你被迫盯着屏幕等待——或者更糟，你开始做别的事，回来时已经忘了当初要干什么。

这就是 **后台任务** 解决的问题：启动任务后立即返回，你继续工作，任务完成时自动通知你。

更进一步，如果你想让整个团队都能收到构建结果通知，或者下班后让 Claude 继续处理，这就是 **消息通道** 的价值：把通知推送到 Discord、Slack 等平台，实现团队协作和远程监控。

## 核心概念

### 后台任务机制

后台任务允许你启动长时间操作而不阻塞会话：

```mermaid
graph LR
    A[你: 启动任务] --> B[后台执行]
    B --> C[继续其他对话]
    C --> D[任务完成]
    D --> E[收到通知]
    E --> A
```

**关键特性：**

| 特性 | 说明 |
|------|------|
| 非阻塞执行 | 任务在后台运行，你可以继续对话 |
| 自动通知 | 任务完成后收到 `<task-notification>` |
| 状态查询 | 随时使用 `/tasks` 查看所有任务状态 |
| 并行处理 | 多个独立任务可以同时运行 |

### 消息通道机制

Channels 通过 MCP 协议将通知推送到外部平台：

```mermaid
graph LR
    A[Claude Code] --> B[MCP Server]
    B --> C[Discord]
    B --> D[Slack]
    B --> E[自定义端点]
    C --> F[团队成员]
    D --> F
```

**核心价值：**

- **团队通知**：构建结果、测试状态自动推送到团队频道
- **远程监控**：下班后任务完成时收到手机通知
- **双向通信**：团队可以在 Slack 中给出反馈，Claude 读取并响应

### 任务类型对比

| 类型 | 运行位置 | 最长时间 | 适用场景 |
|------|----------|----------|----------|
| Background Shell | 本地 | 当前会话 | 等待长时间命令 |
| Agent 后台 | 本地 | 当前会话 | 独立研究任务 |
| `/loop` | 本地 | 3 天 | 持续监控修复 |
| `/schedule` | 云端 | 不限 | 定时执行 |

---

## 场景 1：启动后台任务

### 问题描述

你正在开发一个大型项目，每次完整构建需要 5-10 分钟。你不想盯着终端等待，但又需要知道构建是否成功。

### 解决方案

使用 `run_in_background` 参数启动后台任务。

### 操作步骤

```bash
# 在 Claude Code 中说：
"运行 npm build 在后台，我继续写文档"
```

Claude 会这样执行：

```json
{
  "command": "npm run build",
  "run_in_background": true,
  "timeout": 600000
}
```

**立即返回：**

```
Task started: task_abc123
你现在可以继续其他对话...
```

**5 分钟后收到通知：**

```xml
<task-notification task_id="task_abc123">
  构建完成
</task-notification>
```

### 进阶：并行任务

当有多个独立任务时，可以并行启动：

```bash
# 在 Claude Code 中说：
"安装所有微服务的依赖，并行执行"

# Claude 会：
发现 5 个微服务

→ cd service-user && npm install & [task_001]
→ cd service-order && npm install & [task_002]
→ cd service-payment && npm install & [task_003]
→ cd service-notif && npm install & [task_004]
→ cd service-frontend && npm install & [task_005]

已并行启动 5 个安装任务
```

### 任务管理

```bash
# 查看所有任务状态
/tasks

# 输出：
Running Tasks:
- task_001: npm install (running)
- task_002: npm install (completed)

# 获取任务输出
"查看 task_001 的结果"

# 停止任务
"停止 task_003"
```

---

## 场景 2：配置通知通道（Discord/Slack）

### 问题描述

你是一个小团队的 Tech Lead。每次 CI 构建完成后，你希望团队成员都能在 Discord/Slack 中收到通知，而不是只有你自己知道。

### 解决方案

配置 MCP Channel，通过 Hook 自动发送通知。

### Discord 配置

**Step 1：创建 Discord Bot**

1. 访问 Discord Developer Portal
2. 创建新 Bot，获取 Token
3. 将 Bot 加入目标频道，获取 Channel ID

**Step 2：配置 MCP Server**

编辑 `~/.claude/settings.json`：

```json
{
  "mcpServers": {
    "discord": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-discord"],
      "env": {
        "DISCORD_TOKEN": "Bot your-token-here",
        "CHANNEL_ID": "123456789"
      }
    }
  }
}
```

**Step 3：配置自动通知 Hook**

```json
{
  "hooks": {
    "Stop": [{
      "command": "claude mcp discord send_message '会话结束：$SESSION_SUMMARY'",
      "description": "通知会话结束"
    }]
  }
}
```

### Slack 配置

**Step 1：创建 Slack App**

1. 访问 Slack API 页面创建 App
2. 获取 Bot Token（格式：`xoxb-...`）
3. 将 App 加入目标频道，获取 Channel ID

**Step 2：配置 MCP Server**

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-token",
        "CHANNEL_ID": "C12345678"
      }
    }
  }
}
```

### 测试通知

```bash
# 在 Claude Code 中说：
"测试 Discord Channel：发送 'Hello from Claude Code'"

# Claude 会调用 MCP 工具：
mcp__discord__send_message({
  "content": "Hello from Claude Code"
})

# Discord 频道收到消息：
Hello from Claude Code
```

### 消息格式优化

Discord 支持 Markdown 格式：

```markdown
**构建状态**: ✅ 成功
**分支**: main
**提交**: abc123

变更摘要:
- feat: 添加认证模块
- fix: 修复登录 bug
```

Slack 支持 Block Kit 格式：

```json
{
  "text": "构建完成",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*构建状态*: ✅ 成功"
      }
    }
  ]
}
```

---

## 场景 3：监控长时间任务

### 问题描述

你的模型训练需要 2 小时，CI 构建可能中途失败需要自动修复，或者你想每天早上自动检查依赖更新。

### 解决方案

使用 `/loop` 持续监控或 `/schedule` 定时执行。

### `/loop` 持续循环任务

`/loop` 让 Claude Code 在本地长时间运行一个任务，最多支持 **3 天**无人值守。

```bash
# 持续监控构建状态，失败时自动修复
/loop 每 10 分钟检查构建状态，失败时自动修复

# Claude 响应：
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
循环任务已启动
任务：检查构建状态
间隔：10 分钟
最长运行：3 天
状态：运行中
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

→ 每 10 分钟自动执行
→ 检查构建 → 失败则分析修复 → 重新构建
```

**其他 `/loop` 示例：**

```bash
# 持续监控测试
/loop 每 5 分钟运行测试，失败时自动修复

# 持续监控部署
/loop 每分钟检查部署是否完成

# 持续检查错误日志
/loop 每 15 分钟检查错误日志，发现新错误时报告

# 查看循环状态
/loop-status

# 停止循环
/loop-stop
```

### `/schedule` 云端定时任务

`/schedule` 在云端设置定时任务，会在指定时间自动执行。

```bash
# 每天早上 9 点检查依赖更新
/schedule 每天 09:00 检查依赖更新并报告

# 每天凌晨运行安全扫描
/schedule 每天 02:00 运行 npm audit

# 每周一生成周报
/schedule 每周一 09:00 总结上周 git commit 统计

# 工作日检查测试覆盖率
/schedule 工作日 18:00 运行测试并检查覆盖率
```

**Cron 表达式格式：**

```
分钟 小时 日 月 星期

示例：
0 9 * * *      # 每天 09:00
0 2 * * *      # 每天 02:00
0 9 * * 1-5    # 工作日 09:00
0 9 * * 1      # 每周一 09:00
*/5 * * * *    # 每 5 分钟
```

### 结合 Channel 的远程监控

配置 `/loop` + Discord/Slack，实现真正的远程监控：

```bash
# 在 Claude Code 中说：
"设置一个循环任务：每 10 分钟检查训练进度，
 完成时发送 Discord 通知"

# Claude 会：
→ 配置 /loop 循环任务
→ 训练完成时调用 mcp__discord__send_message

# 2 小时后你在手机上收到 Discord 通知：
训练完成！运行时间: 2h 15m 30s
```

---

## 🎯 Try It Now

### 练习 1：后台构建

```bash
# 在 Claude Code 中：
"在后台运行 npm run build，完成后告诉我结果"

# 同时继续工作：
"帮我写一个简单的测试用例"
```

### 练习 2：配置 Discord 通知

```bash
# 1. 创建 Discord Bot（访问 Discord Developer Portal）
# 2. 获取 Token 和 Channel ID
# 3. 配置 ~/.claude/settings.json
# 4. 在 Claude Code 中测试：

"测试 Discord Channel：发送 'Hello from Claude Code'"
```

### 练习 3：循环监控

```bash
# 设置一个监控任务
/loop 每 5 分钟检查是否有新的错误日志

# 查看状态
/loop-status

# 停止循环
/loop-stop
```

### 练习 4：定时任务

```bash
# 创建定时任务
/schedule 每天 09:00 检查 git 状态

# 查看定时任务列表
# 使用 CronList 工具查看已设置的定时任务
```

### 练习 5：并行任务

```bash
# 在 Claude Code 中说：
"假设项目有 3 个子目录，并行检查每个目录的文件数量：
- src/
- tests/
- docs/

完成后汇总结果。"
```

---

## 常见问题

### Q1: 任务卡住不动怎么办？

查看日志文件，分析原因：

```bash
# 查看任务日志
"显示 task_001 的日志"

# 日志位置
~/.claude/tasks/task_001.log

# 如果确实卡住，停止并重试
"停止 task_001，重新运行"
```

### Q2: 启动了太多并行任务？

限制并行数量，分批次执行：

```bash
# 错误：同时启动 20 个任务
# 正确：先启动 5 个，完成后再启动下一批

"先安装前 5 个微服务的依赖，完成后继续下一批"
```

### Q3: Discord/Slack 通知没有收到？

检查配置：

1. 确认 MCP Server 配置正确
2. 确认 Token 和 Channel ID 有效
3. 确认 Bot 已加入目标频道

```bash
# 测试 MCP 连接
"列出可用的 MCP 工具"

# 应看到 mcp__discord__send_message 等工具
```

### Q4: `/schedule` 任务没有执行？

检查 Cron 表达式和任务状态：

```bash
# 查看定时任务列表
# 使用 CronList 工具

# 确认 Cron 表达式正确
0 9 * * *    # 每天 09:00（本地时区）
```

### Q5: 如何查看后台任务的输出？

收到通知后，读取输出：

```bash
# 方法 1：使用 TaskOutput
"获取 task_001 的输出"

# 方法 2：读取输出文件
"读取 /tmp/task_001_output.txt"
```

### Q6: `/loop` 能运行多久？

最多 **3 天**。超过后需要重新启动。

```bash
# 查看剩余时间
/loop-status

# 输出包含：
运行时间: 12 小时
剩余时间: 60 小时
```

---

## 最佳实践速查

### ✅ 推荐做法

| 场景 | 做法 |
|------|------|
| 超过 1 分钟的任务 | 使用后台模式 |
| 团队需要通知 | 配置 Discord/Slack Channel |
| CI 监控与修复 | 使用 `/loop` |
| 定时执行任务 | 使用 `/schedule` |
| 独立任务 | 并行执行提高效率 |

### ❌ 避免做法

| 场景 | 为什么不好 |
|------|------------|
| 后台运行交互命令 | 需要输入的命令会卡住 |
| 启动太多并行任务 | 可能耗尽系统资源 |
| 不检查任务结果 | 后台任务失败时不知道 |
| 手动轮询任务状态 | 应等待自动通知 |

---

## 相关资源

- [MCP 配置](../05-mcp/) - MCP Server 详细配置
- [Hooks 自动化](../06-hooks/) - 自动通知 Hook 设置
- [CLI 命令](../10-cli/) - `/tasks` 命令详解
- [Checkpoints](../08-checkpoints/) - 会话快照与回滚
- [官方 MCP 文档](https://modelcontextprotocol.io/)

---

## 下一章预告

**第 13 章：高级功能详解**

> 我想深度定制 Claude 的行为...

当你发现默认设置不够用时——需要更精细的权限控制、更复杂的 Hook 触发条件、或者调试 MCP 连接问题——高级功能章节将带你深入 Claude Code 的配置内核。

下一章将涵盖：
- Extended Thinking 深度推理
- 权限精细控制
- 复杂 Hook 模式
- MCP 调试技巧
- 配置文件完整解析