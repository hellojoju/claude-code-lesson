# 教程内容验证计划

> **面向 AI 代理的工作者：** 此计划用于系统验证教程内容的正确性。对不确定的内容必须搜索官方文档验证。

**目标：** 遍历所有18个教程模块，验证技术内容、代码示例、命令和链接的正确性。

**架构：** 按模块逐一验证，每个模块检查：技术准确性、代码/命令正确性、链接有效性、版本一致性。

**技术栈：** Claude Code CLI、官方文档 (code.claude.com)

---

## 模块列表

| 序号 | 模块 | 难度 | 验证重点 |
|------|------|------|----------|
| 01 | Slash Commands | 初级 | 内置命令列表、自定义命令语法 |
| 02 | Memory | 初级 | CLAUDE.md 语法、上下文管理 |
| 03 | Skills | 初级 | Skill 文件结构、参数语法 |
| 04 | Subagents | 中级 | Agent 类型、委托模式 |
| 05 | MCP | 中级 | MCP 服务器配置、工具定义 |
| 06 | Hooks | 中级 | Hook 类型、脚本路径、环境变量 |
| 07 | Plugins | 中级 | 插件结构、manifest 格式 |
| 08 | Checkpoints | 初级 | 会话快照、回滚命令 |
| 09 | Advanced Features | 高级 | 扩展思考、权限模式、自动模式 |
| 10 | CLI | 初级 | 命令行参数、启动选项 |
| 11 | Multi-Agent | 中级 | Worktree 操作、Agent 协作 |
| 12 | Background Tasks | 中级 | 后台任务语法、轮询命令 |
| 13 | Channels | 中级 | 频道命令、上下文隔离 |
| 14 | PowerUp & Buddy | 初级 | 交互式学习功能 |
| 15 | Enterprise | 高级 | 企业部署、MDM 配置、CI/CD |
| 16 | Advanced Capabilities | 高级 | Computer Use、Voice Mode |
| 17 | Boris Tips | 中级 | 最佳实践、使用技巧 |
| 18 | Source Code Analysis | 高级 | 源码结构、架构分析 |

---

## 任务 1：验证 Slash Commands 模块

**文件：** `01-slash-commands/README.md`

**验证步骤：**

- [ ] **步骤 1：读取模块内容**

```bash
cat 01-slash-commands/README.md | head -200
```

- [ ] **步骤 2：提取内置命令列表并对照官方文档**

搜索官方文档验证命令列表：
- 访问 https://code.claude.com/docs/en/slash-commands
- 对比教程中列出的命令是否完整、准确
- 检查命令描述是否准确

- [ ] **步骤 3：验证自定义 Skill 语法**

检查 Skill 文件结构示例：
- `.claude/commands/` 目录结构
- Markdown 格式要求
- 参数语法 `{arg_name}`

- [ ] **步骤 4：验证代码示例可执行性**

检查教程中的命令示例：
- `/compact` - 验证是否存在
- `/clear` - 验证功能描述
- `/rewind` - 验证参数语法

- [ ] **步骤 5：记录发现的问题**

创建问题清单，标注需要修正的内容。

---

## 任务 2：验证 Memory 模块

**文件：** `02-memory/README.md`

**验证步骤：**

- [ ] **步骤 1：读取模块内容**

```bash
cat 02-memory/README.md | head -200
```

- [ ] **步骤 2：验证 CLAUDE.md 语法**

对照官方文档验证：
- Frontmatter 格式
- 项目指令写法
- 上下文包含方式

- [ ] **步骤 3：验证配置示例**

检查配置文件示例：
- `~/.claude/settings.json` 格式
- 项目级 vs 用户级配置
- 环境变量使用

- [ ] **步骤 4：搜索验证不确定内容**

对不确定的配置项进行搜索：
```
WebSearch: "Claude Code CLAUDE.md configuration 2026"
```

---

## 任务 3：验证 Skills 模块

**文件：** `03-skills/README.md`

**验证步骤：**

- [ ] **步骤 1：读取模块内容**

- [ ] **步骤 2：验证 Skill 文件结构**

对照官方文档：
- `.claude/skills/` 目录
- `instructions.md` 格式
- 参数定义语法

- [ ] **步骤 3：验证 Skill 调用方式**

检查：
- `/skill-name` 调用语法
- 参数传递方式
- 返回值处理

---

## 任务 4-18：验证剩余模块

（每个模块遵循相同的验证流程：读取内容 → 对照官方文档 → 验证代码示例 → 搜索不确定内容 → 记录问题）

---

## 任务 19：汇总问题并修正

**验证步骤：**

- [ ] **步骤 1：汇总所有发现的问题**

整理问题清单，按优先级分类：
- P0：技术错误（命令不存在、语法错误）
- P1：描述不准确
- P2：链接失效
- P3：建议改进

- [ ] **步骤 2：逐个修正问题**

对每个问题：
1. 查阅官方文档确认正确内容
2. 更新 README.md
3. 重新生成 HTML 页面

- [ ] **步骤 3：验证修正结果**

```bash
node scripts/sync-modules.js
```

---

## 执行方式

由于这是内容审核任务，建议使用**内联执行**方式：

1. 逐模块读取内容
2. 对照官方文档验证
3. 搜索不确定内容
4. 记录并修正问题
5. 重新生成页面

**预计工作量：** 每个模块 10-20 分钟，总计约 4-6 小时。