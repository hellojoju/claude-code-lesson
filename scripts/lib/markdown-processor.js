/**
 * Markdown Processor
 * 处理 Markdown 文件，提取 frontmatter，生成 HTML
 */

const fs = require('fs');
const path = require('path');

class MarkdownProcessor {
  constructor() {
    // 简单的 Markdown 到 HTML 转换规则
    this.rules = [
      // 标题
      { pattern: /^### (.+)$/gm, replacement: '<h3>$1</h3>' },
      { pattern: /^## (.+)$/gm, replacement: '<h2 id="$1">$1</h2>' },
      { pattern: /^# (.+)$/gm, replacement: '<h1>$1</h1>' },
      // 粗体和斜体
      { pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' },
      { pattern: /\*(.+?)\*/g, replacement: '<em>$1</em>' },
      // 代码块
      { pattern: /```(\w+)?\n([\s\S]*?)```/g, replacement: '<pre><code class="language-$1">$2</code></pre>' },
      // 内联代码
      { pattern: /`([^`]+)`/g, replacement: '<code>$1</code>' },
      // 链接
      { pattern: /\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<a href="$2">$1</a>' },
      // 引用
      { pattern: /^> (.+)$/gm, replacement: '<blockquote>$1</blockquote>' },
      // 列表
      { pattern: /^- (.+)$/gm, replacement: '<li>$1</li>' },
      { pattern: /^\d+\. (.+)$/gm, replacement: '<li>$1</li>' },
      // 水平线
      { pattern: /^---$/gm, replacement: '<hr>' },
      // 段落
      { pattern: /\n\n/g, replacement: '</p><p>' },
    ];
  }

  /**
   * 解析 Markdown 文件
   */
  process(content) {
    const { frontmatter, body } = this.parseFrontmatter(content);
    const html = this.toHtml(body);
    const toc = this.generateToc(body);

    return {
      frontmatter,
      body: html,
      toc
    };
  }

  /**
   * 解析 YAML frontmatter
   */
  parseFrontmatter(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

    if (!match) {
      return { frontmatter: {}, body: content };
    }

    const yamlContent = match[1];
    const body = match[2];
    const frontmatter = {};

    // 简单的 YAML 解析
    for (const line of yamlContent.split('\n')) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        // 移除引号
        value = value.replace(/^["']|["']$/g, '');
        frontmatter[key] = value;
      }
    }

    return { frontmatter, body };
  }

  /**
   * Markdown 转 HTML - 重写，确保代码块不被破坏
   */
  toHtml(markdown) {
    let html = markdown;

    // 步骤 1: 提取并保护所有代码块
    const codeBlocks = [];
    const CODEBLOCK_PREFIX = '\x00CB';
    const CODEBLOCK_SUFFIX = 'CB\x00';

    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const index = codeBlocks.length;
      codeBlocks.push({ lang: lang || '', code: code });
      return CODEBLOCK_PREFIX + index + CODEBLOCK_SUFFIX;
    });

    // 步骤 2: 处理表格
    html = this.processTables(html);

    // 步骤 3: 保护内联代码（排除代码块的反引号和跨越占位符的匹配）
    const inlineCodes = [];
    html = html.replace(/`([^`]+?)`(?!`)/g, (match, code) => {
      // 检查是否包含代码块占位符（不应该在匹配内）
      if (code.includes(CODEBLOCK_PREFIX) || code.includes(CODEBLOCK_SUFFIX)) {
        // 这个匹配跨越了代码块，跳过
        return match;
      }
      const index = inlineCodes.length;
      inlineCodes.push(code);
      return `\x00IC${index}IC\x00`;
    });

    // 步骤 4: 处理标题（带 id）
    html = html.replace(/^### (.+)$/gm, (m, text) => {
      const cleanText = text.replace(/\*\*/g, '');
      const id = this.slugify(cleanText);
      return `<h3 id="${id}">${text}</h3>`;
    });
    html = html.replace(/^## (.+)$/gm, (m, text) => {
      const cleanText = text.replace(/\*\*/g, '');
      const id = this.slugify(cleanText);
      return `<h2 id="${id}">${text}</h2>`;
    });
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // 步骤 5: 转换模块间相对链接为绝对路径
    html = this.convertModuleLinks(html);

    // 步骤 6: 处理链接（必须在内联代码恢复之前）
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // 步骤 7: 粗体和斜体
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 步骤 8: 引用 - 合并连续的引用行为一个 blockquote
    html = html.replace(/^(> .*\n?)+/gm, (match) => {
      // 提取每行内容（去掉 > 前缀）
      const lines = match.trim().split('\n').map(line => {
        return line.replace(/^> ?/, '');
      }).join('\n');
      return `<blockquote>${lines}</blockquote>`;
    });

    // 步骤 9: 列表
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // 步骤 10: 水平线
    html = html.replace(/^---$/gm, '<hr>');

    // 步骤 11: 恢复内联代码
    inlineCodes.forEach((code, index) => {
      html = html.split(`\x00IC${index}IC\x00`).join(`<code>${this.escapeHtml(code)}</code>`);
    });

    // 步骤 12: 段落处理（在代码块恢复之前）
    html = this.processParagraphs(html);

    // 步骤 13: 恢复代码块（转换为 HTML）
    for (let i = 0; i < codeBlocks.length; i++) {
      const placeholder = CODEBLOCK_PREFIX + i + CODEBLOCK_SUFFIX;
      const block = codeBlocks[i];
      let codeHtml;
      if (block.lang === 'mermaid') {
        codeHtml = `<div class="mermaid">${block.code}</div>`;
      } else {
        codeHtml = `<pre><code class="language-${block.lang}">${this.escapeHtml(block.code)}</code></pre>`;
      }
      html = html.split(placeholder).join(codeHtml);
    }

    // 步骤 14: 处理列表 - 将相邻的 li 包装在 ul 中
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // 步骤 15: 处理徽章行
    html = this.processBadges(html);

    // 步骤 16: 处理 Try It Now 区块
    html = this.processTryItNow(html);

    return html;
  }

  /**
   * 处理段落 - 不处理占位符内的内容
   */
  processParagraphs(html) {
    // 分割成段落块
    // 识别块级元素和占位符
    const blockPattern = /(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>|<blockquote>[\s\S]*?<\/blockquote>|<hr>|<ul>[\s\S]*?<\/ul>|<table>[\s\S]*?<\/table>|\x00CB\d+CB\x00)/g;

    const parts = html.split(blockPattern);
    let result = [];

    for (const part of parts) {
      if (part.match(blockPattern)) {
        // 块级元素或代码块占位符，直接保留
        result.push(part);
      } else if (part.trim() === '') {
        // 空内容，跳过
        continue;
      } else {
        // 普通文本，包装在 <p> 中
        // 处理多行文本
        const lines = part.split(/\n\n+/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('<')) {
            result.push(`<p>${trimmed}</p>`);
          } else if (trimmed) {
            result.push(trimmed);
          }
        }
      }
    }

    return result.join('\n');
  }

  /**
   * HTML 转义
   */
  escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * 处理表格
   */
  processTables(html) {
    const tableRegex = /(\|.+\|[\n\r]+\|[-:| ]+\|[\n\r]+(?:\|.+\|[\n\r]*)+)/g;

    return html.replace(tableRegex, (match) => {
      const lines = match.trim().split('\n').filter(l => l.trim());
      if (lines.length < 2) return match;

      const headerCells = lines[0].split('|').filter(c => c.trim());
      const bodyLines = lines.slice(2);

      let table = '<table>\n<thead>\n<tr>\n';
      for (const cell of headerCells) {
        table += `<th>${cell.trim()}</th>\n`;
      }
      table += '</tr>\n</thead>\n<tbody>\n';

      for (const line of bodyLines) {
        const cells = line.split('|').filter(c => c.trim());
        table += '<tr>\n';
        for (const cell of cells) {
          table += `<td>${cell.trim()}</td>\n`;
        }
        table += '</tr>\n';
      }
      table += '</tbody>\n</table>\n';

      return table;
    });
  }

  /**
   * 处理徽章
   */
  processBadges(html) {
    // 难度徽章
    html = html.replace(/🟢 \*\*Beginner\*\*/g, '<span class="badge badge-beginner">🟢 初级</span>');
    html = html.replace(/🟡 \*\*Intermediate\*\*/g, '<span class="badge badge-intermediate">🟡 中级</span>');
    html = html.replace(/🔴 \*\*Advanced\*\*/g, '<span class="badge badge-advanced">🔴 高级</span>');

    // 版本徽章
    html = html.replace(/✅ Verified against Claude Code \*\*([^*]+)\*\*/g,
      '<span class="badge">✅ Claude Code v$1</span>');

    return html;
  }

  /**
   * 处理 Try It Now 区块
   */
  processTryItNow(html) {
    return html.replace(/## Try It Now/g, '<div class="try-it-now"><h3>🎯 Try It Now</h3></div>\n\n## Try It Now');
  }

  /**
   * 处理 Mermaid 图表
   */
  processMermaid(html) {
    return html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
      '<div class="mermaid">$1</div>');
  }

  /**
   * 转换模块间相对链接为网站绝对路径
   */
  convertModuleLinks(html) {
    // 模块 ID 列表
    const moduleIds = [
      '01-slash-commands', '02-memory', '03-skills', '04-subagents',
      '05-mcp', '06-hooks', '07-plugins', '08-checkpoints',
      '09-advanced-features', '10-cli', '11-multi-agent',
      '12-background-tasks', '13-channels'
    ];

    // 转换 ../XX-module-name/ 格式的链接为 /content/XX-module-name.html
    for (const moduleId of moduleIds) {
      // 匹配 ../moduleId/ 或 ../moduleId 或 ../moduleId/README.md 等
      const patterns = [
        new RegExp(`\\.\\./${moduleId}/README\\.md`, 'g'),
        new RegExp(`\\.\\./${moduleId}/`, 'g'),
        new RegExp(`\\.\\./${moduleId}`, 'g'),
      ];

      for (const pattern of patterns) {
        html = html.replace(pattern, `/content/${moduleId}.html`);
      }
    }

    return html;
  }

  /**
   * 生成目录
   */
  generateToc(body) {
    const headings = [];
    const regex = /^#{2,3}\s+(.+)$/gm;
    let match;

    while ((match = regex.exec(body)) !== null) {
      const level = match[0].startsWith('##') ? 2 : 3;
      const text = match[1].replace(/\*\*/g, '');
      headings.push({
        level,
        text,
        id: this.slugify(text)
      });
    }

    return headings;
  }

  /**
   * 生成 slug
   */
  slugify(text) {
    return text.toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

module.exports = MarkdownProcessor;