#!/usr/bin/env node
/**
 * Module Sync Script
 * 将 10 个模块 README 同步到 website HTML 页面
 */

const fs = require('fs');
const path = require('path');
const MarkdownProcessor = require('./lib/markdown-processor');

const MODULES = [
  { id: '01-slash-commands', title: 'Slash Commands', difficulty: 'beginner', prev: null, next: '02-memory' },
  { id: '02-memory', title: 'Memory', difficulty: 'beginner', prev: '01-slash-commands', next: '03-skills' },
  { id: '03-skills', title: 'Skills', difficulty: 'beginner', prev: '02-memory', next: '04-subagents' },
  { id: '04-subagents', title: 'Subagents', difficulty: 'intermediate', prev: '03-skills', next: '05-mcp' },
  { id: '05-mcp', title: 'MCP', difficulty: 'intermediate', prev: '04-subagents', next: '06-hooks' },
  { id: '06-hooks', title: 'Hooks', difficulty: 'intermediate', prev: '05-mcp', next: '07-plugins' },
  { id: '07-plugins', title: 'Plugins', difficulty: 'intermediate', prev: '06-hooks', next: '08-checkpoints' },
  { id: '08-checkpoints', title: 'Checkpoints', difficulty: 'beginner', prev: '07-plugins', next: '09-advanced-features' },
  { id: '09-advanced-features', title: 'Advanced Features', difficulty: 'advanced', prev: '08-checkpoints', next: '10-cli' },
  { id: '10-cli', title: 'CLI', difficulty: 'beginner', prev: '09-advanced-features', next: '11-multi-agent' },
  { id: '11-multi-agent', title: '多 Agent 协作', difficulty: 'intermediate', prev: '10-cli', next: '12-background-tasks' },
  { id: '12-background-tasks', title: '后台任务', difficulty: 'intermediate', prev: '11-multi-agent', next: '13-channels' },
  { id: '13-channels', title: 'Channels', difficulty: 'intermediate', prev: '12-background-tasks', next: '14-powerup-buddy' },
  { id: '14-powerup-buddy', title: 'Powerup 与 Buddy', difficulty: 'beginner', prev: '13-channels', next: null }
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

    // 组装完整 HTML
    const articleContent = `
      <article>
        <nav class="breadcrumb">
          <a href="/index.html">首页</a> / <a href="/content/01-slash-commands.html">模块</a> / ${module.title}
        </nav>

        <div class="meta">
          <span class="badge badge-${module.difficulty}">
            ${module.difficulty === 'beginner' ? '🟢 初级' : module.difficulty === 'intermediate' ? '🟡 中级' : '🔴 高级'}
          </span>
          ${frontmatter.cc_version_verified ? `<span class="badge">✅ Claude Code v${frontmatter.cc_version_verified}</span>` : ''}
        </div>

        ${toc.length > 0 ? `<div class="toc"><h3>目录</h3>${tocHtml}</div>` : ''}

        <div class="content">
          ${body}
        </div>

        ${navButtons}
      </article>
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

  let html = '<ul>';
  for (const heading of toc) {
    const indent = heading.level === 3 ? 'style="margin-left: 1rem;"' : '';
    html += `<li ${indent}><a href="#${heading.id}">${heading.text}</a></li>`;
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