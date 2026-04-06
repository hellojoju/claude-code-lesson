#!/usr/bin/env node
/**
 * Module Sync Script
 * 将 10 个模块 README 同步到 website HTML 页面
 */

const fs = require('fs');
const path = require('path');
const MarkdownProcessor = require('./lib/markdown-processor');

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
  { id: '14-enterprise', title: '企业应用', difficulty: 'advanced', prev: '13-advanced-features', next: 'appendix-boris-tips' },

  // 附录
  { id: 'appendix-boris-tips', title: 'Boris 实战技巧', difficulty: 'intermediate', prev: '14-enterprise', next: '18-source-code-analysis' },
  { id: '18-source-code-analysis', title: '源码解读', difficulty: 'advanced', prev: 'appendix-boris-tips', next: null }
];

const REPO_ROOT = path.join(__dirname, '..');

function syncModules() {
  console.log('🔄 Syncing modules...\n');

  const processor = new MarkdownProcessor();
  const template = fs.readFileSync(path.join(REPO_ROOT, 'templates', 'layout.html'), 'utf-8');

  for (const module of MODULES) {
    const readmePath = path.join(REPO_ROOT, module.id, 'README.md');
    const outputPath = path.join(REPO_ROOT, 'website', 'content', `${module.id}.html`);

    if (!fs.existsSync(readmePath)) {
      console.log(`  ⚠️  ${module.id}: README.md not found, skipping`);
      continue;
    }

    console.log(`  📄 Processing ${module.id}...`);

    // 读取并处理 README
    const content = fs.readFileSync(readmePath, 'utf-8');
    const { frontmatter, body, toc } = processor.process(content);

    // 生成页面标题
    const title = `${module.title} - Claude Code 终极教程`;

    // 生成导航按钮
    const navButtons = generateNavButtons(module);

    // 生成目录
    const tocHtml = generateTocHtml(toc);

    // 组装完整 HTML - 左右布局
    const tocSidebar = toc.length > 0 ? `
      <aside class="sidebar-toc">
        <div class="sidebar-toc-inner">
          <h3>📑 目录</h3>
          ${generateTocHtml(toc)}
        </div>
      </aside>
    ` : '';

    const articleContent = `
      <div class="layout-wrapper">
        ${tocSidebar}
        <div class="main-content">
          <article>
            <nav class="breadcrumb">
              <a href="/index.html">首页</a> / <a href="/content/modules.html">模块</a> / ${module.title}
            </nav>

            <div class="meta">
              <span class="badge badge-${module.difficulty}">
                ${module.difficulty === 'beginner' ? '🟢 初级' : module.difficulty === 'intermediate' ? '🟡 中级' : '🔴 高级'}
              </span>
              ${frontmatter.cc_version_verified ? `<span class="badge">✅ Claude Code v${frontmatter.cc_version_verified}</span>` : ''}
            </div>

            <div class="content">
              ${body}
            </div>

            ${navButtons}
          </article>
        </div>
      </div>
    `;

    // 应用模板
    const html = template
      .replace(/\{\{title\}\}/g, title)
      .replace(/\{\{description\}\}/g, `学习 Claude Code ${module.title} 功能的完整教程`)
      .replace(/\{\{content\}\}/g, articleContent);

    // 写入文件
    fs.writeFileSync(outputPath, html);
    console.log(`     ✓ ${outputPath}`);
  }

  console.log('\n✅ All modules synced!');
}

function generateTocHtml(toc) {
  if (toc.length === 0) return '';

  let html = '<ul class="toc-list">';
  for (const heading of toc) {
    const levelClass = `toc-h${heading.level}`;
    if (heading.level === 2) {
      html += `<li class="toc-item ${levelClass}"><a href="#${heading.id}">${heading.text}</a></li>`;
    } else if (heading.level === 3) {
      html += `<li class="toc-item ${levelClass}"><a href="#${heading.id}">${heading.text}</a></li>`;
    } else if (heading.level === 4) {
      html += `<li class="toc-item ${levelClass}"><a href="#${heading.id}">${heading.text}</a></li>`;
    }
  }
  html += '</ul>';
  return html;
}

function generateNavButtons(module) {
  const prevLink = module.prev
    ? `<a href="/content/${module.prev}.html">← ${MODULES.find(m => m.id === module.prev).title}</a>`
    : '<span></span>';

  const nextLink = module.next
    ? `<a href="/content/${module.next}.html">${MODULES.find(m => m.id === module.next).title} →</a>`
    : '<span></span>';

  return `
    <div class="nav-buttons">
      ${prevLink}
      ${nextLink}
    </div>
  `;
}

// 运行
syncModules();