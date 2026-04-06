#!/usr/bin/env node
/**
 * 将 ccbook 网站内容转换为 Markdown
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS = [
  { file: 'cover', title: '封面' },
  { file: 'preface', title: '前言' },
  { file: 'ch01', title: '第1章 为什么读源码' },
  { file: 'ch02', title: '第2章 源码全景地图' },
  { file: 'ch03', title: '第3章 TypeScript 与 React 快速入门' },
  { file: 'ch04', title: '第4章 程序启动流程' },
  { file: 'ch05', title: '第5章 终端界面渲染' },
  { file: 'ch06', title: '第6章 状态管理' },
  { file: 'ch07', title: '第7章 消息与对话循环' },
  { file: 'ch08', title: '第8章 流式响应处理' },
  { file: 'ch09', title: '第9章 斜杠命令' },
  { file: 'ch10', title: '第10章 工具系统总览' },
  { file: 'ch11', title: '第11章 文件操作工具' },
  { file: 'ch12', title: '第12章 命令执行工具' },
  { file: 'ch13', title: '第13章 搜索工具' },
  { file: 'ch14', title: '第14章 其他工具' },
  { file: 'ch15', title: '第15章 权限系统' },
  { file: 'ch16', title: '第16章 安全沙箱' },
  { file: 'ch17', title: '第17章 编辑器集成' },
  { file: 'ch18', title: '第18章 插件系统' },
  { file: 'ch19', title: '第19章 多 Agent 协作' },
  { file: 'ch20', title: '第20章 性能优化' },
  { file: 'ch21', title: '第21章 记忆系统' },
  { file: 'ch22', title: '第22章 测试策略' },
  { file: 'ch23', title: '第23章 错误处理' },
  { file: 'ch24', title: '第24章 日志系统' },
  { file: 'ch25', title: '第25章 配置系统' },
  { file: 'ch26', title: '第26章 国际化' },
  { file: 'ch27', title: '第27章 调试技巧' },
  { file: 'ch28', title: '第28章 设计模式' }
];

function htmlToMarkdown(html, title) {
  // 提取 article 内容
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
  if (!articleMatch) return '';

  let content = articleMatch[1];

  // 移除翻页导航
  content = content.replace(/<nav class="[^"]*page-nav[^"]*">[\s\S]*?<\/nav>/g, '');

  // 转换标题
  content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, '\n# $1\n');
  content = content.replace(/<h2[^>]*id="[^"]*"[^>]*>([\s\S]*?)<\/h2>/g, '\n## $1\n');
  content = content.replace(/<h3[^>]*id="[^"]*"[^>]*>([\s\S]*?)<\/h3>/g, '\n### $1\n');
  content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, '\n#### $1\n');

  // 转换段落
  content = content.replace(/<p>([\s\S]*?)<\/p>/g, '\n$1\n');

  // 转换列表
  content = content.replace(/<ul>/g, '\n');
  content = content.replace(/<\/ul>/g, '\n');
  content = content.replace(/<ol>/g, '\n');
  content = content.replace(/<\/ol>/g, '\n');
  content = content.replace(/<li>([\s\S]*?)<\/li>/g, '- $1\n');

  // 转换代码块
  content = content.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, '\n```\n$1\n```\n');

  // 转换内联代码
  content = content.replace(/<code>([^<]*?)<\/code>/g, '`$1`');

  // 转换链接
  content = content.replace(/<a href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '[$2]($1)');

  // 转换加粗
  content = content.replace(/<strong>([^<]*)<\/strong>/g, '**$1**');

  // 转换斜体
  content = content.replace(/<em>([^<]*)<\/em>/g, '*$1*');

  // 转换引用
  content = content.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, '\n> $1\n');

  // 转换分隔线
  content = content.replace(/<hr\s*\/?>/g, '\n---\n');

  // 转换表格
  content = content.replace(/<table>/g, '\n');
  content = content.replace(/<\/table>/g, '\n');
  content = content.replace(/<thead>/g, '');
  content = content.replace(/<\/thead>/g, '');
  content = content.replace(/<tbody>/g, '');
  content = content.replace(/<\/tbody>/g, '');
  content = content.replace(/<tr>/g, '|');
  content = content.replace(/<\/tr>/g, '|\n');
  content = content.replace(/<th>([^<]*)<\/th>/g, ' $1 |');
  content = content.replace(/<td>([^<]*)<\/td>/g, ' $1 |');

  // 清理 HTML 实体
  content = content.replace(/&quot;/g, '"');
  content = content.replace(/&amp;/g, '&');
  content = content.replace(/&lt;/g, '<');
  content = content.replace(/&gt;/g, '>');
  content = content.replace(/&#8592;/g, '←');
  content = content.replace(/&#8594;/g, '→');

  // 清理多余的空行
  content = content.replace(/\n{3,}/g, '\n\n');

  // 清理其他 HTML 标签
  content = content.replace(/<[^>]+>/g, '');

  return content.trim();
}

// 生成 README.md
function generateReadme() {
  let md = `---
cc_version_verified: "2.1.92"
last_verified: "2026-04-06"
---

# Claude Code 源码解读

> 🔴 **Advanced** | ⏱ 阅读时间：约 10 小时

> ✅ Verified against Claude Code **v2.1.92**

本模块内容来自 [解密 Claude Code](https://ccbook.github.io/)，由 everettjf 编写，深入解读 Claude Code 的源码实现。

Claude Code 有约 **50 万行 TypeScript 代码**，分布在 **1800+ 个文件**中。本模块带你深入理解其内部架构和实现原理。

---

## 目录

`;

  CHAPTERS.forEach((ch, i) => {
    md += `${i + 1}. [${ch.title}](#${ch.file})\n`;
  });

  md += `\n---\n\n`;

  // 添加每个章节的内容
  const ccbookDir = '/tmp/ccbook';

  for (const ch of CHAPTERS) {
    const htmlPath = path.join(ccbookDir, `${ch.file}.html`);
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf-8');
      const markdown = htmlToMarkdown(html, ch.title);
      md += `\n<a name="${ch.file}"></a>\n\n---\n\n## ${ch.title}\n\n${markdown}\n\n`;
      console.log(`  ✓ ${ch.title}`);
    } else {
      console.log(`  ⚠️ ${ch.file}.html not found`);
    }
  }

  // 添加页脚
  md += `
---

## 关于本书

> 本书由 everettjf 使用 Claude Code 分析源码编写
>
> 原文地址：https://ccbook.github.io/
>
> 保留出处即可自由转载

`;

  return md;
}

// 运行
console.log('📖 转换 ccbook 内容...\n');
const readme = generateReadme();

const outputPath = '/Users/jieson/Documents/claude-code-lesson/18-source-code-analysis/README.md';
fs.writeFileSync(outputPath, readme);

console.log(`\n✅ 已生成: ${outputPath}`);
console.log(`   总大小: ${(readme.length / 1024).toFixed(1)} KB`);