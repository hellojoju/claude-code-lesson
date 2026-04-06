// 主 JavaScript 文件 - Claude Code 中文教程网站

// 搜索索引缓存
let searchIndex = null;

document.addEventListener('DOMContentLoaded', function() {
    // 初始化网站
    initWebsite();

    // 设置搜索功能
    setupSearch();

    // 加载目录结构
    loadDirectoryStructure();
});

function initWebsite() {
    console.log('Claude Code 中文教程网站已初始化');

    // 设置当前年份
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
}

// ==================== 搜索功能 ====================

async function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (!searchInput || !searchBtn) return;

    // 预加载搜索索引
    await loadSearchIndex();

    // 搜索按钮点击事件
    searchBtn.addEventListener('click', performSearch);

    // 输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 实时搜索（输入时显示建议）
    searchInput.addEventListener('input', debounce(function() {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    }, 300));

    // 点击外部关闭建议
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box') && !e.target.closest('.search-suggestions')) {
            hideSearchSuggestions();
        }
    });
}

async function loadSearchIndex() {
    if (searchIndex) return searchIndex;

    try {
        const response = await fetch('/search-index.json');
        searchIndex = await response.json();
        console.log(`搜索索引已加载: ${searchIndex.length} 条目`);
        return searchIndex;
    } catch (error) {
        console.error('加载搜索索引失败:', error);
        return [];
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (!query) {
        alert('请输入搜索关键词');
        return;
    }

    // 执行搜索并跳转到搜索结果页
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

function showSearchSuggestions(query) {
    if (!searchIndex) return;

    const results = searchIndex.filter(item => {
        const searchText = `${item.title} ${item.content || ''} ${item.keywords?.join(' ') || ''}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
    }).slice(0, 5);

    if (results.length === 0) {
        hideSearchSuggestions();
        return;
    }

    // 创建或获取建议容器
    let container = document.querySelector('.search-suggestions');
    if (!container) {
        container = document.createElement('div');
        container.className = 'search-suggestions';
        document.querySelector('.search-box').appendChild(container);
    }

    // 生成建议HTML
    let html = '';
    results.forEach(item => {
        const icon = item.type === 'module' ? '📚' : '📄';
        const subtitle = item.type === 'module' ? item.id : `${item.moduleTitle} > ${item.title}`;
        html += `
            <a href="${item.url}" class="suggestion-item">
                <span class="suggestion-icon">${icon}</span>
                <div class="suggestion-content">
                    <div class="suggestion-title">${highlightText(item.title, query)}</div>
                    <div class="suggestion-subtitle">${subtitle}</div>
                </div>
            </a>
        `;
    });

    container.innerHTML = html;
    container.style.display = 'block';
}

function hideSearchSuggestions() {
    const container = document.querySelector('.search-suggestions');
    if (container) {
        container.style.display = 'none';
    }
}

function highlightText(text, query) {
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== 目录功能 ====================

function loadDirectoryStructure() {
    const directoryTree = document.getElementById('directoryTree');
    if (!directoryTree) return;

    // 模拟从服务器获取目录数据
    const directoryData = getMockDirectoryData();

    // 生成目录HTML
    const directoryHTML = generateDirectoryHTML(directoryData);

    // 更新DOM
    directoryTree.innerHTML = directoryHTML;

    // 添加点击事件
    setupDirectoryClickEvents();
}

function getMockDirectoryData() {
    // 模块数据 - 按新的学习路径编排
    return {
        title: 'Claude Code 教程目录',
        items: [
            // 入门阶段
            { id: '01-cli', title: '01 - CLI 参考手册', description: '命令行界面完整指南，学习的第一步', difficulty: 'beginner' },
            { id: '02-slash-commands', title: '02 - Slash Commands', description: '55+ 内置命令快速调用', difficulty: 'beginner' },
            { id: '03-memory', title: '03 - Memory', description: '上下文管理和 CLAUDE.md 配置', difficulty: 'beginner' },
            { id: '04-skills', title: '04 - Skills', description: '创建可复用的任务模板', difficulty: 'beginner' },
            { id: '05-checkpoints', title: '05 - Checkpoints', description: '会话快照与安全回滚', difficulty: 'beginner' },
            { id: '06-powerup-buddy', title: '06 - PowerUp 与 Buddy', description: '交互式学习和虚拟伙伴', difficulty: 'beginner' },
            // 进阶阶段
            { id: '07-subagents', title: '07 - Subagents', description: '委托专业智能体', difficulty: 'intermediate' },
            { id: '08-mcp', title: '08 - MCP', description: '模型上下文协议', difficulty: 'intermediate' },
            { id: '09-hooks', title: '09 - Hooks', description: '事件驱动自动化', difficulty: 'intermediate' },
            { id: '10-plugins', title: '10 - Plugins', description: '扩展包系统', difficulty: 'intermediate' },
            { id: '11-multi-agent', title: '11 - 多 Agent 协作', description: '多智能体协作模式', difficulty: 'intermediate' },
            { id: '12-background-tasks', title: '12 - 后台任务', description: '长时间运行任务', difficulty: 'intermediate' },
            { id: '13-channels', title: '13 - Channels', description: '消息通道', difficulty: 'intermediate' },
            { id: '14-advanced-features', title: '14 - 高级功能', description: '扩展思考、权限模式', difficulty: 'advanced' },
            // 精通阶段
            { id: '15-enterprise', title: '15 - 企业级应用', description: '企业部署与 CI/CD', difficulty: 'advanced' },
            { id: '16-advanced-capabilities', title: '16 - 高级能力', description: 'Computer Use、Voice Mode', difficulty: 'advanced' },
            { id: '17-boris-tips', title: '17 - Boris 使用技巧', description: '产品负责人的实战心得', difficulty: 'intermediate' }
        ]
    };
}

function generateDirectoryHTML(data) {
    const difficultyLabels = {
        'beginner': '🟢 入门',
        'intermediate': '🟡 进阶',
        'advanced': '🔴 高级'
    };

    let html = `
        <div class="directory-header">
            <h3><i class="fas fa-folder-open"></i> ${data.title}</h3>
            <p class="directory-stats">
                <span class="stat-item"><i class="fas fa-check-circle" style="color: #38a169;"></i> 17 个教程模块</span>
            </p>
        </div>
        <div class="directory-content">
    `;

    data.items.forEach((item) => {
        const badge = difficultyLabels[item.difficulty] || '';
        html += `
            <div class="directory-section" data-section="${item.id}">
                <div class="section-header clickable" onclick="window.location.href='content/${item.id}.html'">
                    <h4>
                        <i class="fas fa-book"></i>
                        ${item.title}
                        <span class="section-badge">${badge}</span>
                    </h4>
                    <p class="section-description">${item.description}</p>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    return html;
}

function setupDirectoryClickEvents() {
    // 点击事件已在HTML中内联处理
}