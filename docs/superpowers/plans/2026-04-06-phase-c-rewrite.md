# 教程重构 - 阶段 C：现有章节改写

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将现有章节从"参考手册"风格改写为"场景驱动教程"风格

**架构：** 每章遵循统一结构：为什么需要这个 → 核心概念 → 实战场景 → Try It Now → 下一章预告

**技术栈：** Markdown 编写

---

## 改写模板

每个章节改写时遵循以下结构：

```markdown
---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

> 🟢 **初级** | ⏱ XX 分钟
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证：2026-04-06

**你将学会：** [一句话目标]

# [章节名称]

## 为什么需要这个？

[从读者需求角度切入，描述解决什么问题]

## 核心概念

[简明解释，不超过 200 字]

## 实战场景

### 场景 1：[名称]
[场景描述、操作步骤、效果]

### 场景 2：[名称]
[场景描述、操作步骤、效果]

### 场景 3：[名称]
[场景描述、操作步骤、效果]

## 🎯 Try It Now

### 练习 1：[名称]
[具体操作步骤]

### 练习 2：[名称]
[具体操作步骤]

## 常见问题

[3-5 个常见问题]

## 下一章预告

[引出下一章，建立叙事逻辑]

继续 → [下一章名称](../XX-next-chapter/)
```

---

## 改写顺序

按四阶段顺序改写，保持叙事连贯：

| 序号 | 章节 | 难度 | 时间 | 改写要点 |
|------|------|------|------|----------|
| C-1 | 03-slash-commands | 初级 | 40min | 场景：代码审查、提交、搜索 |
| C-2 | 04-memory | 初级 | 45min | 场景：项目 CLAUDE.md、个人偏好 |
| C-3 | 05-skills | 中级 | 50min | 场景：使用内置、创建简单 Skill |
| C-4 | 06-subagents | 中级 | 60min | 场景：内置代理、创建自定义 |
| C-5 | 07-mcp | 中级 | 50min | 场景：连接 GitHub、数据库 |
| C-6 | 08-hooks | 中级 | 70min | 场景：保存格式化、提交检查 |
| C-7 | 09-checkpoints | 初级 | 30min | 场景：创建快照、回退 |
| C-8 | 10-plugins | 中级 | 90min | 场景：安装、创建、发布 |
| C-9 | 11-multi-agent | 高级 | 90min | 场景：多代理协作 |
| C-10 | 12-background-channels | 中级 | 45min | 合并两个章节 |
| C-11 | 13-advanced-features | 高级 | 120min | 场景：深度定制 |
| C-12 | 14-enterprise | 高级 | 180min | 合并两个章节 |

---

### 任务 C-1：改写 03-slash-commands

**文件：**
- 修改：`03-slash-commands/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："有没有快捷命令，不用每次输入完整指令？"
- 核心概念：快捷方式，一键触发复杂任务

- [ ] **步骤 2：编写场景**

- 场景 1：代码审查 `/review`
- 场景 2：提交代码 `/commit`
- 场景 3：搜索代码 `/grep`

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 04-memory："我希望 Claude 记住我的项目规范"

- [ ] **步骤 5：Commit**

```bash
git add 03-slash-commands/README.md
git commit -m "content: rewrite 03-slash-commands with scenario-driven style (phase C-1)"
```

---

### 任务 C-2：改写 04-memory

**文件：**
- 修改：`04-memory/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："我希望 Claude 记住我的项目规范、代码风格"
- 核心概念：CLAUDE.md 三层结构

- [ ] **步骤 2：编写场景**

- 场景 1：项目 CLAUDE.md
- 场景 2：个人 CLAUDE.md
- 场景 3：对话 Memory

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 05-skills："有些任务我经常重复做，能不能保存成模板？"

- [ ] **步骤 5：Commit**

```bash
git add 04-memory/README.md
git commit -m "content: rewrite 04-memory with scenario-driven style (phase C-2)"
```

---

### 任务 C-3：改写 05-skills

**文件：**
- 修改：`05-skills/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："有些任务我经常重复做，能不能保存成模板？"
- 核心概念：可复用的任务模板

- [ ] **步骤 2：编写场景**

- 场景 1：使用内置 Skills
- 场景 2：创建简单 Skill
- 场景 3：创建带模板的 Skill

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 06-subagents："有些任务太专业了，能不能请专家？"

- [ ] **步骤 5：Commit**

```bash
git add 05-skills/README.md
git commit -m "content: rewrite 05-skills with scenario-driven style (phase C-3)"
```

---

### 任务 C-4：改写 06-subagents

**文件：**
- 修改：`06-subagents/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："有些任务太专业了（安全审查、性能优化）"
- 核心概念：专业领域的专家，隔离执行

- [ ] **步骤 2：编写场景**

- 场景 1：使用内置 Subagents
- 场景 2：创建自定义 Subagent
- 场景 3：组合多个 Subagents

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 07-mcp："我想让 Claude 访问我的数据库/API"

- [ ] **步骤 5：Commit**

```bash
git add 06-subagents/README.md
git commit -m "content: rewrite 06-subagents with scenario-driven style (phase C-4)"
```

---

### 任务 C-5：改写 07-mcp

**文件：**
- 修改：`07-mcp/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："我想让 Claude 访问外部数据和工具"
- 核心概念：Model Context Protocol

- [ ] **步骤 2：编写场景**

- 场景 1：连接 GitHub
- 场景 2：连接数据库
- 场景 3：创建自定义 MCP 服务器

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 08-hooks："我希望某些操作能自动执行"

- [ ] **步骤 5：Commit**

```bash
git add 07-mcp/README.md
git commit -m "content: rewrite 07-mcp with scenario-driven style (phase C-5)"
```

---

### 任务 C-6：改写 08-hooks

**文件：**
- 修改：`08-hooks/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："我希望某些操作能自动执行"
- 核心概念：事件驱动自动化

- [ ] **步骤 2：编写场景**

- 场景 1：保存后自动格式化
- 场景 2：提交前自动检查
- 场景 3：会话结束时自动通知

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 09-checkpoints："我改出问题了，能不能回退？"

- [ ] **步骤 5：Commit**

```bash
git add 08-hooks/README.md
git commit -m "content: rewrite 08-hooks with scenario-driven style (phase C-6)"
```

---

### 任务 C-7：改写 09-checkpoints

**文件：**
- 修改：`09-checkpoints/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："我在做重要的改动，能不能随时保存进度？"
- 核心概念：会话快照与回滚

- [ ] **步骤 2：编写场景**

- 场景 1：重要改动前创建快照
- 场景 2：回退到之前的状态
- 场景 3：比较不同版本

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 10-plugins："我想把这些能力打包分享给团队"

- [ ] **步骤 5：Commit**

```bash
git add 09-checkpoints/README.md
git commit -m "content: rewrite 09-checkpoints with scenario-driven style (phase C-7)"
```

---

### 任务 C-8：改写 10-plugins

**文件：**
- 修改：`10-plugins/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："我想把能力打包分享给团队"
- 核心概念：扩展包系统

- [ ] **步骤 2：编写场景**

- 场景 1：安装社区 Plugin
- 场景 2：创建团队 Plugin
- 场景 3：发布到 Marketplace

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 11-multi-agent："我的项目很复杂，需要多个 Agent 协作"

- [ ] **步骤 5：Commit**

```bash
git add 10-plugins/README.md
git commit -m "content: rewrite 10-plugins with scenario-driven style (phase C-8)"
```

---

### 任务 C-9：改写 11-multi-agent

**文件：**
- 修改：`11-multi-agent/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："我的项目很复杂，需要多个 Agent 协作"
- 核心概念：多 Agent 协作系统

- [ ] **步骤 2：编写场景**

- 场景 1：设计多 Agent 系统
- 场景 2：实现协作流程
- 场景 3：监控和调试

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 12-background-channels："有些任务要跑很长时间"

- [ ] **步骤 5：Commit**

```bash
git add 11-multi-agent/README.md
git commit -m "content: rewrite 11-multi-agent with scenario-driven style (phase C-9)"
```

---

### 任务 C-10：合并改写 12-background-channels

**文件：**
- 合并：`12-background-channels/README-background-tasks.md` + `README-channels.md`
- 创建：`12-background-channels/README.md`

- [ ] **步骤 1：分析原内容**

读取两个原文件，提取核心内容

- [ ] **步骤 2：编写开场部分**

根据设计文档：
- 解决的问题："有些任务要跑很长时间"
- 核心概念：后台任务管理、通知通道

- [ ] **步骤 3：编写场景**

- 场景 1：启动后台任务
- 场景 2：配置通知通道（Discord/Slack）
- 场景 3：监控长时间任务

- [ ] **步骤 4：添加 Try It Now**

- [ ] **步骤 5：添加下一章预告**

引出 13-advanced-features："我想深度定制 Claude 的行为"

- [ ] **步骤 6：删除临时文件**

```bash
rm 12-background-channels/README-background-tasks.md
rm 12-background-channels/README-channels.md
```

- [ ] **步骤 7：Commit**

```bash
git add 12-background-channels/README.md
git commit -m "content: merge and rewrite 12-background-channels (phase C-10)"
```

---

### 任务 C-11：改写 13-advanced-features

**文件：**
- 修改：`13-advanced-features/README.md`

- [ ] **步骤 1：添加开场部分**

根据设计文档：
- 解决的问题："我想深度定制 Claude 的行为"
- 核心概念：高级定制能力

- [ ] **步骤 2：编写场景**

- 场景 1：自定义系统提示
- 场景 2：权限模式深度配置
- 场景 3：性能调优

- [ ] **步骤 3：添加 Try It Now**

- [ ] **步骤 4：添加下一章预告**

引出 14-enterprise："我要在生产环境使用"

- [ ] **步骤 5：Commit**

```bash
git add 13-advanced-features/README.md
git commit -m "content: rewrite 13-advanced-features with scenario-driven style (phase C-11)"
```

---

### 任务 C-12：合并改写 14-enterprise

**文件：**
- 合并：`14-enterprise/README-enterprise.md` + `README-advanced-capabilities.md`
- 创建：`14-enterprise/README.md`

- [ ] **步骤 1：分析原内容**

读取两个原文件，提取核心内容

- [ ] **步骤 2：编写开场部分**

根据设计文档：
- 解决的问题："我要在生产环境使用"
- 核心概念：企业级部署和管理

- [ ] **步骤 3：编写场景**

- 场景 1：团队部署策略
- 场景 2：安全合规配置
- 场景 3：监控和审计

- [ ] **步骤 4：添加 Try It Now**

- [ ] **步骤 5：添加最终总结**

作为最后一章，添加学习路径回顾

- [ ] **步骤 6：删除临时文件**

```bash
rm 14-enterprise/README-enterprise.md
rm 14-enterprise/README-advanced-capabilities.md
```

- [ ] **步骤 7：Commit**

```bash
git add 14-enterprise/README.md
git commit -m "content: merge and rewrite 14-enterprise (phase C-12)"
```

---

## 验收清单

- [ ] 所有 12 个章节已改写
- [ ] 每章有"为什么需要这个"开场
- [ ] 每章有 2-3 个实战场景
- [ ] 每个场景后有 Try It Now
- [ ] 每章有"下一章预告"
- [ ] 章节之间叙事逻辑连贯
- [ ] 合并章节内容完整