---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

> 🔴 **Advanced** | ⏱ 90 minutes
>
> ✅ Verified against Claude Code **v2.1.92** · Last verified: 2026-04-06

**你将掌握：** 精通 Computer Use、Voice Mode、Multi-Agent 编排以及高级工作流模式。

# 高级能力

本模块涵盖 Claude Code 最强大的能力，这些能力将改变你与 AI 助手的协作方式。学习用语音命令控制屏幕、并行编排多个 Agent，以及避免降低效率的常见陷阱。

## 目录

1. [概述](#概述)
2. [Computer Use](#computer-use)
3. [Voice Mode](#voice-mode)
4. [Multi-Agent Collaboration](#multi-agent-collaboration)
5. [高级命令](#高级命令)
6. [反模式](#反模式)
7. [模式与配方](#模式与配方)
8. [动手练习](#动手练习)
9. [最佳实践](#最佳实践)
10. [相关资源](#相关资源)

---

## 概述

高级能力解锁 Claude Code 的全部潜力：

| 能力 | 功能 | 核心优势 |
|------------|-------------|-------------|
| **Computer Use** | 查看并控制你的屏幕 | 无需 API 即可实现 GUI 自动化 |
| **Voice Mode** | 按下即说语音输入 | 自然流畅的对话体验 |
| **Multi-Agent** | 并行运行多个 Agent | 显著加速工作流程 |
| **高级命令** | `/btw`、`/compact`、`/rewind` | 精通上下文管理 |
| **反模式** | 避免常见错误 | 提升产出质量 |

```mermaid
graph TB
    subgraph "交互层"
        V[Voice Mode] --> CU[Computer Use]
        CU --> GUI[GUI Operations]
    end
    
    subgraph "执行层"
        MA[Multi-Agent] --> WT[Worktrees]
        WT --> AG1[Agent 1]
        WT --> AG2[Agent 2]
        WT --> AG3[Agent 3]
    end
    
    subgraph "管理层"
        CM[Commands] --> CC[/compact]
        CM --> RW[/rewind]
        CM --> BT[/btw]
    end
    
    V --> MA
    CU --> MA
    MA --> CM
```

---

## Computer Use

Computer Use 让 Claude Code 能够"看见"你的屏幕并控制鼠标和键盘，就像远程桌面助手一样。

### 核心概念

```
传统 Claude Code:
你: "测试登录表单"
Claude: "我看不到浏览器。请截图..."

Computer Use:
你: "测试登录表单"
Claude: [看见屏幕]
  → 移动光标到用户名输入框
  → 输入测试凭据
  → 点击登录按钮
  → 验证跳转到仪表板
  → 报告测试结果
```

###何时使用 Computer Use

**理想场景：**

| 场景 | 为何使用 Computer Use |
|----------|------------------|
| Web UI 测试 | 无需 API，直接浏览器交互 |
| 传统应用 | 无可编程接口的 GUI 应用 |
| 跨应用工作流 | 跨多个应用自动化 |
| 视觉调试 | 布局、响应式设计验证 |
| 浏览器扩展测试 | 在真实浏览器环境中测试扩展 |

### 基本操作

| 操作 | 说明 |
|-----------|-------------|
| 鼠标移动 | 导航到屏幕坐标 |
| 点击 | 单击、双击、右键点击 |
| 键盘 | 输入文本、执行快捷键 |
| 截图 | 捕获当前屏幕状态 |
| 滚动 | 导航页面内容 |

### 示例：Web 应用测试

```
你: 访问 localhost:3000 并测试注册流程：
1. 创建新用户账户
2. 用这些凭据登录
3. 验证仪表板正确加载

Claude:
[步骤 1] 注册
→ 导航到 /register
→ 填写用户名：test_user_001
→ 填写邮箱：test@example.com
→ 填写密码：Test@12345
→ 点击"Register"
✓ 成功 - 跳转到登录页

[步骤 2] 登录
→ 输入凭据
→ 点击"Login"
✓ 成功 - 跳转到仪表板

[步骤 3] 仪表板验证
→ 检查侧边栏可见
→ 检查图表渲染
✓ 所有组件正确加载

✅ 测试完成 - 所有步骤通过
```

### 示例：响应式布局测试

```
你: 检查仪表板在不同屏幕尺寸下的表现

Claude:
[桌面 1920x1080]
→ 调整浏览器大小
→ 分析布局
✓ 侧边栏正常
⚠ 图表右侧边缘被截断

[平板 768x1024]
→ 调整浏览器大小
✓ 侧边栏折叠为图标
✓ 内容响应式

[手机 375x812]
→ 调整浏览器大小
⚠ 弹窗超出视口
❌ 某些按钮无法点击

建议：
1. 为图表容器添加 overflow-auto
2. 移动端使用全屏弹窗
3. 增加按钮点击区域
```

### 限制与应对措施

| 限制 | 影响 | 应对措施 |
|------------|--------|------------|
| 速度 | 每个操作需要"看-想-做"周期 | 用于耐心测试，而非时间敏感任务 |
| 精度 | 小按钮可能被误识别 | 简化 UI，最大化窗口，提供备用方案 |
| 状态同步 | 页面变化需要重新捕获 | 在下一个操作前等待稳定 |

### Computer Use vs 替代方案

| 方案 | 适用场景 | 优点 | 缺点 |
|----------|----------|------|------|
| **Computer Use** | GUI 测试、无 API 应用 | 零配置，通用 | 较慢，精度较低 |
| **Playwright** | Web 自动化 | 快速，可编程 | 需要配置 |
| **MCP tools** | 有 API 的服务 | 高效，可靠 | 需开发 MCP server |

---

## Voice Mode

Voice Mode 启用按下即说的语音输入，让你可以说话而非打字。

### 核心概念

```
键盘输入：
你（打字）："重构这个组件"
  → 思考措辞
  → 输入字符
  → 等待响应

语音输入：
你（说话）："重构这个组件"
  → 直接说出
  → 即时传输
  → 自然对话流程
```

### 交互演进

```
穿孔卡片 → 键盘 → 鼠标 → 触摸 → 语音

每次演进都降低了门槛：
- 穿孔卡片：仅工程师可用
- 键盘：普通用户可用
- 鼠标：无需记忆命令
- 触摸：儿童也能使用
- 语音：最自然的沟通方式
```

### 激活方式

按住 **空格键** 开始说话，松开发送。

```
流程：
按住空格 → 说话 → 松开 → Claude 处理 → 响应
```

### 支持的语言

Voice Mode 支持约 20 种语言：

| 语言 | 代码 | 支持 |
|----------|------|---------|
| 中文（普通话） | zh-CN | ✅ |
| 中文（粤语） | zh-HK | ✅ |
| 英语 | en-US | ✅ |
| 日语 | ja-JP | ✅ |
| 韩语 | ko-KR | ✅ |
| 法语 | fr-FR | ✅ |
| 德语 | de-DE | ✅ |
| 西班牙语 | es-ES | ✅ |

### 何时使用语音 vs 键盘

| 场景 | 推荐 | 原因 |
|----------|-------------|--------|
| 长描述 | 🎤 语音 | 更快，保持思路流畅 |
| 代码片段、路径 | ⌨️ 键盘 | 精确性重要 |
| 头脑风暴 | 🎤 语音 | 流畅对话 |
| 特定修改 | ⌨️ 键盘 | 避免识别错误 |
| 快速跟进 | 🎤 语音 | 按住空格即可说话 |
| 精确命令 | ⌨️ 键盘 | 需要精确控制 |

### 混合策略

```
黄金法则：语音定方向，键盘写细节

工作流示例：
1. 🎤 "重构认证模块"（意图）
2. ⌨️ 查看 Claude 的计划
3. 🎤 "第 3 步 - 用 OAuth 替代"（反馈）
4. ⌨️ 提供配置值
5. 🎤 "看起来不错，执行"（确认）
```

### Voice + Computer Use 组合

```
你（语音）："打开浏览器，搜索 Claude Code 教程，
找到 GitHub 仓库链接，复制到剪贴板"

Claude [Computer Use]:
→ 打开浏览器
→ 导航到搜索引擎
→ 输入查询
→ 找到仓库链接
→ 复制到剪贴板

Claude: 完成！GitHub 链接已复制到剪贴板。
```

**Voice Mode + Computer Use = 语音控制的屏幕操作**

适用于双手忙于调试、物理任务或考虑人体工学时的场景。

### 限制

| 限制 | 影响 | 策略 |
|------------|--------|----------|
| 环境噪音 | 识别准确度下降 | 在安静环境或使用耳机麦克风 |
| 复杂代码 | 变量名被误识别 | 用键盘输入代码，语音表达意图 |
| 多轮对话 | 口语风格可能产生歧义 | 关键指令用文字确认 |

---

## Multi-Agent Collaboration

Multi-Agent 协作是 Claude Code 最强大的能力，通过并行任务处理大幅加速工作流程。

### 从串行到并行

```
单 Agent（串行）：
你 → Claude → 任务 A → 任务 B → 任务 C
时间：线性增长

Multi-Agent（并行）：
你 → Claude → Agent 1（任务 A）
              → Agent 2（任务 B）
              → Agent 3（任务 C）
时间：并行执行
```

### 基础设施：Git Worktrees

Git Worktrees 从同一仓库创建多个工作目录，每个在不同分支上。

```
传统方式（单目录）：
my-project/ ← 仅 main 分支
→ 切换需要暂存或提交

Worktree 方式：
my-project/           ← main 分支
my-project-feature-a/ ← feature-a 分支
my-project-feature-b/ ← feature-b 分支
→ 同时在不同分支工作
```

**在 Worktree 中启动：**

```bash
# Claude Code 自动管理 worktrees
claude --worktree

# Claude 创建：
# 1. .claude/worktrees/<name> 目录
# 2. 从当前 HEAD 创建新分支
# 3. 切换工作目录
# 4. 完成时提供保留/删除选项
```

**Worktree 实现并行 Agent：**

```
Agent 1 ← worktree-1/ (feature-a 分支)
Agent 2 ← worktree-2/ (feature-b 分支)
Agent 3 ← worktree-3/ (bugfix 分支)

每个 Agent 独立工作
→ 无冲突
→ 完成时合并分支
```

### Tmux 集成

Tmux 在一个窗口中实现多个终端面板。

```
Tmux 布局：
┌─────────────┬─────────────┐
│  Agent 1    │  Agent 2    │
│  (Pane 1)   │  (Pane 2)   │
├─────────────┼─────────────┤
│  Agent 3    │  Agent 4    │
│  (Pane 3)   │  (Pane 4)   │
└─────────────┴─────────────┘

Ctrl+B + 方向键切换面板
```

**工作流程：**

```bash
# 创建会话
tmux new -s work

# 不同面板
Pane 1: cd worktree-1 && claude
Pane 2: cd worktree-2 && claude
Pane 3: cd worktree-3 && claude

# 每个面板分配任务
Pane 1: "重构认证模块"
Pane 2: "添加支付功能"
Pane 3: "修复搜索 bug"
```

### Agent Teams

Agent Teams 让多个 Claude Code 会话能够通信和协调。

```
单个 SubAgent：
Main Agent → SubAgent → 结果
一对一关系

Agent Teams：
Writer ←→ Reviewer ←→ Tester
多对多通信
```

**Writer/Reviewer 模式：**

```
Writer Agent:
→ 编写功能代码
→ 发送给 Reviewer

Reviewer Agent:
→ 审查代码质量
→ 提出改进建议
→ 返回给 Writer

Writer Agent:
→ 应用建议
→ 再次发送给 Reviewer

Reviewer Agent:
→ 批准
→ 发送给 Tester

Tester Agent:
→ 运行测试套件
→ 若失败，通知 Writer
→ 循环直到全部通过
```

### Coordinator Mode：四个阶段

```mermaid
graph LR
    R[Research] --> S[Synthesis]
    S --> I[Implementation]
    I --> V[Verification]
```

| 阶段 | 活动 | 输出 |
|-------|----------|--------|
| **Research** | 搜索代码/文档，理解架构，识别依赖 | 调研报告 |
| **Synthesis** | 设计方案，评估权衡，规划细节 | 实现计划 |
| **Implementation** | 编写/修改代码，处理边界情况 | 代码变更 |
| **Verification** | 运行测试，检查类型，验证正确性 | 验证报告 |

### `/batch` 批量处理

顺序处理多个任务：

```
你: /batch
Claude: 提供任务列表

你:
1. 修复 #101 登录超时
2. 修复 #102 搜索排序 bug
3. 实现 #103 CSV 导出
4. 修复 #104 移动端布局

Claude:
→ 任务 1/4：修复登录超时... ✓
→ 任务 2/4：修复排序 bug... ✓
→ 任务 3/4：实现 CSV... ✓
→ 任务 4/4：修复布局... ✓

✅ 全部完成！
```

**最佳实践：**
- 用于独立任务
- 清晰、自包含的描述
- 每批 5-10 个任务最佳
- 保存输出作为日志

### `/loop` 长时间运行任务

重复运行任务，最长 3 天：

```
你: /loop every 10 minutes check build status,
     auto-fix if failed

Claude:
→ 设置循环任务
→ 每 10 分钟：检查 → 分析 → 修复 → 重新构建

循环任务已激活：
任务：构建监控
间隔：10 分钟
最长时长：3 天
状态：运行中
```

**示例：**

```
/loop every 5 min run tests, auto-fix failures
/loop every hour run performance benchmarks
/loop every min check deployment completion
```

### `/schedule` 云端定时任务

任务在 Anthropic 基础设施上运行，无需本地 Claude Code：

```
你: /schedule daily at 9am check dependency updates

Claude:
→ 创建定时任务
→ 每天 09:00 运行
→ 检查 npm audit
→ 若有更新则报告

任务：依赖检查
频率：每天 09:00
状态：已启用
```

### `/loop` vs `/schedule`

| 特性 | `/loop`（本地） | `/schedule`（云端） |
|---------|----------------|---------------------|
| 位置 | 你的机器 | 云端 |
| 最长时长 | 3 天 | 无限制 |
| 需要本地 | ✅ 是 | ❌ 否 |
| 适用场景 | 开发监控 | 生产环境定时任务 |
| 资源 | 本地 | 云端 |

### 远程控制

从其他设备控制 Claude Code：

```
场景：
工作电脑：Claude Code 运行中
家用笔记本：远程连接

工作电脑：
→ Claude Code 活跃
→ 启动远程控制

家用笔记本：
→ 连接到工作会话
→ 查看进度
→ 发送新命令
→ 或仅观察
```

### 思维转变：异步工作

```
传统方式（同步）：
你做 A → 你做 B → 你做 C
一步步执行

Agent 协作（异步）：
你启动 Agent A（任务 A）
你启动 Agent B（任务 B）
你启动 Agent C（任务 C）
你做其他工作（甚至离开）
Agent 完成时通知你
```

**新工作流：**

```
早晨例行：
1. 给多个 Agent 分配任务
2. 让它们并行工作
3. 你专注于架构、需求
4. 下午：审查结果
5. 合并、审查、部署

你不是"使用工具" - 你是"管理团队"
```

| 旧思维 | 新思维 |
|-------------|-------------|
| 亲自写每一行代码 | 设计系统，Agent 实现 |
| 一次一个任务 | 尽可能并行化 |
| 盯着屏幕等待 | 启动任务，做其他工作 |
| Claude 是助手 | Claude 是开发团队 |
| 立即修复失败 | Agent 自动恢复并重试 |

---

## 高级命令

用这些命令精通上下文管理。

### `/btw` 旁路对话

提出无关问题而不污染主要上下文：

```
主要对话：
你: "重构认证模块"
Claude: [工作中...]

你: /btw JWT 和 Session 有什么区别？
Claude: "JWT 是无状态的..." [简短回答，返回主要任务]

→ 主上下文不受影响
→ 认证重构不中断
```

**何时使用 `/btw`：**

| 场景 | 使用 `/btw`？ | 原因 |
|----------|-------------|--------|
| 无关问题 | ✅ | 不污染主上下文 |
| 快速概念查询 | ✅ | 轻量级交互 |
| 任务相关问题 | ❌ | 直接问，需要上下文 |
| 详细讨论 | ❌ | `/btw` 是简短的 |

### `/compact` 上下文压缩

当接近限制时总结并压缩上下文：

```
你: /compact

Claude:
→ 分析对话
→ 提取关键信息
→ 压缩上下文
→ 释放空间

上下文已压缩。
保留内容：
- 任务：重构认证模块
- 已完成：JWT 实现
- 待处理：Session 管理、token 刷新
```

**何时 `/compact`：**

```
✅ 使用时机：
- 对话很长，接近限制
- 主要任务完成，开始新任务
- Claude "忘记"早期内容

❌ 不要使用：
- 对话还很短
- 任务需要完整上下文
```

### `/compact` vs `/clear`

| 命令 | 效果 | 保留内容 |
|---------|--------|----------|
| `/compact` | 压缩上下文 | 摘要和关键决策 |
| `/clear` | 清除上下文 | 无，全新开始 |

### `/rewind` 回滚

返回之前的对话状态，撤销后续操作：

```
对话：
[状态 1] 你: "创建用户组件"
[状态 2] Claude: [创建组件]
[状态 3] 你: "添加表单验证"
[状态 4] Claude: [添加验证]
[状态 5] 你: "其实改成列表" ← 方向错误
[状态 6] Claude: [修改为列表] ← 已犯错

你: /rewind 5
→ 返回状态 5
→ 状态 6 的变更被撤销
→ 你可以重新陈述需求
```

详见 [08-checkpoints](../08-checkpoints/) 的完整回滚文档。

### Slash Commands：项目级定制

将自定义命令存储在 `.claude/commands/`：

```
项目结构：
.claude/
└── commands/
    ├── review.md        # /project:review
    ├── deploy.md        # /project:deploy
    └── test-fix.md      # /project:test-fix
```

**示例命令：**

```markdown
<!-- .claude/commands/review.md -->
审查所有分支变更，重点关注：
1. 安全漏洞
2. 性能问题
3. 代码风格一致性
输出结构化审查报告。
```

**使用方式：**

```
你: /project:review

Claude:
→ 读取 review.md 指令
→ 执行代码审查
→ 输出报告
```

### Slash Commands vs Skills

| 特性 | Slash Commands | Skills |
|---------|---------------|--------|
| 位置 | `.claude/commands/` | `.claude/skills/` |
| 复杂度 | 简单（单文件） | 复杂（多文件） |
| 参数 | 无结构化参数 | 支持参数 |
| 逻辑 | 文本指令 | 条件逻辑 |
| 适用场景 | 快速自定义命令 | 复杂工作流 |

**选择指南：**

```
使用 Slash Commands：
→ 简单、一次性指令
→ 无需参数
→ 快速创建和使用

使用 Skills：
→ 多步骤工作流
→ 需要参数化
→ 条件逻辑、错误处理
→ 复用和共享
```

### 内联 Bash 预计算

在命令中嵌入动态数据：

```markdown
<!-- .claude/commands/pr-status.md -->
当前 PR 状态：
```bash
gh pr view --json title,state,additions,deletions
```

分析 PR 进度并建议下一步。
```

```
你: /project:pr-status

Claude:
→ 执行 Bash 获取 PR 数据
→ 分析结果
→ 输出建议

PR #123 状态：
- 标题："添加用户认证"
- 状态：Open
- +256/-42 行
- 审查：Approved

建议：准备合并...
```

### 非交互模式 (`-p`)

无需交互输入运行 Claude Code：

```bash
# 管道输入
echo "解释这段代码" | claude -p

# 从文件
claude -p "审查文件" < src/utils.ts

# 输出到文件
claude -p "生成 README" > README.md

# 管道处理
cat src/**/*.ts | claude -p "查找所有 TODO"
```

### `--allowedTools` 限制

限制可用工具以确保安全：

```bash
# 仅读取
claude -p "分析结构" --allowedTools "Read,Glob,Grep"

# 特定命令
claude -p "运行测试" --allowedTools "Bash(npm test)"

# CI/CD 安全使用
claude -p "检查标准" \
  --allowedTools "Read,Glob,Grep,Bash(npm run lint)"
```

**CI/CD 集成：**

```yaml
# GitHub Actions
- name: AI Review
  run: |
    claude -p "审查 PR 变更" \
      --allowedTools "Read,Glob,Grep" \
      < <(gh pr diff ${{ github.event.number }})
```

---

## 反模式

避免这些常见错误以最大化 Claude Code 效果。

### 反模式 1：一个会话做所有事

```
❌ 错误方式：
同一个会话：
"修复 bug" → "写测试" → "部署" →
"设计数据库" → "写文档" → "..."

问题：
- 上下文被无关信息污染
- Claude 混淆不同任务上下文
- 后续任务质量下降

✅ 正确方式：
一个会话一个任务
修复 bug → 新会话 → 写测试 → 新会话 → 部署
```

### 反模式 2：反复修正越改越偏

```
❌ 错误方式：
你: "把按钮改成红色"
Claude: [修改]
你: "不对，要深一点"
Claude: [修改]
你: "还是不对，深红色"
Claude: [修改]
你: "算了，改成蓝色吧"
→ 4 次修改，每次修改前一次
→ 代码可能面目全非

✅ 正确方式：
你: "把按钮改成 #1a56db 蓝色"
→ 一次精确需求

或者：
你: /rewind 3 ← 回到初始状态
你: "使用 brand-primary CSS 变量"
```

### 反模式 3：不验证就接受

```
❌ 错误方式：
Claude: "修改了 auth.js，添加了密码验证"
你: [瞥了一眼，看起来是对的]
"OK，看起来没问题"
→ 边界情况未处理
→ 安全漏洞被忽略

✅ 正确方式：
1. 请求解释
   "解释你改了什么以及为什么"
2. 主动测试
   "运行测试检查失败"
3. 检查边界情况
   "空输入、超长输入、特殊字符？"
```

### 反模式 4：过度微操

```
❌ 错误方式：
你: "创建 UserController 类"
Claude: [创建]
你: "添加 getUser 方法"
Claude: [添加]
你: "添加 id 参数"
Claude: [修改]
你: "返回类型 UserDTO"
Claude: [修改]
你: "添加 @GetMapping 注解"
Claude: [修改]

→ 像操纵傀儡一样操纵 Claude
→ 浪费交互轮次
→ Claude 的能力未被利用

✅ 正确方式：
你: "创建 UserController，包含 CRUD 端点：
GET /api/users/:id → UserDTO
POST /api/users → create
PUT /api/users/:id → update
DELETE /api/users/:id → delete
Spring Boot 风格"

→ 一次完整需求
→ Claude 自主执行
→ 你只需审查最终结果
```

### 反模式 5：模糊需求

```
❌ 错误方式：
你: "优化性能"
你: "改一下样式"
你: "让它更好"

→ Claude 猜测意图
→ 结果可能不符合期望
→ 反复修正浪费时间

✅ 正确方式：
你: "优化用户列表加载性能，
目标从 3s 降低到 <1s。
主要瓶颈：过多 API 请求。
考虑请求合并或缓存。"

→ 清晰的问题描述
→ 具体的目标
→ 建议的方向
```

### 反模式 6：没有 CLAUDE.md

```
❌ 没有 CLAUDE.md：
会话 1："这是一个 React 项目..."
会话 2："这是一个 React 项目..."
会话 3："这是一个 React 项目..."
→ 每次会话重复解释
→ 项目理解不一致
→ 团队成员各自工作

✅ 有 CLAUDE.md：
会话 1：Claude 读取 CLAUDE.md → 立即理解
会话 2：Claude 读取 CLAUDE.md → 立即理解
会话 3：Claude 读取 CLAUDE.md → 立即理解
→ 零重复
→ 一致理解
→ 统一团队标准
```

### 反模式速查表

| 反模式 | 核心问题 | 正确方式 |
|--------------|-----------|-----------------|
| 一个会话做所有事 | 上下文污染 | 一个会话一个任务 |
| 反复修正 | 需求不精确 | 一次精确需求 |
| 不验证就接受 | 无验证 | 主动测试和审查 |
| 过度微操 | AI 自主性未用 | 给方向，不给步骤 |
| 模糊需求 | Claude 猜测 | 清晰问题，具体目标 |
| 没有 CLAUDE.md | 重复劳动 | 编写项目记忆 |

---

## 模式与配方

### 模式：Voice + Computer Use 无手测试

```
场景：在调试断点时测试

你（语音）："测试表单提交流程"
Claude [Computer Use]:
→ 填写表单字段
→ 点击提交
→ 检查验证错误
→ 报告结果

→ 双手留在调试工具上
→ 语音指挥屏幕操作
```

### 模式：并行功能开发

```bash
# 设置 worktrees
claude --worktree name=feature-a
claude --worktree name=feature-b
claude --worktree name=feature-c

# Tmux 布局
tmux new -s dev
# 分成 3 个面板

# 每个面板运行 Claude
Pane 1: cd .claude/worktrees/feature-a && claude
Pane 2: cd .claude/worktrees/feature-b && claude
Pane 3: cd .claude/worktrees/feature-c && claude

# 分配任务
Pane 1: "实现推荐算法"
Pane 2: "创建 API 端点"
Pane 3: "构建前端组件"

# 后续：审查并合并
```

### 模式：持续集成监控

```yaml
# .claude/commands/ci-monitor.md
```bash
gh run list --limit 5 --json status,conclusion,name
```
分析 CI 状态，若检测失败则建议行动。
```

```bash
# 定期运行
/loop every 5 min /project:ci-monitor
```

### 模式：Writer-Reviewer-Tester 循环

```
Writer Agent: 实现功能
  ↓
Reviewer Agent: 检查代码质量
  ↓ (若有问题)
Writer Agent: 应用修复
  ↓ (循环直到批准)
Tester Agent: 运行测试套件
  ↓ (若失败)
Writer Agent: 修复测试
  ↓ (循环直到通过)
合并
```

### 配方：大型功能开发

```
目标：为电商添加商品推荐

步骤 1：创建 worktrees
claude --worktree name=recommendation-engine
claude --worktree name=api-endpoints
claude --worktree name=frontend-ui

步骤 2：并行 Agent
Agent 1: "实现协同过滤算法"
Agent 2: "创建 /api/recommendations 端点"
Agent 3: "构建推荐卡片组件"

步骤 3：持续测试
/loop every 15 min run all tests

步骤 4：等待完成
[做其他工作...]

步骤 5：审查并合并
→ 检查每个 Agent 输出
→ 运行集成测试
→ 合并分支
→ 部署
```

---

## 动手练习

### 练习 1：Computer Use 测试

无需手动点击测试 Web 表单：

```
1. 启动开发服务器：npm run dev
2. 在 Claude Code 中："用 Computer Use 测试
   localhost:3000/register 的注册表单"
3. 观察 Claude 导航表单
4. 尝试响应式测试："检查表单
   在 768px 和 375px 宽度下的表现"
```

### 练习 2：Voice Mode 对话

练习语音 + 键盘混合：

```
1. 启用 Voice Mode：/voice
2. 语音："解释 REST 和 GraphQL 的区别"
3. 键盘：查看 Claude 的回答
4. 语音："给我一个 GraphQL 查询示例"
5. 键盘：将查询复制到你的项目
```

### 练习 3：Multi-Agent Worktree

运行两个并行任务：

```bash
# 终端 1
claude --worktree name=refactor-auth
# 在 worktree 会话中："重构认证模块"

# 终端 2
claude --worktree name=add-payment
# 在 worktree 会话中："添加支付功能"

# 两者并行工作
# 定期检查进度
# 完成时合并
```

### 练习 4：高级命令

练习上下文管理：

```
1. 开始一个长调试会话
2. 当上下文填满时：/compact focus: debugging
3. 提出无关问题：/btw 什么是 RxJS？
4. 发现方向错误：/rewind 3
5. 为新任务重新开始：/clear
```

### 练习 5：避免反模式

识别并修复反模式：

```
回顾你最近的 Claude Code 会话：
1. 是否混合无关任务？ → 分开会话
2. 是否反复修正？ → 精确指定
3. 是否不验证就接受？ → 主动测试
4. 是否过度微操？ → 给完整需求
5. 是否请求模糊？ → 要具体
6. 是否缺少 CLAUDE.md？ → 创建项目记忆
```

---

## 最佳实践

### 高效对话黄金法则

```
1. 一个会话，一个目标
   → 专注 = 质量

2. 一次清晰陈述需求
   → 精确 = 减少修改

3. 给方向，不给步骤
   → 信任 = 效率

4. 验证每个结果
   → 审查 = 安全

5. 使用旁路和压缩
   → 工具 = 流畅
```

### Computer Use 最佳实践

```
✅ 应做：
- 把 Claude 当作耐心但较慢的测试者
- 给出清晰、具体的操作指令
- 将复杂任务拆分为步骤
- 提供备用选项（键盘快捷键）
- 用于探索性 UI 测试

❌ 不应做：
- 期望像素级精确操作
- 用于生产关键操作
- 应用于时间敏感的自动化
- 导航深层嵌套菜单
```

### Voice Mode 最佳实践

```
✅ 应做：
- 描述意图，而非细节
- 使用短语
- 结合语音和键盘
- 确认重要操作

❌ 不应做：
- 在公共场合讨论敏感信息
- 语音输入复杂代码
- 说得太快
```

### Multi-Agent 最佳实践

```
✅ 应做：
- 每个 Agent 分配独立任务
- 使用 worktrees 进行隔离
- 设置合理超时
- 定期检查进度
- 批量相似任务

❌ 不应做：
- 多个 Agent 修改同一文件
- 单个 Agent 任务过于复杂
- 忽略 Agent 输出
- 创建过多并行 Agent（5-10 个最佳）
```

---

## 相关资源

- [08-checkpoints](../08-checkpoints/) - 会话管理和回滚
- [01-slash-commands](../01-slash-commands/) - 自定义命令创建
- [02-memory](../02-memory/) - CLAUDE.md 项目记忆
- [04-subagents](../04-subagents/) - 任务委托模式
- [09-advanced-features](../09-advanced-features/) - 扩展思考、权限
- [Computer Use Documentation](https://code.claude.com/docs/en/computer-use)
- [Voice Mode Documentation](https://code.claude.com/docs/en/voice-mode)
- [Multi-Agent Documentation](https://code.claude.com/docs/en/multi-agent)
- [Git Worktree Guide](https://git-scm.com/docs/git-worktree)