#!/usr/bin/env node
/**
 * PDF Generator Script
 * 将所有教程模块合并生成一个完整的 PDF 教程
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const MODULES = [
  { id: '01-slash-commands', title: 'Slash Commands', difficulty: 'beginner' },
  { id: '02-memory', title: 'Memory', difficulty: 'beginner' },
  { id: '03-skills', title: 'Skills', difficulty: 'beginner' },
  { id: '04-subagents', title: 'Subagents', difficulty: 'intermediate' },
  { id: '05-mcp', title: 'MCP', difficulty: 'intermediate' },
  { id: '06-hooks', title: 'Hooks', difficulty: 'intermediate' },
  { id: '07-plugins', title: 'Plugins', difficulty: 'intermediate' },
  { id: '08-checkpoints', title: 'Checkpoints', difficulty: 'beginner' },
  { id: '09-advanced-features', title: 'Advanced Features', difficulty: 'advanced' },
  { id: '10-cli', title: 'CLI', difficulty: 'beginner' },
  { id: '11-multi-agent', title: '多 Agent 协作', difficulty: 'intermediate' },
  { id: '12-background-tasks', title: '后台任务', difficulty: 'intermediate' },
  { id: '13-channels', title: 'Channels', difficulty: 'intermediate' }
];

const WEBSITE_DIR = path.join(__dirname, '..', 'website');
const OUTPUT_DIR = path.join(WEBSITE_DIR, 'pdf');

// PDF 样式
const PDF_STYLES = `
  <style>
    @page {
      margin: 2cm;
      @top-center {
        content: "Claude Code 终极教程";
        font-size: 10pt;
        color: #666;
      }
      @bottom-center {
        content: counter(page);
        font-size: 10pt;
      }
    }

    @page :first {
      @top-center { content: none; }
      @bottom-center { content: none; }
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans SC', sans-serif;
      line-height: 1.6;
      color: #1f2937;
      font-size: 11pt;
    }

    h1 {
      font-size: 24pt;
      color: #D97706;
      border-bottom: 2px solid #D97706;
      padding-bottom: 0.5em;
      margin-top: 0;
      page-break-before: always;
    }

    h1:first-of-type {
      page-break-before: avoid;
    }

    h2 {
      font-size: 18pt;
      color: #1f2937;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 0.3em;
      margin-top: 1.5em;
    }

    h3 {
      font-size: 14pt;
      color: #374151;
      margin-top: 1em;
    }

    code {
      background: #f3f4f6;
      padding: 0.1em 0.3em;
      border-radius: 3px;
      font-family: 'SF Mono', Monaco, 'Courier New', monospace;
      font-size: 10pt;
    }

    pre {
      background: #1f2937;
      color: #e5e7eb;
      padding: 1em;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 9pt;
      line-height: 1.4;
    }

    pre code {
      background: none;
      padding: 0;
      color: inherit;
    }

    blockquote {
      border-left: 4px solid #D97706;
      padding-left: 1em;
      margin: 1em 0;
      color: #6b7280;
      background: #fffbeb;
      padding: 0.5em 1em;
      border-radius: 0 4px 4px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
      font-size: 10pt;
    }

    th, td {
      border: 1px solid #e5e7eb;
      padding: 0.5em;
      text-align: left;
    }

    th {
      background: #f9fafb;
      font-weight: 600;
    }

    ul, ol {
      margin: 0.5em 0;
      padding-left: 1.5em;
    }

    li {
      margin: 0.3em 0;
    }

    .badge {
      display: inline-block;
      padding: 0.2em 0.6em;
      border-radius: 9999px;
      font-size: 9pt;
      font-weight: 500;
    }

    .badge-beginner { background: #dcfce7; color: #166534; }
    .badge-intermediate { background: #fef3c7; color: #92400e; }
    .badge-advanced { background: #fee2e2; color: #991b1b; }

    .mermaid {
      background: #f9fafb;
      padding: 1em;
      border-radius: 6px;
      text-align: center;
    }

    hr {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 2em 0;
    }

    .try-it-now {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border: 2px solid #D97706;
      border-radius: 8px;
      padding: 1em;
      margin: 1em 0;
    }

    .cover-page {
      text-align: center;
      padding-top: 200px;
      page-break-after: always;
    }

    .cover-page h1 {
      font-size: 36pt;
      border: none;
      color: #D97706;
      page-break-before: avoid;
    }

    .cover-page .subtitle {
      font-size: 18pt;
      color: #6b7280;
      margin-top: 1em;
    }

    .cover-page .meta {
      margin-top: 100px;
      font-size: 12pt;
      color: #9ca3af;
    }

    .toc-page {
      page-break-after: always;
    }

    .toc-page h2 {
      font-size: 20pt;
      border-bottom: 2px solid #D97706;
    }

    .toc-item {
      display: flex;
      justify-content: space-between;
      padding: 0.3em 0;
      border-bottom: 1px dotted #e5e7eb;
    }

    .toc-item a {
      text-decoration: none;
      color: #1f2937;
    }

    img, svg {
      max-width: 100%;
      height: auto;
    }

    .nav-buttons, nav, .breadcrumb, .toc:not(.toc-page .toc) {
      display: none !important;
    }
  </style>
`;

async function generatePDF() {
  console.log('📚 开始生成 PDF 教程...\n');

  // 创建输出目录
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 启动浏览器
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 生成封面页
  console.log('📄 生成封面页...');
  const coverHtml = generateCoverPage();

  // 生成目录页
  console.log('📄 生成目录页...');
  const tocHtml = generateTocPage();

  // 收集所有模块内容
  console.log('📄 收集模块内容...');
  let allContent = '';

  for (const module of MODULES) {
    console.log(`   📖 ${module.title}...`);
    const content = await getModuleContent(page, module);
    allContent += content;
  }

  // 合并所有内容
  const fullHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Claude Code 终极教程</title>
  ${PDF_STYLES}
</head>
<body>
  ${coverHtml}
  ${tocHtml}
  <div class="content">
    ${allContent}
  </div>
</body>
</html>
  `;

  // 保存中间 HTML（调试用）
  const tempHtmlPath = path.join(OUTPUT_DIR, 'tutorial-full.html');
  fs.writeFileSync(tempHtmlPath, fullHtml);
  console.log(`   ✓ 临时 HTML: ${tempHtmlPath}`);

  // 生成 PDF
  console.log('\n📄 生成 PDF 文件...');
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(OUTPUT_DIR, 'Claude-Code-终极教程.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: {
      top: '2cm',
      right: '2cm',
      bottom: '2cm',
      left: '2cm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="width: 100%; text-align: center; font-size: 10pt; color: #666;">
        Claude Code 终极教程
      </div>
    `,
    footerTemplate: `
      <div style="width: 100%; text-align: center; font-size: 10pt;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `
  });

  console.log(`\n✅ PDF 生成完成: ${pdfPath}`);

  await browser.close();

  // 生成各模块单独的 PDF
  console.log('\n📚 生成各模块单独 PDF...');
  await generateModulePdfs();

  console.log('\n🎉 所有 PDF 生成完成！');
}

function generateCoverPage() {
  const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div class="cover-page">
      <h1>Claude Code<br>终极教程</h1>
      <p class="subtitle">全网最全面的 Claude Code 学习指南</p>
      <p class="meta">
        版本 2.0 | ${date}<br>
        基于 Claude Code v2.1.92
      </p>
    </div>
  `;
}

function generateTocPage() {
  let tocItems = MODULES.map((m, i) => {
    const diffLabel = m.difficulty === 'beginner' ? '初级' :
                      m.difficulty === 'intermediate' ? '中级' : '高级';
    return `
      <div class="toc-item">
        <span>${i + 1}. ${m.title}</span>
        <span class="badge badge-${m.difficulty}">${diffLabel}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="toc-page">
      <h2>目录</h2>
      ${tocItems}
    </div>
  `;
}

async function getModuleContent(page, module) {
  const htmlPath = path.join(WEBSITE_DIR, 'content', `${module.id}.html`);

  if (!fs.existsSync(htmlPath)) {
    console.log(`   ⚠️  ${module.id}: HTML 文件不存在，跳过`);
    return '';
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');

  // 提取主要内容区域
  const contentMatch = html.match(/<div class="content">([\s\S]*?)<\/div>\s*<\/article>/);

  if (!contentMatch) {
    console.log(`   ⚠️  ${module.id}: 无法提取内容，跳过`);
    return '';
  }

  let content = contentMatch[1];

  // 清理不需要的元素
  content = content.replace(/<picture>[\s\S]*?<\/picture>/g, '');
  content = content.replace(/<div class="toc">[\s\S]*?<\/div>/g, '');
  content = content.replace(/<nav class="breadcrumb">[\s\S]*?<\/nav>/g, '');
  content = content.replace(/<div class="meta">[\s\S]*?<\/div>/g, '');

  return content;
}

async function generateModulePdfs() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const module of MODULES) {
    const htmlPath = path.join(WEBSITE_DIR, 'content', `${module.id}.html`);
    const pdfPath = path.join(OUTPUT_DIR, `${module.id}.pdf`);

    if (!fs.existsSync(htmlPath)) {
      continue;
    }

    const page = await browser.newPage();
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // 注入打印样式
    const styledHtml = html.replace('</head>', `${PDF_STYLES}</head>`);

    await page.setContent(styledHtml, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' },
      printBackground: true
    });

    console.log(`   ✓ ${module.id}.pdf`);
    await page.close();
  }

  await browser.close();
}

// 运行
generatePDF().catch(console.error);