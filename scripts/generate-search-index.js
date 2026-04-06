#!/usr/bin/env node
/**
 * 搜索索引生成器
 * 从所有模块 README 中提取内容生成搜索索引
 */

const fs = require('fs');
const path = require('path');

const MODULES = [
  '01-slash-commands', '02-memory', '03-skills', '04-subagents',
  '05-mcp', '06-hooks', '07-plugins', '08-checkpoints',
  '09-advanced-features', '10-cli', '11-multi-agent', '12-background-tasks',
  '13-channels', '14-powerup-buddy', '15-enterprise', '16-advanced-capabilities',
  '17-boris-tips', '18-source-code-analysis'
];

const MODULE_TITLES = {
  '01-slash-commands': 'Slash Commands',
  '02-memory': 'Memory',
  '03-skills': 'Skills',
  '04-subagents': 'Subagents',
  '05-mcp': 'MCP',
  '06-hooks': 'Hooks',
  '07-plugins': 'Plugins',
  '08-checkpoints': 'Checkpoints',
  '09-advanced-features': 'Advanced Features',
  '10-cli': 'CLI',
  '11-multi-agent': '多 Agent 协作',
  '12-background-tasks': '后台任务',
  '13-channels': 'Channels',
  '14-powerup-buddy': 'Powerup 与 Buddy',
  '15-enterprise': '企业级应用',
  '16-advanced-capabilities': '高级能力',
  '17-boris-tips': 'Boris 使用技巧',
  '18-source-code-analysis': '源码解读'
};

const REPO_ROOT = path.join(__dirname, '..');

function extractSections(content) {
  const sections = [];
  const lines = content.split('\n');
  let currentSection = null;
  let currentContent = [];

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)$/);
    const h3Match = line.match(/^### (.+)$/);

    if (h2Match) {
      if (currentSection) {
        currentSection.content = currentContent.join(' ').slice(0, 500);
        sections.push(currentSection);
      }
      currentSection = {
        title: h2Match[1],
        level: 2,
        content: ''
      };
      currentContent = [];
    } else if (h3Match) {
      if (currentSection) {
        currentSection.content = currentContent.join(' ').slice(0, 500);
        sections.push(currentSection);
      }
      currentSection = {
        title: h3Match[1],
        level: 3,
        content: ''
      };
      currentContent = [];
    } else if (currentSection) {
      // 跳过代码块
      if (!line.startsWith('```') && !line.startsWith('|')) {
        currentContent.push(line.replace(/[#*`]/g, '').trim());
      }
    }
  }

  // 添加最后一个 section
  if (currentSection) {
    currentSection.content = currentContent.join(' ').slice(0, 500);
    sections.push(currentSection);
  }

  return sections;
}

function generateSearchIndex() {
  const index = [];

  for (const moduleId of MODULES) {
    const readmePath = path.join(REPO_ROOT, moduleId, 'README.md');

    if (!fs.existsSync(readmePath)) {
      console.log(`  ⚠️  ${moduleId}: README.md not found`);
      continue;
    }

    const content = fs.readFileSync(readmePath, 'utf-8');
    const sections = extractSections(content);

    // 添加模块条目
    index.push({
      type: 'module',
      id: moduleId,
      title: MODULE_TITLES[moduleId] || moduleId,
      url: `content/${moduleId}.html`,
      description: sections[0]?.content || '',
      keywords: extractKeywords(content)
    });

    // 添加章节条目
    for (const section of sections) {
      if (section.title && section.content) {
        index.push({
          type: 'section',
          id: moduleId,
          title: section.title,
          moduleTitle: MODULE_TITLES[moduleId] || moduleId,
          url: `content/${moduleId}.html#${slugify(section.title)}`,
          content: section.content
        });
      }
    }

    console.log(`  ✓ ${moduleId}: ${sections.length} sections`);
  }

  return index;
}

function extractKeywords(content) {
  // 提取关键术语
  const keywords = new Set();
  const patterns = [
    /\b(slash command|skill|hook|plugin|mcp|subagent|checkpoint|memory)\b/gi,
    /\b(Claude Code|CLAUDE\.md|SKILL\.md)\b/gi,
    /\b(Agent|Buddy|Powerup)\b/gi,
    /\b(GitHub|Git|CI\/CD)\b/gi,
    /`([^`]+)`/g
  ];

  for (const pattern of patterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const keyword = match[1] || match[0];
      if (keyword.length > 2 && keyword.length < 30) {
        keywords.add(keyword.toLowerCase());
      }
    }
  }

  return Array.from(keywords).slice(0, 20);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 运行
console.log('🔍 Generating search index...\n');
const index = generateSearchIndex();

const outputPath = path.join(REPO_ROOT, 'website', 'search-index.json');
fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

console.log(`\n✅ Search index generated: ${index.length} entries`);
console.log(`   Output: ${outputPath}`);