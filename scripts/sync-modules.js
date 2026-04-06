#!/usr/bin/env node
/**
 * Module Sync Script
 * 将 10 个模块 README 同步到 website HTML 页面
 */

const fs = require('fs');
const path = require('path');
const MarkdownProcessor = require('./lib/markdown-processor');

const MODULES = [
  // 入门阶段
  { id: '01-cli', title: 'CLI 参考手册', difficulty: 'beginner', prev: null, next: '02-slash-commands' },
  { id: '02-slash-commands', title: 'Slash Commands', difficulty: 'beginner', prev: '01-cli', next: '03-memory' },
  { id: '03-memory', title: 'Memory', difficulty: 'beginner', prev: '02-slash-commands', next: '04-skills' },
  { id: '04-skills', title: 'Skills', difficulty: 'beginner', prev: '03-memory', next: '05-checkpoints' },
  { id: '05-checkpoints', title: 'Checkpoints', difficulty: 'beginner', prev: '04-skills', next: '06-powerup-buddy' },
  { id: '06-powerup-buddy', title: 'PowerUp 与 Buddy', difficulty: 'beginner', prev: '05-checkpoints', next: '07-subagents' },
  // 进阶阶段
  { id: '07-subagents', title: 'Subagents', difficulty: 'intermediate', prev: '06-powerup-buddy', next: '08-mcp' },
  { id: '08-mcp', title: 'MCP', difficulty: 'intermediate', prev: '07-subagents', next: '09-hooks' },
  { id: '09-hooks', title: 'Hooks', difficulty: 'intermediate', prev: '08-mcp', next: '10-plugins' },
  { id: '10-plugins', title: 'Plugins', difficulty: 'intermediate', prev: '09-hooks', next: '11-multi-agent' },
  { id: '11-multi-agent', title: '多 Agent 协作', difficulty: 'intermediate', prev: '10-plugins', next: '12-background-tasks' },
  { id: '12-background-tasks', title: '后台任务', difficulty: 'intermediate', prev: '11-multi-agent', next: '13-channels' },
  { id: '13-channels', title: 'Channels', difficulty: 'intermediate', prev: '12-background-tasks', next: '14-advanced-features' },
  { id: '14-advanced-features', title: '高级功能', difficulty: 'advanced', prev: '13-channels', next: '15-enterprise' },
  // 精通阶段
  { id: '15-enterprise', title: '企业级应用', difficulty: 'advanced', prev: '14-advanced-features', next: '16-advanced-capabilities' },
  { id: '16-advanced-capabilities', title: '高级能力', difficulty: 'advanced', prev: '15-enterprise', next: '17-boris-tips' },
  { id: '17-boris-tips', title: 'Boris 使用技巧', difficulty: 'intermediate', prev: '16-advanced-capabilities', next: null }
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