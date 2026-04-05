# 计划 1：架构基础

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development 或 superpowers:executing-plans 逐任务实现此计划。

**目标：** 建立可扩展的内容基础设施，实现 Markdown 到 Website 的自动构建

**架构：** 采用内容优先架构，Markdown 作为单一数据源，通过构建脚本生成 HTML 网站。每个模块 README 自动同步到 website 页面，保证内容一致性。

**技术栈：** Node.js, Markdown-it, Tailwind CSS, Prism.js, FlexSearch

---

## 文件结构

```
claude-code-lesson/
├── content/                    # 新增：源内容目录
│   └── modules/               # 模块 Markdown 源文件
├── scripts/
│   ├── build.js               # 新增：主构建脚本
│   ├── sync-modules.js        # 新增：模块同步脚本
│   ├── generate-nav.js        # 新增：导航生成
│   └── generate-search.js     # 新增：搜索索引
├── templates/                  # 新增：HTML 模板
│   ├── layout.html            # 页面布局
│   ├── module.html            # 模块页面模板
│   └── components/            # 可复用组件
│       ├── header.html
│       ├── footer.html
│       ├── nav.html
│       └── breadcrumb.html
├── website/
│   ├── assets/                # 新增：静态资源
│   │   ├── css/
│   │   └── js/
│   └── dist/                  # 新增：构建输出
└── docs/superpowers/plans/
    └── 2026-04-05-plan-1-architecture.md
```

---

## 任务清单

### 阶段 1：构建系统基础

#### 任务 1.1：项目配置

**文件：**
- 创建：`package.json`
- 创建：`tailwind.config.js`
- 创建：`.gitignore` 更新

- [ ] **步骤 1：初始化 Node.js 项目**
```json
{
  "name": "claude-code-lesson",
  "version": "2.0.0",
  "scripts": {
    "build": "node scripts/build.js",
    "watch": "node scripts/build.js --watch",
    "serve": "npx http-server website/dist -p 8080"
  },
  "dependencies": {
    "markdown-it": "^14.0.0",
    "gray-matter": "^4.0.3",
    "html-minifier": "^4.0.0",
    "flexsearch": "^0.7.43"
  }
}
```

- [ ] **步骤 2：配置 Tailwind CSS**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./templates/**/*.html", "./content/**/*.md"],
  theme: {
    extend: {
      colors: {
        'claude-primary': '#D97706',
        'claude-secondary': '#059669',
      }
    }
  }
}
```

- [ ] **步骤 3：Commit**
```bash
git add package.json tailwind.config.js
git commit -m "chore: initialize build system configuration"
```

---

#### 任务 1.2：HTML 模板系统

**文件：**
- 创建：`templates/layout.html`
- 创建：`templates/module.html`
- 创建：`templates/components/header.html`
- 创建：`templates/components/footer.html`
- 创建：`templates/components/nav.html`

- [ ] **步骤 1：创建基础布局模板**
```html
<!-- templates/layout.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}} - Claude Code 终极教程</title>
  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
</head>
<body class="bg-gray-50 dark:bg-gray-900">
  {{> header}}
  {{> nav}}
  <main class="container mx-auto px-4 py-8">
    {{content}}
  </main>
  {{> footer}}
  <script src="/assets/js/main.js"></script>
</body>
</html>
```

- [ ] **步骤 2：创建模块页面模板**
```html
<!-- templates/module.html -->
{{< layout}}
{{$ content}}
<article class="prose dark:prose-invert max-w-none">
  <nav class="breadcrumb text-sm mb-4">
    <a href="/">首页</a> / <a href="/modules/">模块</a> / {{module-name}}
  </nav>
  
  <header class="mb-8">
    <h1>{{title}}</h1>
    <div class="meta flex gap-4 text-sm text-gray-600">
      <span>{{difficulty-badge}}</span>
      <span>{{time}}</span>
      <span>{{version-badge}}</span>
    </div>
  </header>
  
  <div class="content">
    {{body}}
  </div>
  
  <footer class="mt-12 pt-8 border-t">
    <div class="flex justify-between">
      <a href="{{prev-link}}" class="text-blue-600">← {{prev-title}}</a>
      <a href="{{next-link}}" class="text-blue-600">{{next-title}} →</a>
    </div>
  </footer>
</article>
{{/ content}}
{{/ layout}}
```

- [ ] **步骤 3：创建导航组件**
```html
<!-- templates/components/nav.html -->
<nav class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center gap-8">
        <a href="/" class="font-bold text-xl">Claude Code 教程</a>
        <div class="hidden md:flex gap-4">
          <a href="/basics/">入门指南</a>
          <a href="/modules/">核心模块</a>
          <a href="/cases/">实战案例</a>
          <a href="/enterprise/">企业应用</a>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <input type="search" id="search" placeholder="搜索..." 
               class="px-4 py-2 rounded-lg border dark:bg-gray-700">
        <button id="theme-toggle">🌙</button>
      </div>
    </div>
  </div>
</nav>
```

- [ ] **步骤 4：Commit 模板文件**
```bash
git add templates/
git commit -m "feat(templates): add HTML template system"
```

---

#### 任务 1.3：Markdown 解析器

**文件：**
- 创建：`scripts/lib/markdown-processor.js`
- 创建：`scripts/lib/template-engine.js`

- [ ] **步骤 1：创建 Markdown 处理器**
```javascript
// scripts/lib/markdown-processor.js
const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');

class MarkdownProcessor {
  constructor() {
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
    
    // 自定义插件：代码块增强
    this.md.use(require('markdown-it-prism'));
    this.md.use(require('markdown-it-mermaid'));
  }
  
  process(content) {
    const { data, content: body } = matter(content);
    const html = this.md.render(body);
    
    return {
      frontmatter: data,
      body: html,
      toc: this.generateToc(body)
    };
  }
  
  generateToc(body) {
    // 提取 h2/h3 生成目录
    const headings = [];
    const regex = /^#{2,3}\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(body)) !== null) {
      headings.push({
        level: match[0].startsWith('##') ? 2 : 3,
        text: match[1],
        id: this.slugify(match[1])
      });
    }
    return headings;
  }
  
  slugify(text) {
    return text.toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

module.exports = MarkdownProcessor;
```

- [ ] **步骤 2：创建模板引擎**
```javascript
// scripts/lib/template-engine.js
const fs = require('fs');
const path = require('path');

class TemplateEngine {
  constructor(templatesDir) {
    this.templatesDir = templatesDir;
    this.cache = {};
  }
  
  render(templateName, data) {
    const template = this.loadTemplate(templateName);
    return this.interpolate(template, data);
  }
  
  loadTemplate(name) {
    if (this.cache[name]) return this.cache[name];
    
    const filePath = path.join(this.templatesDir, `${name}.html`);
    const content = fs.readFileSync(filePath, 'utf-8');
    this.cache[name] = content;
    return content;
  }
  
  interpolate(template, data) {
    return template
      .replace(/\{\{title\}\}/g, data.title || '')
      .replace(/\{\{content\}\}/g, data.body || '')
      .replace(/\{\{difficulty-badge\}\}/g, this.difficultyBadge(data.difficulty))
      .replace(/\{\{version-badge\}\}/g, this.versionBadge(data.cc_version_verified));
  }
  
  difficultyBadge(level) {
    const config = {
      beginner: { emoji: '🟢', text: '初级' },
      intermediate: { emoji: '🟡', text: '中级' },
      advanced: { emoji: '🔴', text: '高级' }
    };
    const c = config[level] || config.beginner;
    return `<span class="badge">${c.emoji} ${c.text}</span>`;
  }
  
  versionBadge(version) {
    return `<span class="badge">✅ Claude Code v${version}</span>`;
  }
}

module.exports = TemplateEngine;
```

- [ ] **步骤 3：Commit 解析器**
```bash
git add scripts/lib/
git commit -m "feat(build): add markdown processor and template engine"
```

---

### 阶段 2：模块同步系统

#### 任务 2.1：模块同步脚本

**文件：**
- 创建：`scripts/sync-modules.js`

- [ ] **步骤 1：创建同步脚本**
```javascript
// scripts/sync-modules.js
const fs = require('fs');
const path = require('path');
const MarkdownProcessor = require('./lib/markdown-processor');
const TemplateEngine = require('./lib/template-engine');

const MODULES = [
  '01-slash-commands',
  '02-memory',
  '03-skills',
  '04-subagents',
  '05-mcp',
  '06-hooks',
  '07-plugins',
  '08-checkpoints',
  '09-advanced-features',
  '10-cli'
];

async function syncModules() {
  const processor = new MarkdownProcessor();
  const engine = new TemplateEngine('./templates');
  
  for (const module of MODULES) {
    console.log(`Syncing ${module}...`);
    
    const readmePath = path.join(__dirname, '..', module, 'README.md');
    const outputPath = path.join(__dirname, '..', 'website', 'content', `${module}.html`);
    
    // 读取 README
    const content = fs.readFileSync(readmePath, 'utf-8');
    const { frontmatter, body, toc } = processor.process(content);
    
    // 渲染 HTML
    const html = engine.render('module', {
      title: module.replace(/^\d+-/, '').replace(/-/g, ' '),
      module: module,
      difficulty: frontmatter.difficulty || 'beginner',
      time: frontmatter.time || '30 minutes',
      cc_version_verified: frontmatter.cc_version_verified || '2.1.92',
      body: body,
      toc: JSON.stringify(toc)
    });
    
    // 写入输出
    fs.writeFileSync(outputPath, html);
    console.log(`  → ${outputPath}`);
  }
  
  console.log('\n✓ All modules synced!');
}

syncModules().catch(console.error);
```

- [ ] **步骤 2：测试同步脚本**
```bash
node scripts/sync-modules.js
# 预期：生成 10 个 HTML 文件
ls -la website/content/01-*.html website/content/02-*.html
```

- [ ] **步骤 3：Commit 同步脚本**
```bash
git add scripts/sync-modules.js
git commit -m "feat(build): add module sync script"
```

---

#### 任务 2.2：主构建脚本

**文件：**
- 创建：`scripts/build.js`

- [ ] **步骤 1：创建主构建脚本**
```javascript
// scripts/build.js
const fs = require('fs');
const path = require('path');

async function build() {
  console.log('🏗️  Building Claude Code Tutorial Website...\n');
  
  // 1. 清理输出目录
  console.log('[1/5] Cleaning output directory...');
  const distDir = path.join(__dirname, '..', 'website', 'dist');
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
  }
  fs.mkdirSync(distDir, { recursive: true });
  
  // 2. 同步模块
  console.log('[2/5] Syncing modules...');
  require('./sync-modules.js');
  
  // 3. 复制静态资源
  console.log('[3/5] Copying static assets...');
  copyDir('./website/assets', './website/dist/assets');
  
  // 4. 生成搜索索引
  console.log('[4/5] Generating search index...');
  require('./generate-search.js');
  
  // 5. 生成站点地图
  console.log('[5/5] Generating sitemap...');
  generateSitemap();
  
  console.log('\n✅ Build complete!');
  console.log('🌐 Run `npm run serve` to preview');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

function generateSitemap() {
  // 生成 sitemap.xml
}

build().catch(console.error);
```

- [ ] **步骤 2：测试构建流程**
```bash
npm run build
# 预期：完整构建输出到 website/dist/
```

- [ ] **步骤 3：Commit 构建脚本**
```bash
git add scripts/build.js
git commit -m "feat(build): add main build script"
```

---

### 阶段 3：导航与搜索

#### 任务 3.1：导航生成

**文件：**
- 创建：`scripts/generate-nav.js`

- [ ] **步骤 1：创建导航生成脚本**
```javascript
// scripts/generate-nav.js
const fs = require('fs');

const NAV_STRUCTURE = {
  '入门指南': {
    path: '/basics/',
    children: [
      { title: '安装配置', path: '/basics/installation/' },
      { title: '快速开始', path: '/basics/quickstart/' },
      { title: '基本概念', path: '/basics/concepts/' }
    ]
  },
  '核心模块': {
    path: '/modules/',
    children: [
      { title: 'Slash Commands', path: '/modules/01-slash-commands/' },
      { title: 'Memory', path: '/modules/02-memory/' },
      { title: 'Skills', path: '/modules/03-skills/' },
      { title: 'Subagents', path: '/modules/04-subagents/' },
      { title: 'MCP', path: '/modules/05-mcp/' },
      { title: 'Hooks', path: '/modules/06-hooks/' },
      { title: 'Plugins', path: '/modules/07-plugins/' },
      { title: 'Checkpoints', path: '/modules/08-checkpoints/' },
      { title: '高级功能', path: '/modules/09-advanced-features/' },
      { title: 'CLI', path: '/modules/10-cli/' }
    ]
  },
  '实战案例': {
    path: '/cases/',
    children: [
      { title: '全栈开发', path: '/cases/fullstack/' },
      { title: 'API 开发', path: '/cases/backend/' },
      { title: 'DevOps', path: '/cases/devops/' }
    ]
  },
  '企业应用': {
    path: '/enterprise/',
    children: [
      { title: '团队协作', path: '/enterprise/team/' },
      { title: 'CI/CD 集成', path: '/enterprise/cicd/' },
      { title: '安全合规', path: '/enterprise/security/' }
    ]
  }
};

function generateNav() {
  const navJson = JSON.stringify(NAV_STRUCTURE, null, 2);
  fs.writeFileSync('./website/dist/assets/nav.json', navJson);
  console.log('✓ Navigation structure generated');
}

module.exports = generateNav;
```

- [ ] **步骤 2：Commit 导航生成**
```bash
git add scripts/generate-nav.js
git commit -m "feat(build): add navigation generation"
```

---

#### 任务 3.2：搜索索引生成

**文件：**
- 创建：`scripts/generate-search.js`

- [ ] **步骤 1：创建搜索索引脚本**
```javascript
// scripts/generate-search.js
const fs = require('fs');
const path = require('path');
const MarkdownProcessor = require('./lib/markdown-processor');

function generateSearchIndex() {
  const processor = new MarkdownProcessor();
  const index = [];
  
  // 索引所有模块
  const modulesDir = path.join(__dirname, '..');
  const modules = fs.readdirSync(modulesDir)
    .filter(f => f.match(/^\d+-/));
  
  for (const module of modules) {
    const readmePath = path.join(modulesDir, module, 'README.md');
    if (!fs.existsSync(readmePath)) continue;
    
    const content = fs.readFileSync(readmePath, 'utf-8');
    const { frontmatter, body } = processor.process(content);
    
    // 提取纯文本用于搜索
    const plainText = body.replace(/<[^>]*>/g, '').toLowerCase();
    
    index.push({
      id: module,
      title: module.replace(/^\d+-/, '').replace(/-/g, ' '),
      path: `/modules/${module}/`,
      content: plainText.substring(0, 5000), // 限制长度
      tags: frontmatter.tags || []
    });
  }
  
  fs.writeFileSync('./website/dist/assets/search-index.json', JSON.stringify(index));
  console.log(`✓ Search index generated (${index.length} pages)`);
}

module.exports = generateSearchIndex;
```

- [ ] **步骤 2：Commit 搜索索引**
```bash
git add scripts/generate-search.js
git commit -m "feat(build): add search index generation"
```

---

### 阶段 4：集成测试

#### 任务 4.1：端到端构建测试

- [ ] **步骤 1：运行完整构建**
```bash
npm run build
```

- [ ] **步骤 2：验证输出**
```bash
# 检查所有模块 HTML 已生成
ls -la website/content/0*.html | wc -l
# 预期: 10

# 检查搜索索引
test -f website/dist/assets/search-index.json && echo "Search index OK"

# 检查导航
test -f website/dist/assets/nav.json && echo "Navigation OK"
```

- [ ] **步骤 3：启动服务器测试**
```bash
npm run serve
# 打开浏览器访问 http://localhost:8080
# 验证导航、搜索、模块页面
```

- [ ] **步骤 4：Final Commit**
```bash
git add .
git commit -m "feat(architecture): complete build system and module sync

- Add Node.js build system with Markdown processing
- Create HTML template system with components
- Implement module sync from README to website HTML
- Add navigation and search index generation
- Support 10 core modules with auto-sync"
```

---

## 关键里程碑

| 里程碑 | 完成标志 | 预计完成 |
|--------|----------|----------|
| M1: 构建系统可用 | `npm run build` 成功执行 | Day 1 |
| M2: 模板系统完成 | 10 个模块页面生成 | Day 2 |
| M3: 导航搜索集成 | 导航和搜索功能正常 | Day 2 |
| M4: 全部模块同步 | README 变更自动反映到网站 | Day 3 |

---

## 验收标准

- [ ] `npm run build` 成功生成所有页面
- [ ] 10 个模块 HTML 文件存在且有内容
- [ ] 导航结构正确
- [ ] 搜索索引包含所有模块
- [ ] `npm run serve` 可访问网站
- [ ] README 修改后重新 build，网站内容更新