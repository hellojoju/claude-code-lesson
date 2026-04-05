# 计划 3：高级内容 — 企业场景

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development 或 superpowers:executing-plans 逐任务实现此计划。

**目标：** 覆盖企业场景和团队协作，提供可落地的部署指南和最佳实践

**架构：** 新增企业专题模块，独立于核心 10 模块，面向团队负责人和 DevOps 工程师

**技术栈：** Docker, Kubernetes, GitHub Actions, GitLab CI, 安全扫描工具

---

## 文件结构

```
content/
├── enterprise/               # 新增：企业专题
│   ├── README.md            # 企业应用概览
│   ├── deployment/          # 部署指南
│   │   ├── on-premise.md    # 本地部署
│   │   ├── cloud.md         # 云部署
│   │   └── kubernetes.md    # K8s 部署
│   ├── team/                # 团队协作
│   │   ├── conventions.md   # 团队约定
│   │   ├── review-flow.md   # 代码审查流程
│   │   └── knowledge-base.md # 知识库管理
│   ├── cicd/                # CI/CD 集成
│   │   ├── github-actions.md
│   │   ├── gitlab-ci.md
│   │   └── jenkins.md
│   ├── security/            # 安全合规
│   │   ├── secrets.md       # 密钥管理
│   │   ├── audit.md         # 审计日志
│   │   └── compliance.md    # 合规要求
│   └── templates/           # 配置模板
│       ├── .claude.json     # 企业配置
│       ├── hooks.json       # 企业 Hooks
│       └── mcp-servers.json # MCP 服务器配置
```

---

## 任务清单

### 阶段 1：部署指南

#### 任务 1.1：企业部署概览

**文件：**
- 创建：`content/enterprise/README.md`

- [ ] **步骤 1：创建企业应用总览**
```markdown
# 企业应用指南

## 适用场景
- 团队规模 > 5 人
- 需要统一的开发规范
- 有安全合规要求
- 需要审计追踪

## 部署选项对比
| 选项 | 适用规模 | 复杂度 | 成本 |
|------|---------|--------|------|
| SaaS | 小型团队 | 低 | 按用户计费 |
| 混合 | 中型团队 | 中 | 中等 |
| 私有化 | 大型企业 | 高 | 高 |

## 快速决策
[Mermaid 决策树]
```

- [ ] **步骤 2：Commit**

---

#### 任务 1.2：CI/CD 集成模板

**文件：**
- 创建：`content/enterprise/cicd/github-actions.md`
- 创建：`content/enterprise/templates/cicd-workflow.yml`

- [ ] **步骤 1：创建 GitHub Actions 集成指南**
```yaml
# .github/workflows/claude-code-review.yml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Claude Code
        run: npm install -g @anthropic-ai/claude-code
      
      - name: Run Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Review the changes in this PR for:
          1. Security vulnerabilities
          2. Performance issues
          3. Code style consistency
          
          Output findings as GitHub comments." \
            --diff ${{ github.event.pull_request.diff_url }}
```

- [ ] **步骤 2：创建 GitLab CI 集成指南**

- [ ] **步骤 3：Commit**

---

### 阶段 2：团队协作

#### 任务 2.1：团队约定模板

**文件：**
- 创建：`content/enterprise/team/conventions.md`
- 创建：`content/enterprise/templates/team-CLAUDE.md`

- [ ] **步骤 1：创建团队约定指南**
```markdown
# 团队开发约定

## CLAUDE.md 模板
[团队级 CLAUDE.md 配置]

## 代码风格约定
- 通过 Skill 定义团队风格

## 审查流程
- 子智能体配置

## 知识共享
- Memory 继承策略
```

- [ ] **步骤 2：创建团队 CLAUDE.md 模板**
```markdown
# 团队项目配置

## 代码规范
- ESLint 配置路径
- Prettier 配置
- 测试覆盖率要求: 80%

## 审查要求
- 所有 PR 需经过 code-reviewer 子智能体
- 安全相关变更需 security-reviewer

## 禁止操作
- 不要直接修改 .env 文件
- 不要 force push 到 main
```

- [ ] **步骤 3：Commit**

---

#### 任务 2.2：多项目管理

**文件：**
- 创建：`content/enterprise/team/multi-project.md`

- [ ] **步骤 1：创建多项目管理指南**
  - 项目间 Memory 共享
  - 统一 Hooks 配置
  - 项目切换最佳实践

- [ ] **步骤 2：Commit**

---

### 阶段 3：安全合规

#### 任务 3.1：密钥管理

**文件：**
- 创建：`content/enterprise/security/secrets.md`

- [ ] **步骤 1：创建密钥管理指南**
```markdown
# 密钥管理最佳实践

## 禁止做法
❌ 硬编码 API Key
❌ 提交 .env 到 Git
❌ 在日志中打印密钥

## 推荐做法
✅ 使用环境变量
✅ 使用密钥管理服务
✅ 定期轮换密钥

## Claude Code 集成
[配置示例]

## Hooks 密钥检测
[pre-commit hook 示例]
```

- [ ] **步骤 2：Commit**

---

#### 任务 3.2：审计日志

**文件：**
- 创建：`content/enterprise/security/audit.md`

- [ ] **步骤 1：创建审计指南**
  - 启用审计日志
  - 日志格式
  - 合规报告生成

- [ ] **步骤 2：Commit**

---

### 阶段 4：实战案例

#### 任务 4.1：完整企业部署案例

**文件：**
- 创建：`content/enterprise/cases/full-deployment.md`

- [ ] **步骤 1：创建完整案例**
```markdown
# 案例：100 人团队的 Claude Code 部署

## 背景
某互联网公司，100 人研发团队，需要统一 AI 辅助开发工具。

## 需求
- 统一代码风格
- 安全合规
- 审计追踪
- 成本控制

## 解决方案

### 1. 基础设施
[Docker Compose 配置]

### 2. 团队配置
[CLAUDE.md 模板]

### 3. CI/CD 集成
[完整 Pipeline]

### 4. 监控和成本
[监控方案]

## 效果
- 代码审查效率提升 40%
- 安全问题减少 60%
```

- [ ] **步骤 2：Commit**

---

## 关键里程碑

| 里程碑 | 完成标志 | 预计完成 |
|--------|----------|----------|
| M1: 部署指南完成 | 3 种部署方案 | Day 2 |
| M2: CI/CD 模板完成 | GitHub/GitLab/Jenkins | Day 3 |
| M3: 团队协作完成 | 约定模板、多项目管理 | Day 4 |
| M4: 安全合规完成 | 密钥管理、审计 | Day 5 |
| M5: 实战案例完成 | 完整企业部署案例 | Day 6 |

---

## 验收标准

- [ ] 企业目录结构完整
- [ ] 3 种 CI/CD 集成模板可用
- [ ] 团队约定模板可落地
- [ ] 安全指南覆盖常见场景
- [ ] 实战案例真实可信