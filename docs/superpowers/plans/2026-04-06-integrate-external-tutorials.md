# 整合外部教程内容实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将三个外部 Claude Code 教程仓库的内容完整整合到我们的教程网站中

**架构：** 内容映射到现有模块结构，新增缺失章节，避免重复，优先高质量内容

**技术栈：** Node.js, Markdown, HTML, 静态网站生成

---

## 源仓库分析

### 仓库 1: claude-code-guide
- **URL**: https://github.com/claude-code-chinese/claude-code-guide
- **内容**: 1 个 README.md（32KB）- 国内使用指南
- **价值**: 国内访问配置、中转站使用指南

### 仓库 2: awesome-claudcode-tutorial
- **URL**: https://github.com/xianyu110/awesome-claudcode-tutorial
- **内容**: 491 个 markdown 文件
  - 30 个章节（docs/zh/chapters/）
  - 207 篇简体中文文章（docs/zh/articles/）
  - 208 篇繁体中文文章（docs/tw/articles/）
- **价值**: 最全面的教程资源，覆盖所有功能

### 仓库 3: claude-code-handbook-cn
- **URL**: https://github.com/harven-droid/claude-code-handbook-cn
- **内容**: 1 个完整手册文件（1360 行，25 章节）+ 图片
- **价值**: freeCodeCamp 官方手册翻译，专业入门指南

---

## 内容映射策略

### 现有模块 vs 新内容对照

| 现有模块 | awesome-claudcode 章节 | handbook 章节 | 整合策略 |
|---------|----------------------|--------------|---------|
| 01-slash-commands | 第4章命令系统、第5-7章高级交互 | 第10章提示词纪律 | 补充高级命令用法 |
| 02-memory | 第15章项目记忆文件 | 第19章技能规则持久指令 | 补充最佳实践 |
| 03-skills | 第17章Agent Skills | 第19章技能规则持久指令 | 补充高级技能 |
| 04-subagents | 第18章SubAgent | 第18章代理子代理并行工作流 | 补充并行工作流 |
| 05-mcp | 第11、32章MCP | 第17章MCP服务器 | 补充更多集成示例 |
| 06-hooks | 第16章Hook系统 | - | 补充更多hook示例 |
| 07-plugins | 第20章Plugin系统 | - | 补充插件开发指南 |
| 08-checkpoints | 第9章版本回滚Rewind | 第16章上下文窗口会话管理 | 补充最佳实践 |
| 09-advanced-features | 第21-29章企业级 | 第15-23章高级功能 | 全面补充 |
| 10-cli | 第5-7章高级交互 | - | 补充所有CLI参数 |
| 11-multi-agent | 第28章多Agent协作 | 第18章代理子代理并行工作流 | 补充协作模式 |
| 12-background-tasks | 第8章后台任务管理 | - | 补充示例 |
| 13-channels | - | - | 保持现有 |
| 14-powerup-buddy | - | - | 保持现有 |

### 需要新增的内容

1. **企业级应用章节**（从 awesome-claudcode 第21-25章）
2. **高级能力章节**（从 awesome-claudcode 第26-29章）
3. **Boris 使用技巧**（从 handbook）
4. **完整的 CLI 参数参考**（从 awesome-claudcode 文章）

---

## 文件结构

```
claude-code-lesson/
├── 01-slash-commands/
│   └── README.md          # 增强
├── 02-memory/
│   └── README.md          # 增强
├── 03-skills/
│   └── README.md          # 增强
├── 04-subagents/
│   └── README.md          # 增强
├── 05-mcp/
│   └── README.md          # 增强
├── 06-hooks/
│   └── README.md          # 增强
├── 07-plugins/
│   └── README.md          # 增强
├── 08-checkpoints/
│   └── README.md          # 增强
├── 09-advanced-features/
│   └── README.md          # 增强
├── 10-cli/
│   └── README.md          # 增强
├── 11-multi-agent/
│   └── README.md          # 增强
├── 12-background-tasks/
│   └── README.md          # 增强
├── 15-enterprise/          # 新增
│   └── README.md
├── 16-advanced-capabilities/  # 新增
│   └── README.md
├── 17-boris-tips/          # 新增
│   └── README.md
├── website/
│   ├── content/
│   │   ├── 01-slash-commands.html  # 重新生成
│   │   ├── ...                      # 所有页面重新生成
│   │   ├── 15-enterprise.html      # 新增
│   │   ├── 16-advanced-capabilities.html  # 新增
│   │   └── 17-boris-tips.html      # 新增
│   └── js/main.js           # 更新模块列表
└── scripts/
    └── sync-modules.js      # 更新模块配置
```

---

## 任务列表

### 任务 1：准备工作 - 复制源文件到临时目录

**文件：**
- 创建：`/tmp/tutorial-sources/` 目录

- [ ] **步骤 1：创建临时工作目录**

```bash
mkdir -p /tmp/tutorial-sources/{awesome-claudcode,handbook,guide}
```

- [ ] **步骤 2：复制 awesome-claudcode 教程文件**

```bash
cp -r /tmp/awesome-claudcode-tutorial/docs/zh/articles /tmp/tutorial-sources/awesome-claudcode/
cp -r /tmp/awesome-claudcode-tutorial/docs/zh/chapters /tmp/tutorial-sources/awesome-claudcode/
```

- [ ] **步骤 3：复制 handbook 文件**

```bash
cp /tmp/claude-code-handbook-cn/Claude-Code-Handbook-中文完整版.md /tmp/tutorial-sources/handbook/
cp -r /tmp/claude-code-handbook-cn/images /tmp/tutorial-sources/handbook/
```

- [ ] **步骤 4：复制 guide 文件**

```bash
cp /tmp/claude-code-guide/README.md /tmp/tutorial-sources/guide/
```

---

### 任务 2：增强 01-slash-commands 模块

**文件：**
- 修改：`01-slash-commands/README.md`

- [ ] **步骤 1：读取现有内容**

```bash
cat 01-slash-commands/README.md
```

- [ ] **步骤 2：从 awesome-claudcode 提取命令系统章节**

读取 `/tmp/tutorial-sources/awesome-claudcode/chapters/04-modes.md` 和相关文章，提取高级命令用法。

- [ ] **步骤 3：添加高级 slash 命令用法**

在现有内容后添加：
- `/btw` 命令详解
- `/compact` 命令详解
- `/config` 命令详解
- `/doctor` 命令详解
- `/init` 命令详解
- `/keybindings` 命令详解
- `/mcp` 命令详解
- `/permissions` 命令详解
- `/terminal-setup` 命令详解

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 3：增强 02-memory 模块

**文件：**
- 修改：`02-memory/README.md`

- [ ] **步骤 1：读取 awesome-claudcode 第15章**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/15-claude-md.md
```

- [ ] **步骤 2：提取最佳实践内容**

从 handbook 第19章提取技能规则和持久指令的最佳实践。

- [ ] **步骤 3：补充 CLAUDE.md 最佳实践**

添加：
- 企业级 CLAUDE.md 配置示例
- 团队协作 memory 配置
- 多项目 memory 管理
- memory 排错指南

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 4：增强 03-skills 模块

**文件：**
- 修改：`03-skills/README.md`

- [ ] **步骤 1：读取 awesome-claudcode 第17章**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/17-skills.md
```

- [ ] **步骤 2：读取相关文章**

读取 `/tmp/tutorial-sources/awesome-claudcode/articles/` 中所有 Skills 相关文章（113-122编号）。

- [ ] **步骤 3：补充高级 Skills 内容**

添加：
- Skills 执行机制详解
- Skills 核心 API
- Skills 生命周期管理
- Skills 性能优化
- Skills 与主代理交互

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 5：增强 04-subagents 模块

**文件：**
- 修改：`04-subagents/README.md`

- [ ] **步骤 1：读取 awesome-claudcode 第18章**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/18-subagents.md
```

- [ ] **步骤 2：读取 handbook 第18章**

```bash
cat /tmp/tutorial-sources/handbook/Claude-Code-Handbook-中文完整版.md | grep -A 500 "第18章"
```

- [ ] **步骤 3：补充并行工作流内容**

添加：
- 并行代理工作流详解
- 子代理协调模式
- Agent Teams 使用指南
- Coordinator Mode 详解

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 6：增强 05-mcp 模块

**文件：**
- 修改：`05-mcp/README.md`

- [ ] **步骤 1：读取 awesome-claudcode MCP 相关章节**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/11-mcp-setup.md
cat /tmp/tutorial-sources/awesome-claudcode/chapters/13-mcp-design.md
```

- [ ] **步骤 2：读取 handbook 第17章**

提取 MCP 服务器和外部集成内容。

- [ ] **步骤 3：补充 MCP 集成示例**

添加：
- GitHub MCP 集成
- Notion MCP 集成
- Slack MCP 集成
- Google Workspace MCP 集成
- 自定义 MCP 服务器开发

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 7：增强 06-hooks 模块

**文件：**
- 修改：`06-hooks/README.md`

- [ ] **步骤 1：读取 awesome-claudcode 第16章**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/16-hooks.md
```

- [ ] **步骤 2：读取相关文章**

读取 hooks 相关文章（067编号）。

- [ ] **步骤 3：补充更多 hook 示例**

添加：
- Hook 调试技巧
- Hook 性能优化
- Hook 安全最佳实践
- 企业级 Hook 配置

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 8：增强 07-plugins 模块

**文件：**
- 修改：`07-plugins/README.md`

- [ ] **步骤 1：读取 awesome-claudcode 第20章**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/20-plugins.md
```

- [ ] **步骤 2：读取相关文章**

读取插件相关文章（139-153编号）。

- [ ] **步骤 3：补充插件开发指南**

添加：
- 插件市场使用
- 插件权限管理
- 复杂插件设计
- 多插件协作
- 插件性能优化

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 9：增强 08-checkpoints 模块

**文件：**
- 修改：`08-checkpoints/README.md`

- [ ] **步骤 1：读取 awesome-claudcode 第9章**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/09-rewind.md
```

- [ ] **步骤 2：读取 handbook 第16章**

提取上下文窗口和会话管理内容。

- [ ] **步骤 3：补充最佳实践**

添加：
- Checkpoint 策略
- Rewind 最佳实践
- 会话恢复技巧
- 上下文压缩策略

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 10：增强 09-advanced-features 模块

**文件：**
- 修改：`09-advanced-features/README.md`

- [ ] **步骤 1：读取 awesome-claudcode 企业级章节**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/21-workflows-best-practices.md
cat /tmp/tutorial-sources/awesome-claudcode/chapters/22-enterprise-deployment.md
cat /tmp/tutorial-sources/awesome-claudcode/chapters/23-remote-control-sessions.md
cat /tmp/tutorial-sources/awesome-claudcode/chapters/24-monitoring-observability.md
cat /tmp/tutorial-sources/awesome-claudcode/chapters/25-ci-cd-integration.md
```

- [ ] **步骤 2：读取 handbook 高级功能章节**

提取第15-23章的高级功能内容。

- [ ] **步骤 3：补充企业级内容**

添加：
- 工作流与最佳实践（代码审查、调试、重构）
- 企业部署（托管设置、安全、合规）
- 远程控制与会话（多设备协作、云会话）
- 监控与可观测性（OpenTelemetry、指标、日志）
- CI/CD 集成（GitHub Actions、自动化流水线）

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 11：增强 10-cli 模块

**文件：**
- 修改：`10-cli/README.md`

- [ ] **步骤 1：读取所有 CLI 相关文章**

读取 awesome-claudcode 文章中 024-081 编号的所有 CLI 参数文章。

- [ ] **步骤 2：补充完整 CLI 参数参考**

添加所有 CLI 参数的详细说明：
- `--add-dir` - 添加额外的工作目录
- `--agents` - 动态定义自定义子代理
- `--allowedTools` - 允许的工具列表
- `--disallowedTools` - 禁止的工具列表
- `--print`, `-p` - 打印响应
- `--system-prompt` - 替换系统提示
- `--system-prompt-file` - 从文件加载系统提示
- `--append-system-prompt` - 附加到默认系统提示
- `--output-format` - 指定输出格式
- `--input-format` - 指定输入格式
- `--max-turns` - 限制代理轮数
- `--model` - 设置会话模型
- `--permission-mode` - 指定权限模式
- `--resume` - 恢复特定会话
- `--continue` - 加载最近的对话
- `--verbose` - 启用详细日志记录
- 以及所有其他参数...

- [ ] **步骤 3：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 12：增强 11-multi-agent 模块

**文件：**
- 修改：`11-multi-agent/README.md`

- [ ] **步骤 1：读取 awesome-claudcode 第28章**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/28-multi-agent-collaboration.md
```

- [ ] **步骤 2：读取 handbook 第18章**

提取代理、子代理和并行工作流内容。

- [ ] **步骤 3：补充协作模式内容**

添加：
- Worktrees 并行工作
- Agent Teams 配置
- Coordinator Mode 使用
- 多 Agent 协作最佳实践

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 13：增强 12-background-tasks 模块

**文件：**
- 修改：`12-background-tasks/README.md`

- [ ] **步骤 1：读取 awesome-claudcode 第8章**

```bash
cat /tmp/tutorial-sources/awesome-claudcode/chapters/08-background-tasks.md
```

- [ ] **步骤 2：补充后台任务示例**

添加：
- 后台任务管理命令
- 长时间运行任务处理
- 并行任务执行
- 任务监控和调试

- [ ] **步骤 3：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 14：创建 15-enterprise 新模块

**文件：**
- 创建：`15-enterprise/README.md`

- [ ] **步骤 1：创建模块目录**

```bash
mkdir -p 15-enterprise
```

- [ ] **步骤 2：编写企业级应用模块内容**

基于 awesome-claudcode 第21-25章和 handbook 企业相关内容，创建完整的企业级应用模块，包含：
- 工作流与最佳实践
- 企业部署指南
- 远程控制与会话
- 监控与可观测性
- CI/CD 集成

- [ ] **步骤 3：添加 frontmatter**

```markdown
---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---
```

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 15：创建 16-advanced-capabilities 新模块

**文件：**
- 创建：`16-advanced-capabilities/README.md`

- [ ] **步骤 1：创建模块目录**

```bash
mkdir -p 16-advanced-capabilities
```

- [ ] **步骤 2：编写高级能力模块内容**

基于 awesome-claudcode 第26-29章，创建高级能力模块，包含：
- Computer Use（屏幕操作）
- Voice Mode（语音模式）
- 多 Agent 协作高级模式
- 高级命令与反模式

- [ ] **步骤 3：添加 frontmatter**

```markdown
---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---
```

- [ ] **步骤 4：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 16：创建 17-boris-tips 新模块

**文件：**
- 创建：`17-boris-tips/README.md`

- [ ] **步骤 1：创建模块目录**

```bash
mkdir -p 17-boris-tips
```

- [ ] **步骤 2：提取 Boris Cherny 使用技巧**

从 handbook 中提取 Boris Cherny（Claude Code 负责人）的使用技巧和最佳实践。

- [ ] **步骤 3：编写 Boris 使用技巧模块**

包含：
- Claude Code 设计哲学
- Anthropic 内部使用实践
- 每天发布 10-30 个 PR 的秘诀
- 提示词纪律
- 规划作为核心实践
- 逐功能构建方法论

- [ ] **步骤 4：添加 frontmatter**

```markdown
---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---
```

- [ ] **步骤 5：运行 sync 脚本验证**

```bash
node scripts/sync-modules.js
```

---

### 任务 17：更新 sync-modules.js 配置

**文件：**
- 修改：`scripts/sync-modules.js`

- [ ] **步骤 1：添加新模块到 MODULES 数组**

```javascript
const MODULES = [
  // ... 现有模块 ...
  { id: '15-enterprise', title: '企业级应用', difficulty: 'advanced', prev: '14-powerup-buddy', next: '16-advanced-capabilities' },
  { id: '16-advanced-capabilities', title: '高级能力', difficulty: 'advanced', prev: '15-enterprise', next: '17-boris-tips' },
  { id: '17-boris-tips', title: 'Boris 使用技巧', difficulty: 'intermediate', prev: '16-advanced-capabilities', next: null }
];
```

- [ ] **步骤 2：更新现有模块的 next 链接**

将 `14-powerup-buddy` 的 next 从 `null` 改为 `'15-enterprise'`。

- [ ] **步骤 3：运行 sync 脚本生成新页面**

```bash
node scripts/sync-modules.js
```

---

### 任务 18：更新网站首页和目录页

**文件：**
- 修改：`website/index.html`
- 修改：`website/js/main.js`
- 修改：`website/content/modules.html`

- [ ] **步骤 1：更新 main.js 中的模块数据**

在 `getMockDirectoryData()` 函数中添加新模块：

```javascript
{
    id: '15-enterprise',
    title: '15 - 企业级应用',
    description: '工作流、部署、监控与 CI/CD',
    files: [
        { name: 'README.md', title: '企业级应用完整指南', status: '已翻译' }
    ]
},
{
    id: '16-advanced-capabilities',
    title: '16 - 高级能力',
    description: 'Computer Use、语音模式与高级协作',
    files: [
        { name: 'README.md', title: '高级能力完整指南', status: '已翻译' }
    ]
},
{
    id: '17-boris-tips',
    title: '17 - Boris 使用技巧',
    description: 'Claude Code 负责人的使用秘诀',
    files: [
        { name: 'README.md', title: 'Boris 使用技巧指南', status: '已翻译' }
    ]
}
```

- [ ] **步骤 2：更新首页统计数字**

将模块数量从 14 改为 17。

- [ ] **步骤 3：更新首页快速开始卡片**

添加企业级应用卡片。

- [ ] **步骤 4：验证页面显示**

```bash
# 启动本地服务器检查
npx http-server website -p 8080
```

---

### 任务 19：更新 PDF 下载页

**文件：**
- 修改：`website/pdf.html`

- [ ] **步骤 1：添加新模块的 PDF 卡片**

添加 15-enterprise、16-advanced-capabilities、17-boris-tips 的 PDF 下载卡片。

- [ ] **步骤 2：更新完整教程 PDF 信息**

更新模块数量从 13 改为 17。

---

### 任务 20：复制图片资源

**文件：**
- 复制到：`website/resources/images/`

- [ ] **步骤 1：创建图片目录**

```bash
mkdir -p website/resources/images/handbook
```

- [ ] **步骤 2：复制 handbook 图片**

```bash
cp -r /tmp/tutorial-sources/handbook/images/* website/resources/images/handbook/
```

- [ ] **步骤 3：更新模块中的图片引用**

将所有图片路径更新为正确的相对路径。

---

### 任务 21：最终验证和测试

- [ ] **步骤 1：运行 sync 脚本生成所有页面**

```bash
node scripts/sync-modules.js
```

- [ ] **步骤 2：启动本地服务器**

```bash
npx http-server website -p 8080
```

- [ ] **步骤 3：检查所有页面**

访问以下页面验证内容：
- http://localhost:8080/
- http://localhost:8080/content/modules.html
- http://localhost:8080/content/01-slash-commands.html
- ... 所有模块页面
- http://localhost:8080/content/17-boris-tips.html
- http://localhost:8080/pdf.html

- [ ] **步骤 4：检查链接完整性**

确保所有模块间的导航链接正常工作。

---

## 预计工作量

| 任务 | 预计时间 |
|-----|---------|
| 任务 1-13：增强现有模块 | 每个 20-30 分钟 |
| 任务 14-16：创建新模块 | 每个 40-60 分钟 |
| 任务 17-20：更新配置和资源 | 30 分钟 |
| 任务 21：最终验证 | 20 分钟 |

**总计：约 8-10 小时**

---

## 注意事项

1. **内容去重**：避免重复已有内容，优先使用更完整、更新的版本
2. **保持一致性**：所有模块使用统一的格式和风格
3. **图片路径**：确保所有图片路径正确
4. **链接检查**：验证所有内部链接和导航
5. **质量优先**：不要简单复制粘贴，要整合和优化内容

---

## 自检清单

- [ ] 所有现有模块都已增强
- [ ] 3 个新模块已创建
- [ ] sync-modules.js 已更新
- [ ] 网站首页已更新
- [ ] 目录页已更新
- [ ] PDF 页已更新
- [ ] 图片资源已复制
- [ ] 所有链接已验证
- [ ] 本地测试通过