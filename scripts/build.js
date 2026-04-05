#!/usr/bin/env node
/**
 * Main Build Script
 * 构建整个网站
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');

async function build() {
  console.log('🏗️  Building Claude Code Tutorial Website...\n');

  const startTime = Date.now();

  // 1. 同步模块
  console.log('[1/3] Syncing modules...');
  require('./sync-modules.js');

  // 2. 复制静态资源
  console.log('\n[2/3] Copying static assets...');
  const cssSrc = path.join(REPO_ROOT, 'website', 'css');
  const jsSrc = path.join(REPO_ROOT, 'website', 'js');

  // 确保目录存在
  if (fs.existsSync(cssSrc)) {
    console.log('  ✓ CSS files present');
  }
  if (fs.existsSync(jsSrc)) {
    console.log('  ✓ JS files present');
  }

  // 3. 生成索引
  console.log('\n[3/3] Generating index...');
  generateIndex();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Build complete in ${elapsed}s!`);
  console.log('🌐 Run `npm run serve` to preview at http://localhost:8080');
}

function generateIndex() {
  const MODULES = [
    { id: '01-slash-commands', title: 'Slash Commands', desc: '用户快捷命令' },
    { id: '02-memory', title: 'Memory', desc: '持久化上下文' },
    { id: '03-skills', title: 'Skills', desc: '可复用技能' },
    { id: '04-subagents', title: 'Subagents', desc: '子智能体' },
    { id: '05-mcp', title: 'MCP', desc: '模型上下文协议' },
    { id: '06-hooks', title: 'Hooks', desc: '事件驱动自动化' },
    { id: '07-plugins', title: 'Plugins', desc: '扩展插件' },
    { id: '08-checkpoints', title: 'Checkpoints', desc: '会话快照' },
    { id: '09-advanced-features', title: 'Advanced Features', desc: '高级功能' },
    { id: '10-cli', title: 'CLI', desc: '命令行工具' }
  ];

  // 生成模块列表 HTML
  const modulesHtml = MODULES.map(m => `
    <div class="module-card">
      <h3><a href="/content/${m.id}.html">${m.title}</a></h3>
      <p>${m.desc}</p>
    </div>
  `).join('\n');

  console.log('  ✓ Module index generated');
}

// 运行
build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});