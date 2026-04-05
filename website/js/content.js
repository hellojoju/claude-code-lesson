// 内容页面 JavaScript - Claude Code 中文教程

document.addEventListener('DOMContentLoaded', function() {
    // 初始化内容页面
    initContentPage();

    // 设置目录点击事件
    setupTocNavigation();

    // 高亮当前章节
    highlightCurrentSection();

    // 添加代码复制功能
    addCodeCopyButtons();
});

function initContentPage() {
    console.log('内容页面已初始化');

    // 更新翻译状态日期
    updateTranslationDate();

    // 设置代码块行号
    addLineNumbersToCodeBlocks();
}

function updateTranslationDate() {
    const dateElement = document.querySelector('.translation-status p:nth-child(2)');
    if (dateElement) {
        const now = new Date();
        const formattedDate = now.getFullYear() + '年' +
                              (now.getMonth() + 1) + '月' +
                              now.getDate() + '日';
        dateElement.textContent = '最后更新: ' + formattedDate;
    }
}

function setupTocNavigation() {
    const tocLinks = document.querySelectorAll('.toc a');
    const sections = document.querySelectorAll('.main-content section');

    // 为每个目录链接添加点击事件
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // 滚动到目标章节
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // 更新活动链接
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 监听滚动，更新活动章节
    window.addEventListener('scroll', function() {
        highlightCurrentSection();
    });
}

function highlightCurrentSection() {
    const sections = document.querySelectorAll('.main-content section');
    const tocLinks = document.querySelectorAll('.toc a');

    let currentSectionId = '';

    // 找到当前可见的章节
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSectionId = section.id;
        }
    });

    // 更新目录高亮
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSectionId) {
            link.classList.add('active');
        }
    });
}

function addCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((block, index) => {
        // 创建复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '<i class="far fa-copy"></i>';
        copyButton.title = '复制代码';

        // 设置按钮位置
        copyButton.style.position = 'absolute';
        copyButton.style.top = '10px';
        copyButton.style.right = '10px';
        copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        copyButton.style.border = 'none';
        copyButton.style.color = '#e2e8f0';
        copyButton.style.padding = '5px 10px';
        copyButton.style.borderRadius = '4px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.transition = 'background 0.3s ease';

        copyButton.addEventListener('mouseenter', () => {
            copyButton.style.background = 'rgba(255, 255, 255, 0.2)';
        });

        copyButton.addEventListener('mouseleave', () => {
            copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        });

        // 设置点击事件
        copyButton.addEventListener('click', () => {
            const code = block.querySelector('code') || block;
            const textToCopy = code.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // 显示复制成功提示
                const originalHTML = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i> 已复制';
                copyButton.style.background = 'rgba(46, 204, 113, 0.2)';

                setTimeout(() => {
                    copyButton.innerHTML = originalHTML;
                    copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
                copyButton.innerHTML = '<i class="fas fa-times"></i> 失败';
                copyButton.style.background = 'rgba(231, 76, 60, 0.2)';

                setTimeout(() => {
                    copyButton.innerHTML = originalHTML;
                    copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            });
        });

        // 为代码块添加相对定位
        block.style.position = 'relative';
        block.appendChild(copyButton);
    });
}

function addLineNumbersToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        const code = block.querySelector('code') || block;
        const lines = code.textContent.split('\n');

        // 如果行数超过1行，添加行号
        if (lines.length > 1) {
            const lineNumbers = document.createElement('div');
            lineNumbers.className = 'line-numbers';
            lineNumbers.style.position = 'absolute';
            lineNumbers.style.left = '0';
            lineNumbers.style.top = '0';
            lineNumbers.style.bottom = '0';
            lineNumbers.style.padding = '1.5rem 1rem';
            lineNumbers.style.background = 'rgba(0, 0, 0, 0.3)';
            lineNumbers.style.color = '#718096';
            lineNumbers.style.fontFamily = 'Consolas, Monaco, Courier New, monospace';
            lineNumbers.style.fontSize = '0.9rem';
            lineNumbers.style.lineHeight = '1.5';
            lineNumbers.style.textAlign = 'right';
            lineNumbers.style.userSelect = 'none';

            // 生成行号
            let lineNumbersHTML = '';
            for (let i = 1; i <= lines.length; i++) {
                lineNumbersHTML += i + '<br>';
            }
            lineNumbers.innerHTML = lineNumbersHTML;

            // 调整代码块的内边距
            block.style.paddingLeft = '4rem';
            block.style.position = 'relative';
            block.appendChild(lineNumbers);
        }
    });
}

// 页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});