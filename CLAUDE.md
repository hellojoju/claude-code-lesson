# CLAUDE.md

> Claude Code 项目配置 — claude-howto 教程知识库

## 项目简介

claude-howto 是 Claude Code 的交互式教程知识库，为人类用户提供场景化学习体验，为 AI 智能体提供结构化索引。

**目标：** 成为 Claude Code 学习资源的权威来源。

## 模块结构

| 模块 | 内容 | 难度 | 时间 |
|------|------|------|------|
| 01-slash-commands | 用户快捷命令 | Beginner | 30 min |
| 02-memory | CLAUDE.md 配置系统 | Beginner | 45 min |
| 03-skills | 可复用任务模板 | Beginner | 40 min |
| 04-subagents | 专业智能体 | Intermediate | 60 min |
| 05-mcp | 模型上下文协议 | Intermediate | 50 min |
| 06-hooks | 事件驱动自动化 | Intermediate | 70 min |
| 07-plugins | 扩展包系统 | Intermediate | 90 min |
| 08-checkpoints | 会话快照与回滚 | Beginner | 25 min |
| 09-advanced-features | 高级功能详解 | Advanced | 120 min |
| 10-cli | 命令行界面 | Beginner | 35 min |

## 贡献约定

### 文档风格

- 使用 Markdown 格式
- 使用 Mermaid 图表代替 PNG 截图
- 代码块标注语言类型 (` ```bash `, ` ```python `)
- 每个模块 README 包含：
  - 难度徽章 (`> 🟢 **Beginner** | ⏱ 30 minutes`)
  - 版本徽章 (`> ✅ Verified against Claude Code **vX.X**`)
  - 场景化 Intro
  - Try It Now 区块
  - Patterns & Recipes 区

### 提交规范

```
<type>(<scope>): <description>

Types: feat, fix, refactor, docs, test, chore, perf, ci
```

示例：
- `feat(checkpoints): add workflow templates and decision tree`
- `fix(hooks): correct timeout handling in security-scan.sh`
- `docs(readme): update installation instructions`

### 分支策略

- `main` — 稳定版本
- Feature branches from `main`
- PR required for merge

## 维护工作流

### 周度检查

每周一 09:00 UTC，staleness-check workflow 自动运行：
- 检查每个模块的 `last_verified` 日期
- 超过 30 天未验证则创建 GitHub Issue

### 版本验证流程

1. Claude Code 新版本发布后运行验证
2. 更新模块 README 的版本徽章
3. 更新 frontmatter 中的 `cc_version_verified` 和 `last_verified`
4. 运行 `scripts/verify-m1.sh` 确保所有检查通过

### 文档更新

```bash
# 运行 agent index 生成器
python3 scripts/build-agent-index.py

# 验证所有模块
./scripts/verify-m1.sh
```

## 智能体索引

本项目提供 `agent-manifest.json` 供 AI 智能体查询：

```bash
# 生成智能体索引
python3 scripts/build-agent-index.py

# 输出文件
# - agent-manifest.json (结构化数据)
# - AGENT-INDEX.md (人类可读摘要)
```

## 快速开始脚本

新用户可运行一键安装：

```bash
./scripts/quickstart.sh
```

此脚本会：
- 检测 `~/.claude/` 目录
- 复制示例 slash command、CLAUDE.md 模板、skill 模板
- 打印下一步指引

## 相关文件

| 文件 | 用途 |
|------|------|
| `ROADMAP-20260401.md` | 项目路线图 |
| `TASKS-20260401.md` | 任务清单 |
| `STYLE_GUIDE.md` | 文档风格指南 |
| `LEARNING-ROADMAP.md` | 学习路径 |
| `QUICKSTART.md` | 15 分钟快速开始 |
| `WHATS-NEW.md` | 版本变更追踪 |

## 联系与支持

- **Issues:** `.github/ISSUE_TEMPLATE/` 提交问题
- **Contributing:** `CONTRIBUTING.md` 贡献指南
- **Security:** `SECURITY.md` 安全报告流程

## 开发环境设置

### 前置要求

- Node.js 18+ (用于运行部分脚本)
- Python 3.11+ (用于 build-agent-index.py)
- Git

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/anthropics/claude-howto.git
cd claude-howto

# 安装依赖（如有）
npm install

# 运行验证脚本
./scripts/verify-m1.sh

# 生成智能体索引
python3 scripts/build-agent-index.py
```

### 目录结构

```
claude-howto/
├── 01-slash-commands/    # Slash 命令教程
├── 02-memory/            # Memory 系统教程
├── 03-skills/            # Skills 教程和示例
├── 04-subagents/         # Subagents 教程
├── 05-mcp/               # MCP 配置示例
├── 06-hooks/             # Hooks 教程和脚本
├── 07-plugins/           # Plugins 教程
├── 08-checkpoints/       # Checkpoints 教程
├── 09-advanced-features/ # 高级功能教程
├── 10-cli/               # CLI 使用教程
├── scripts/              # 工具脚本
│   ├── quickstart.sh
│   ├── verify-m1.sh
│   ├── build-agent-index.py
│   └── check_staleness.py
├── docs/                 # 项目文档
│   ├── ROADMAP-20260401.md
│   └── TASKS-20260401.md
├── .github/              # GitHub 配置
│   └── workflows/
│       └── staleness-check.yml
├── CLAUDE.md             # 本文件
├── QUICKSTART.md         # 快速开始指南
├── WHATS-NEW.md          # 版本变更日志
├── agent-manifest.json   # 智能体索引 (生成)
└── AGENT-INDEX.md        # 智能体索引摘要 (生成)
```

## 常见任务

### 添加新模块

1. 创建 `XX-module-name/` 目录
2. 创建 `README.md`，包含 frontmatter、徽章、内容
3. 更新 `scripts/build-agent-index.py` 中的 `MODULES` 列表
4. 运行 `python3 scripts/build-agent-index.py`

### 更新版本验证

1. 检查 Claude Code 新版本
2. 更新每个模块 README 的版本徽章
3. 更新 frontmatter 中的 `cc_version_verified` 和 `last_verified`
4. 提交变更

### 运行测试

```bash
# 验证 M1 里程碑
./scripts/verify-m1.sh

# 检查 Python 脚本语法
python3 -m py_compile scripts/build-agent-index.py
python3 -m py_compile scripts/check_staleness.py
```