# 教程重构实现计划总览

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将 Claude Code 中文教程从"参考手册"风格转变为"场景驱动教程"风格

**架构：** 四阶段渐进式结构（上手→定制→自动化→精通），每章解决一个问题并引出下一章

**技术栈：** Markdown、Node.js 构建脚本、静态 HTML 生成

---

## 范围说明

根据设计文档 `docs/superpowers/specs/2026-04-06-tutorial-restructure-design.md`，此重构规模较大，建议分阶段实施：

- **阶段 A**：目录结构重组（重命名、合并、新增空目录）
- **阶段 B**：新增章节编写（01-快速开始、02-交互与对话）
- **阶段 C**：现有章节改写（按四阶段顺序逐章改写）
- **阶段 D**：构建系统更新和最终验证

每个阶段有独立的详细计划文件。

---

## 子计划列表

| 计划 | 文件 | 状态 |
|------|------|------|
| 阶段 A：结构重组 | `2026-04-06-phase-a-structure.md` | ✅ 已创建 |
| 阶段 B：新增章节 | `2026-04-06-phase-b-new-chapters.md` | ✅ 已创建 |
| 阶段 C：章节改写 | `2026-04-06-phase-c-rewrite.md` | ✅ 已创建 |
| 阶段 D：构建验证 | `2026-04-06-phase-d-build.md` | ✅ 已创建 |

---

## 章节映射总览

| 新章节 | 旧章节 | 操作 |
|--------|--------|------|
| 01-quick-start | 无 | 新增 |
| 02-interaction | 01-cli | 精简重写 |
| 03-slash-commands | 02-slash-commands | 改写 |
| 04-memory | 03-memory | 改写 |
| 05-skills | 04-skills | 改写 |
| 06-subagents | 07-subagents | 改写 + 重命名 |
| 07-mcp | 08-mcp | 改写 + 重命名 |
| 08-hooks | 09-hooks | 改写 + 重命名 |
| 09-checkpoints | 05-checkpoints | 改写 + 重命名 |
| 10-plugins | 10-plugins | 改写 |
| 11-multi-agent | 11-multi-agent | 改写 |
| 12-background-channels | 12-background-tasks + 13-channels | 合并改写 |
| 13-advanced-features | 14-advanced-features | 改写 + 重命名 |
| 14-enterprise | 15-enterprise + 16-advanced-capabilities | 合并改写 |
| appendix-cli | 01-cli | 提取命令表 |
| appendix-boris | 17-boris-tips | 重命名 |
| source-analysis | 18-source-code-analysis | 保持 |

---

## 验收标准

- [ ] 目录结构符合新设计
- [ ] 每章有"为什么需要这个"开场
- [ ] 每章有 2-3 个实战场景
- [ ] 每个场景后有 Try It Now
- [ ] 每章有"下一章预告"
- [ ] 网站构建成功，所有页面可访问
- [ ] 导航链接正确（prev/next）