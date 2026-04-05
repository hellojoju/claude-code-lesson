---
name: m1-execution-framework
description: M1 milestone execution framework with parallel agent orchestration
type: project
created: 2026-04-05
---

# M1 Milestone Execution Design

> 执行框架：将 ROADMAP Phase 1 (T-001-T-020) 拆解为可并行任务，配合多智能体协同完成

## 目标

本周内完成 M1 Milestone（Infrastructure Live + 2 weakest modules upgraded）

## 范围

ROADMAP 定义的任务 T-001 至 T-020，共 20 个任务：

- T-001: scripts/quickstart.sh
- T-002: QUICKSTART.md
- T-003: 难度徽章（10 模块）
- T-004: WHATS-NEW.md
- T-005: 版本徽章（10 模块）
- T-006: staleness-check.yml
- T-007: CLAUDE.md
- T-008: build-agent-index.py
- T-009-T-015: 08-checkpoints 升级
- T-016-T-020: 06-hooks 升级

## 依赖分析

T-001 依赖 T-007（需要读取 CLAUDE.md 内容来 copy）
其他任务无相互依赖，可立即并行

## 执行图

```
┌────────────────────────────────────────────────────────────────┐
│              立即并行池（9 个智能体）                             │
│                                                                 │
│  [ag-1] T-002 QUICKSTART.md                                     │
│  [ag-2] T-003 难度徽章                                          │
│  [ag-3] T-004 WHATS-NEW.md                                      │
│  [ag-4] T-005 版本徽章                                          │
│  [ag-5] T-006 staleness.yml                                     │
│  [ag-6] T-007 CLAUDE.md                                         │
│  [ag-7] T-008 build-agent-index.py                              │
│  [ag-8] T-009-T-015 checkpoints 升级                            │
│  [ag-9] T-016-T-020 hooks 升级                                  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
                          ↓ T-007 完成后
              ┌───────────────────────────────┐
              │ [ag-10] T-001 quickstart.sh   │
              └───────────────────────────────┘
                          ↓ 全部完成后
                    M1 验收测试
```

## 智能体配置

| ID | Agent Type | 任务 | 输出文件 |
|----|------------|------|---------|
| ag-1 | doc-updater | T-002 | QUICKSTART.md |
| ag-2 | general-purpose | T-003 | 10 个 README 修改 |
| ag-3 | doc-updater | T-004 | WHATS-NEW.md |
| ag-4 | general-purpose | T-005 | 10 个 README + frontmatter |
| ag-5 | general-purpose | T-006 | .github/workflows/staleness-check.yml |
| ag-6 | doc-updater | T-007 | CLAUDE.md |
| ag-7 | general-purpose | T-008 | scripts/build-agent-index.py |
| ag-8 | general-purpose | T-009-T-015 | 08-checkpoints/README.md |
| ag-9 | general-purpose | T-016-T-020 | 06-hooks/README.md + 5 scripts |
| ag-10 | general-purpose | T-001 | scripts/quickstart.sh |

## 验收标准

### T-001 quickstart.sh
- [ ] 文件存在于 scripts/quickstart.sh
- [ ] 可执行 (chmod +x)
- [ ] 行数 80-150
- [ ] Idempotent 逻辑（不覆盖已有文件）

### T-002 QUICKSTART.md
- [ ] 文件存在于根目录
- [ ] 行数 100-200
- [ ] 包含 4-6 个终端步骤代码块
- [ ] 有 Next Steps 链接

### T-003 难度徽章
- [ ] 10 个模块 README 都有徽章
- [ ] 徽章格式: `> 🟢 **Beginner** | ⏱ 30 minutes`
- [ ] 有 "What you'll build" 描述

### T-004 WHATS-NEW.md
- [ ] 文件存在于根目录
- [ ] 包含至少一个版本条目
- [ ] 格式: `## CC vX.X — DATE`

### T-005 版本徽章
- [ ] 10 个模块 README 有版本徽章
- [ ] 徽章格式: `> ✅ Verified against Claude Code **vX.X**`
- [ ] 有 frontmatter (cc_version_verified, last_verified)

### T-006 staleness-check.yml
- [ ] 文件存在于 .github/workflows/
- [ ] schedule cron: 每周一 09:00 UTC
- [ ] 包含检查逻辑

### T-007 CLAUDE.md
- [ ] 文件存在于根目录
- [ ] 行数 150-300
- [ ] 包含 Module Structure 章节

### T-008 build-agent-index.py
- [ ] 文件存在于 scripts/
- [ ] Python syntax 有效
- [ ] 可执行并生成 agent-manifest.json

### T-009-T-015 checkpoints 升级
- [ ] 08-checkpoints/README.md 行数 ≥ 800
- [ ] 包含 Mermaid 决策树
- [ ] 包含 3 个 workflow templates
- [ ] 包含 2+ Try It Now 区块
- [ ] 包含 Patterns 区

### T-016-T-020 hooks 升级
- [ ] 06-hooks/README.md 包含 Mermaid 决策树
- [ ] 5 个脚本文件各 ≥ 70 行
- [ ] README 包含 2+ Try It Now 区块

## 验收测试脚本

scripts/verify-m1.sh 统一验收脚本，检查所有任务完成情况。

## Git 提交策略

- C1: feat(infra): add quickstart, CLAUDE.md, agent index generator
- C2: feat(badges): add difficulty and version badges to all modules
- C3: feat(checkpoints): expand module with decision tree, workflows, patterns
- C4: feat(hooks): add 5 complete hook scripts, decision tree, patterns
- C5: feat(ci): add M1 verification script and milestone report

## 错误处理

- 智能体超时：重新启动，增加 timeout
- 验收失败：查看产出，手动修复或重新调度
- 最大重试次数：2 次

## 成功标准

所有 10 个验收项 PASS → M1 Milestone COMPLETE