# 教程重构 - 阶段 D：构建系统更新和验证

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 更新构建脚本，验证所有页面正常，创建附录

**架构：** 更新 sync-modules.js 中的 MODULES 数组，构建并测试

**技术栈：** Node.js、静态 HTML 生成

---

## 文件结构

**将要修改的文件：**
- `scripts/sync-modules.js` — 更新 MODULES 数组
- `scripts/build.js` — 更新模块列表

**将要创建的文件：**
- `appendix-cli/README.md` — CLI 命令参考手册
- `website/content/appendix-cli.html` — 生成的页面

---

### 任务 D-1：更新 sync-modules.js

**文件：**
- 修改：`scripts/sync-modules.js`

- [ ] **步骤 1：更新 MODULES 数组**

将现有的 MODULES 数组替换为新结构：

```javascript
const MODULES = [
  // 阶段一：上手
  { id: '01-quick-start', title: '快速开始', difficulty: 'beginner', prev: null, next: '02-interaction' },
  { id: '02-interaction', title: '交互与对话', difficulty: 'beginner', prev: '01-quick-start', next: '03-slash-commands' },
  { id: '03-slash-commands', title: 'Slash 命令', difficulty: 'beginner', prev: '02-interaction', next: '04-memory' },
  
  // 阶段二：定制
  { id: '04-memory', title: 'Memory 与上下文', difficulty: 'beginner', prev: '03-slash-commands', next: '05-skills' },
  { id: '05-skills', title: 'Skills 技能', difficulty: 'intermediate', prev: '04-memory', next: '06-subagents' },
  { id: '06-subagents', title: 'Subagents 代理', difficulty: 'intermediate', prev: '05-skills', next: '07-mcp' },
  { id: '07-mcp', title: 'MCP 扩展', difficulty: 'intermediate', prev: '06-subagents', next: '08-hooks' },
  
  // 阶段三：自动化
  { id: '08-hooks', title: 'Hooks 自动化', difficulty: 'intermediate', prev: '07-mcp', next: '09-checkpoints' },
  { id: '09-checkpoints', title: 'Checkpoints 快照', difficulty: 'beginner', prev: '08-hooks', next: '10-plugins' },
  { id: '10-plugins', title: 'Plugins 插件', difficulty: 'intermediate', prev: '09-checkpoints', next: '11-multi-agent' },
  
  // 阶段四：精通
  { id: '11-multi-agent', title: '多 Agent 协作', difficulty: 'advanced', prev: '10-plugins', next: '12-background-channels' },
  { id: '12-background-channels', title: '后台任务与通道', difficulty: 'intermediate', prev: '11-multi-agent', next: '13-advanced-features' },
  { id: '13-advanced-features', title: '高级功能', difficulty: 'advanced', prev: '12-background-channels', next: '14-enterprise' },
  { id: '14-enterprise', title: '企业应用', difficulty: 'advanced', prev: '13-advanced-features', next: 'appendix-cli' },
  
  // 附录
  { id: 'appendix-cli', title: 'CLI 命令参考', difficulty: 'beginner', prev: '14-enterprise', next: 'appendix-boris-tips' },
  { id: 'appendix-boris-tips', title: 'Boris 实战技巧', difficulty: 'intermediate', prev: 'appendix-cli', next: '18-source-code-analysis' },
  { id: '18-source-code-analysis', title: '源码解读', difficulty: 'advanced', prev: 'appendix-boris-tips', next: null }
];
```

- [ ] **步骤 2：Commit**

```bash
git add scripts/sync-modules.js
git commit -m "refactor: update MODULES array for new structure (phase D-1)"
```

---

### 任务 D-2：创建 CLI 参考附录

**文件：**
- 创建：`appendix-cli/README.md`

- [ ] **步骤 1：创建 appendix-cli 目录**

```bash
mkdir -p appendix-cli
```

- [ ] **步骤 2：从 temp-cli-ref 提取命令表**

读取 `temp-cli-ref/README.md`，提取命令表格部分。

- [ ] **步骤 3：编写附录格式**

```markdown
---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---

> 🟢 **初级** | ⏱ 参考
>
> ✅ 已验证 Claude Code **v2.1.92** · 最后验证：2026-04-06

# CLI 命令参考手册

这是 Claude Code CLI 的完整命令参考。日常使用请参考 [交互与对话](../02-interaction/) 章节。

## 基础命令

[从 temp-cli-ref 提取]

## 核心标志

[从 temp-cli-ref 提取]

## 模型与配置

[从 temp-cli-ref 提取]

...

## 环境变量

[从 temp-cli-ref 提取]
```

- [ ] **步骤 4：Commit**

```bash
git add appendix-cli
git commit -m "content: add CLI reference appendix (phase D-2)"
```

---

### 任务 D-3：清理临时目录

**文件：**
- 删除：`temp-cli-ref/`（内容已提取到附录）

- [ ] **步骤 1：删除 temp-cli-ref 目录**

```bash
rm -rf temp-cli-ref
```

- [ ] **步骤 2：Commit**

```bash
git add -A
git commit -m "chore: remove temp-cli-ref directory (phase D-3)"
```

---

### 任务 D-4：构建并验证

**文件：**
- 验证：所有 HTML 页面生成

- [ ] **步骤 1：运行构建**

```bash
npm run build
```

预期输出：
```
🏗️  Building Claude Code Tutorial Website...

[1/3] Syncing modules...
  📄 Processing 01-quick-start...
  📄 Processing 02-interaction...
  ...
  ✓ website/content/01-quick-start.html
  ✓ website/content/02-interaction.html
  ...

[2/3] Copying static assets...
  ✓ CSS files present
  ✓ JS files present

[3/3] Generating index...
  ✓ Module index generated

✅ Build complete in X.XXs!
```

- [ ] **步骤 2：启动本地服务器**

```bash
npm run serve
```

- [ ] **步骤 3：验证首页**

访问 http://localhost:8080

检查：
- [ ] 首页加载正常
- [ ] 模块列表显示新结构

- [ ] **步骤 4：验证导航链接**

检查每个页面的 prev/next 链接：
- [ ] 01-quick-start → next: 02-interaction ✓
- [ ] 02-interaction → prev: 01-quick-start, next: 03-slash-commands ✓
- [ ] ... 所有章节链接正确

- [ ] **步骤 5：验证 Mermaid 图表**

检查包含 mermaid 代码块的页面：
- [ ] 图表正确渲染
- [ ] 无 JS 错误

---

### 任务 D-5：更新主页和索引

**文件：**
- 修改：`website/index.html`（如有）
- 修改：`website/content/modules.html`（如有）

- [ ] **步骤 1：更新模块索引页**

如果有 `modules.html`，更新为新的四阶段结构：

```html
<h2>阶段一：上手</h2>
<div class="module-card">01-quick-start</div>
<div class="module-card">02-interaction</div>
<div class="module-card">03-slash-commands</div>

<h2>阶段二：定制</h2>
...

<h2>阶段三：自动化</h2>
...

<h2>阶段四：精通</h2>
...
```

- [ ] **步骤 2：Commit**

```bash
git add website/
git commit -m "content: update index pages for new structure (phase D-5)"
```

---

### 任务 D-6：最终验证和清理

- [ ] **步骤 1：运行完整的目录检查**

```bash
ls -la | grep -E "^d.*[0-9]|^d.*appendix|^d.*content"
```

确认目录结构：
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
appendix-cli
appendix-boris-tips
18-source-code-analysis
```

- [ ] **步骤 2：验证所有 README.md 存在**

```bash
find . -maxdepth 2 -name "README.md" | grep -v node_modules | wc -l
```

预期：18 个 README.md（15 章节 + 1 根目录 + 2 附录）

- [ ] **步骤 3：检查 Git 状态**

```bash
git status
```

预期：工作目录干净，所有更改已提交

- [ ] **步骤 4：创建总结 Commit**

```bash
git add -A
git commit -m "feat: complete tutorial restructure

- Reorganized 18 modules into 4-stage progressive structure
- Added new chapters: 01-quick-start, 02-interaction
- Rewrote all chapters with scenario-driven style
- Merged 12-background-tasks + 13-channels
- Merged 15-enterprise + 16-advanced-capabilities
- Created CLI reference appendix
- Updated build system for new structure

Design: docs/superpowers/specs/2026-04-06-tutorial-restructure-design.md"
```

---

## 验收清单

- [ ] `scripts/sync-modules.js` MODULES 数组已更新
- [ ] `appendix-cli/README.md` 已创建
- [ ] `temp-cli-ref/` 已删除
- [ ] 构建成功，无错误
- [ ] 所有页面可访问
- [ ] 导航链接正确
- [ ] Mermaid 图表正常渲染
- [ ] Git 状态干净