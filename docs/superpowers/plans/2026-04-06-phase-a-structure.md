# 教程重构 - 阶段 A：目录结构重组

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 完成目录重命名、合并、新增空目录，为新内容编写做准备

**架构：** 保持原有文件内容不变，只调整目录结构

**技术栈：** Git mv 命令、目录操作

---

## 文件结构

**将要创建的目录：**
- `01-quick-start/` — 新增（快速开始）
- `02-interaction/` — 新增（交互与对话）

**将要重命名的目录：**
- `01-cli/` → `temp-cli-ref/`（临时保留，后续提取为附录）
- `02-slash-commands/` → `03-slash-commands/`
- `03-memory/` → `04-memory/`
- `04-skills/` → `05-skills/`
- `05-checkpoints/` → `09-checkpoints/`
- `07-subagents/` → `06-subagents/`
- `08-mcp/` → `07-mcp/`
- `09-hooks/` → `08-hooks/`
- `14-advanced-features/` → `13-advanced-features/`
- `17-boris-tips/` → `appendix-boris-tips/`

**将要合并的目录：**
- `12-background-tasks/` + `13-channels/` → `12-background-channels/`
- `15-enterprise/` + `16-advanced-capabilities/` → `14-enterprise/`

**将要删除/移动的目录：**
- `06-powerup-buddy/` → 移到 `archive/`（旧内容保留但不发布）

---

### 任务 1：创建新目录结构

**文件：**
- 创建：`01-quick-start/README.md`（空模板）
- 创建：`02-interaction/README.md`（空模板）
- 创建：`archive/README.md`（归档说明）

- [ ] **步骤 1：创建 archive 目录用于存放旧内容**

```bash
mkdir -p archive/06-powerup-buddy
```

- [ ] **步骤 2：创建 01-quick-start 目录**

```bash
mkdir -p 01-quick-start
```

创建空 README 模板：

```markdown
---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---

# 快速开始

> 🟢 **初级** | ⏱ 30 分钟
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证：2026-04-06

**你将学会：** 5 分钟体验 Claude Code 的核心价值，知道它能不能帮到自己。

## 为什么需要这个？

[待填写]

## 核心概念

[待填写]

## 实战场景

### 场景 1：[名称]

[待填写]

## 🎯 Try It Now

[待填写]

## 常见问题

[待填写]

## 下一章预告

[待填写]
```

- [ ] **步骤 3：创建 02-interaction 目录**

```bash
mkdir -p 02-interaction
```

创建空 README 模板（同上格式）

- [ ] **步骤 4：Commit**

```bash
git add 01-quick-start 02-interaction archive
git commit -m "chore: create new chapter directories for restructure (phase A-1)"
```

---

### 任务 2：重命名核心目录（第一批）

**文件：**
- 重命名：`01-cli/` → `temp-cli-ref/`
- 重命名：`02-slash-commands/` → `03-slash-commands/`
- 重命名：`03-memory/` → `04-memory/`
- 重命名：`04-skills/` → `05-skills/`

- [ ] **步骤 1：将 01-cli 临时重命名为 temp-cli-ref**

```bash
git mv 01-cli temp-cli-ref
```

说明：保留 CLI 参考内容，后续提取为附录。

- [ ] **步骤 2：重命名 02-slash-commands 为 03-slash-commands**

```bash
git mv 02-slash-commands 03-slash-commands
```

- [ ] **步骤 3：重命名 03-memory 为 04-memory**

```bash
git mv 03-memory 04-memory
```

- [ ] **步骤 4：重命名 04-skills 为 05-skills**

```bash
git mv 04-skills 05-skills
```

- [ ] **步骤 5：Commit**

```bash
git add .
git commit -m "chore: rename core directories batch 1 (phase A-2)"
```

---

### 任务 3：重命名进阶目录（第二批）

**文件：**
- 重命名：`07-subagents/` → `06-subagents/`
- 重命名：`08-mcp/` → `07-mcp/`
- 重命名：`09-hooks/` → `08-hooks/`
- 重命名：`05-checkpoints/` → `09-checkpoints/`

- [ ] **步骤 1：重命名 07-subagents 为 06-subagents**

```bash
git mv 07-subagents 06-subagents
```

- [ ] **步骤 2：重命名 08-mcp 为 07-mcp**

```bash
git mv 08-mcp 07-mcp
```

- [ ] **步骤 3：重命名 09-hooks 为 08-hooks**

```bash
git mv 09-hooks 08-hooks
```

- [ ] **步骤 4：重命名 05-checkpoints 为 09-checkpoints**

```bash
git mv 05-checkpoints 09-checkpoints
```

- [ ] **步骤 5：Commit**

```bash
git add .
git commit -m "chore: rename advanced directories batch 2 (phase A-3)"
```

---

### 任务 4：处理合并目录

**文件：**
- 合并：`12-background-tasks/` + `13-channels/` → `12-background-channels/`
- 合并：`15-enterprise/` + `16-advanced-capabilities/` → `14-enterprise/`

- [ ] **步骤 1：创建 12-background-channels 目录**

```bash
mkdir -p 12-background-channels
```

- [ ] **步骤 2：移动 background-tasks 内容到新目录**

```bash
git mv 12-background-tasks/README.md 12-background-channels/README-background-tasks.md
```

说明：暂时保留原文件名，后续合并内容时重命名。

- [ ] **步骤 3：移动 channels 内容到新目录**

```bash
git mv 13-channels/README.md 12-background-channels/README-channels.md
```

- [ ] **步骤 4：创建 14-enterprise 目录**

```bash
mkdir -p 14-enterprise
```

- [ ] **步骤 5：移动 enterprise 内容**

```bash
git mv 15-enterprise/README.md 14-enterprise/README-enterprise.md
git mv 16-advanced-capabilities/README.md 14-enterprise/README-advanced-capabilities.md
```

- [ ] **步骤 6：删除空目录**

```bash
rm -rf 12-background-tasks 13-channels 15-enterprise 16-advanced-capabilities
```

注意：使用 rm -rf 而非 git rm，因为内容已移动。

- [ ] **步骤 7：Commit**

```bash
git add .
git commit -m "chore: merge directories for combined chapters (phase A-4)"
```

---

### 任务 5：重命名精通阶段目录

**文件：**
- 重命名：`11-multi-agent/` → `11-multi-agent/`（保持不变）
- 重命名：`14-advanced-features/` → `13-advanced-features/`
- 重命名：`17-boris-tips/` → `appendix-boris-tips/`

- [ ] **步骤 1：重命名 14-advanced-features 为 13-advanced-features**

```bash
git mv 14-advanced-features 13-advanced-features
```

- [ ] **步骤 2：重命名 17-boris-tips 为 appendix-boris-tips**

```bash
git mv 17-boris-tips appendix-boris-tips
```

- [ ] **步骤 3：移动 06-powerup-buddy 到 archive**

```bash
git mv 06-powerup-buddy archive/06-powerup-buddy
```

- [ ] **步骤 4：Commit**

```bash
git add .
git commit -m "chore: rename mastery stage and appendix directories (phase A-5)"
```

---

### 任务 6：验证目录结构

**文件：**
- 验证：所有目录按预期存在

- [ ] **步骤 1：列出当前目录结构**

```bash
ls -la | grep -E "^d.*[0-9]|^d.*appendix|^d.*archive|^d.*content"
```

预期输出包含：
```
01-quick-start
02-interaction
03-slash-commands
04-memory
05-skills
06-subagents
07-mcp
08-hooks
09-checkpoints
10-plugins
11-multi-agent
12-background-channels
13-advanced-features
14-enterprise
appendix-boris-tips
archive/
temp-cli-ref
18-source-code-analysis
```

- [ ] **步骤 2：验证每个目录有 README.md**

```bash
find . -maxdepth 2 -name "README.md" | grep -v node_modules | sort
```

预期：每个目录都有 README.md 或临时 README 文件。

- [ ] **步骤 3：创建结构验证报告**

运行验证脚本确认结构正确。

---

## 验收清单

- [ ] 01-quick-start 目录存在
- [ ] 02-interaction 目录存在
- [ ] 03-slash-commands 目录存在（原 02）
- [ ] 04-memory 目录存在（原 03）
- [ ] 05-skills 目录存在（原 04）
- [ ] 06-subagents 目录存在（原 07）
- [ ] 07-mcp 目录存在（原 08）
- [ ] 08-hooks 目录存在（原 09）
- [ ] 09-checkpoints 目录存在（原 05）
- [ ] 10-plugins 目录存在（保持）
- [ ] 11-multi-agent 目录存在（保持）
- [ ] 12-background-channels 目录存在（合并）
- [ ] 13-advanced-features 目录存在（原 14）
- [ ] 14-enterprise 目录存在（合并）
- [ ] appendix-boris-tips 目录存在（原 17）
- [ ] archive/06-powerup-buddy 存在
- [ ] temp-cli-ref 目录存在（临时）
- [ ] 18-source-code-analysis 保持不变
- [ ] 所有目录都有 README.md